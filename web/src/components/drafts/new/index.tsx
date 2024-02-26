import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  Group,
  JsonInput,
  NativeSelect,
  Text,
  TextInput,
  Divider,
  Title,
} from '@mantine/core'

import { IconServer } from '@tabler/icons-react'

import presets_json from './presets.json' assert { type: 'json' }

type PresetEnum = keyof typeof presets_json

export default function CreateDraftView () {
  const [ draft, setDraft   ] = useState({})
  const [ json, setJson     ] = useState('')
  const [ preset, setPreset ] = useState('default')
  const [ isValid, setValid ] = useState(false)

  const apply_preset = () => {
    const data = presets_json[preset as PresetEnum]
    setJson(JSON.stringify(data, null, 2))
  }

  const create_draft = () => {
    try {
      const data = JSON.parse(json)
      setDraft(data)
    } catch {
      return
    }
  }

  useEffect(() => {
    if (json === '') apply_preset()
  }, [ json ])

  useEffect(() => {
    try {
      JSON.parse(json)
      setValid(true)
    } catch {
      setValid(false)
    }
  }, [ json ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Group style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Title order={2} mb={15}>Create a New Draft</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Create a new draft session for others to join by choosing a Pre-built JSON templates to start with and editing the values.
          </Text>
        </div>
      </Group>
      <Divider mb={30} mt={20} />

      <Group>
        <NativeSelect
          maw={200}
          label="Choose Template"
          value={preset}
          onChange={(e) => setPreset(e.currentTarget.value)}
          data={Object.keys(presets_json)}
          style={{ flex: 1 }} // This makes the select take the remaining space
        />
        <Button
            style={{
              transform: 'translateY(12px)',
              backgroundColor: '#0068FD',
              borderRadius: '25px',
              maxWidth: '100px' 
          }}
          onClick={() => apply_preset()}
        >
          Apply
        </Button>
      </Group>

      <Box maw={600} mt={30}>
        <JsonInput
          label="JSON Value"
          description="The JSON template for your draft session."
          placeholder="copy/paste your proposal JSON"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          maxRows={20}
          value={json}
          onChange={(e) => setJson(e)}
          styles={{ input : { color : (isValid) ? 'black' : 'red' } }}
        />
      </Box>
      <Group mt={30}>
        <TextInput
          maw={450}
          placeholder='wss://...'
          label="Nostr Relay Address" 
          leftSection={<IconServer size={15} />}
          description="The address of the relay that you wish to use for negotiation."
        />

        <Button
          variant="filled"
          onClick={() => create_draft()}
          disabled={!isValid}
          style={{
            transform: 'translateY(22px)',
            backgroundColor: '#0068FD',
            borderRadius: '25px',
            maxWidth: '100px' 
          }}
          >
          Publish
        </Button>
      </Group>
  </Card>
  )
}
