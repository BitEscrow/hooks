import { StoreAPI } from '@cmdcode/use-store'

import {
  ClientLib,
  DraftSession,
  DraftUtil,
  EscrowSigner,
  MemberData,
  RolePolicy,
  RoleTemplate
} from '@scrow/sdk/client'

import {
  CoreSchema,
  PathEntry,
  PaymentEntry,
  ProgramEntry,
  ProposalData,
  ScheduleEntry
} from '@scrow/sdk/core'

export class DraftStore {

  readonly _store : StoreAPI<DraftSession>

  constructor (store : StoreAPI<DraftSession>) {
    this._store = store
  }

  get data () {
    return this._store.store
  }

  get encoded () {
    return DraftUtil.encode(this.data)
  }

  get is_endorsed () {
    const pubs = this.sigs.map(e => e.slice(0, 64))
    return this.members.every(e => pubs.includes(e.pub))
  }

  get is_filled () {
    const { members, roles } = this.data
    return ClientLib.roles.has_full_roles(members, roles)
  }

  get members () {
    return this.data.members
  }

  get pnames () {
    let paths = this.data.proposal.paths.map(e => e[0])
    this.data.roles.forEach(e => {
      const names = e.paths.map(x => x[0])
      paths.push(...names)
    })
    return [ ...new Set(paths) ]
  }

  get proposal () {
    return new ProposalStore(this)
  }

  get roles () {
    return this.data.roles.map(e => new PolicyStore(e.id, this))
  }

  get sigs () {
    return this.data.sigs
  }

  member = {
    endorse : (signer : EscrowSigner) => {
      const draft = signer.draft.endorse(this.data)
      this.restore(draft)
    },
    join  : (pol_id : string, signer : EscrowSigner) => {
      const draft = signer.draft.join(pol_id, this.data)
      this.set(draft)
    },
    leave : (signer : EscrowSigner) => {
      const draft = signer.draft.leave(this.data)
      this.set(draft)
    },
    update : (member : Partial<MemberData>) => {
      const members = ClientLib.members.update_membership(this.data.members, member)
      this.update({ members })
    }
  }

  role = {
    get : (id : string) => {
      return new PolicyStore(id, this)
    },
    add : (role : RoleTemplate) => {
      const policy = ClientLib.roles.create_role_policy(role)
      const roles  = this.data.roles.filter(e => e.id !== policy.id)
      this.update({ roles : [ ...roles, policy ]})
    },
    rem : (idx : number) => {
      const roles = this.data.roles.filter((_, i) => i !== idx)
      this.update({ roles })
    }
  }

  sig = {
    clear : () => {
      this.set(this.data)
    },
    has : (signer : EscrowSigner) => {
      return signer.draft.is_signed(this.data)
    }
  }

  decode (encoded : string) {
    const data = DraftUtil.decode(encoded)
    this.restore(data)
  }

  publish () {
    return DraftUtil.publish(this.data)
  }

  restore (data : DraftSession) {
    this._store.reset(data)
  }

  set (data : DraftSession) {
    this._store.reset({ ...data, sigs : [] })
  }

  tabulate () {
    return DraftUtil.tabulate(this.data)
  }

  update (data : Partial<DraftSession>) {
    this._store.update({ ...this.data, ...data, sigs : [] })
  }

  verify () {
    DraftUtil.verify(this.data)
  }

}

export class ProposalStore {
  readonly _draft : DraftStore

  constructor (draft : DraftStore) {
    this._draft = draft
  }

  get addresses () {
    const paths = this.data.paths
      .filter(e => e.at(2) !== undefined)
      .map(e => e[2])
      const payments = this.data.payments
      .filter(e => e.at(1) !== undefined)
      .map(e => e[1])
    return [ ...paths, ...payments ]
  }

  get data () {
    return this._draft.data.proposal
  }

  path = {
    add : (path : PathEntry | unknown) => {
      const parser = CoreSchema.proposal.paypath
      const parsed = parser.parse(path)
      const paths  = [ ...this.data.paths, parsed ]
      this.update({ paths })
    },
    rem : (idx : number) => {
      const paths = this.data.paths.filter((_, i) => i !== idx)
      this.update({ paths })
    }
  }

  payment = {
    add : (payment : PaymentEntry | unknown) => {
      const parser = CoreSchema.proposal.payment
      const parsed = parser.parse(payment)
      const payments = [ ...this.data.payments, parsed ]
      this.update({ payments })
    },
    rem : (idx : number) => {
      const payments = this.data.payments.filter((_, i) => i !== idx)
      this.update({ payments })
    }
  }

  program = {
    add : (program : ProgramEntry | unknown) => {
      const parser = CoreSchema.proposal.program
      const parsed = parser.parse(program)
      const programs = [ ...this.data.programs, parsed ]
      this.update({ programs })
    },
    rem : (idx : number) => {
      const programs = this.data.programs.filter((_, i) => i !== idx)
      this.update({ programs })
    },
    update : (idx : number, program : ProgramEntry) => {
      const parser   = CoreSchema.proposal.program
      const parsed   = parser.parse(program)
      const current  = this.data.programs
      const programs = [
        ...current.slice(0, idx), 
        parsed, 
        ...current.slice(idx + 1)
      ]
      this.update({ programs })
    }
  }

  task = {
    add : (task : ScheduleEntry | unknown) => {
      const parser = CoreSchema.proposal.task
      const parsed = parser.parse(task)
      const schedule = [ ...this.data.schedule, parsed ]
      this.update({ schedule })
    },
    rem : (idx : number) => {
      const schedule = this.data.schedule.filter((_, i) => i !== idx)
      this.update({ schedule })
    }
  }

  update (data : Partial<ProposalData>) {
    this._draft.update({ proposal : { ...this.data, ...data }})
  }
}

export class PolicyStore {
  readonly _id    : string
  readonly _draft : DraftStore

  constructor (
    id    : string,
    draft : DraftStore
  ) {
    this._id    = id
    this._draft = draft
  }

  get data () {
    const data = this._draft.data.roles.find(e => e.id === this._id)
    if (data === undefined) throw new Error('policy not found for id: ' + this.id)
    return data
  }

  get id () {
    return this._id
  }

  path = {
    add : (path : [ string, number ]) => {
      const paths = [ ...this.data.paths, path ]
      this.update({ paths })
    },
    rem : (idx : number) => {
      const paths = this.data.paths.filter((_, i) => i !== idx)
      this.update({ paths })
    }
  }

  program = {
    add : (program : ProgramEntry) => {
      const programs = [ ...this.data.programs, program ]
      this.update({ programs })
    },
    rem : (idx : number) => {
      const programs = this.data.programs.filter((_, i) => i !== idx)
      this.update({ programs })
    }
  }

  update (data : Partial<RolePolicy>) {
    const roles = this._draft.data.roles
    const idx   = roles.findIndex(e => e.id === this._id)
    if (idx === -1) {
      throw new Error('policy no longer exists in draft')
    }
    roles[idx] = { ...roles[idx], ...data }
    this._draft.update({ roles : [ ...roles ]})
  }
}
