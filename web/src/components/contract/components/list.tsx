import { Box, Text }       from '@mantine/core'
import { useContractList } from '@/hooks/useContract'

import {
  ContractData,
  Signer
} from '@scrow/core'

interface Props {
  signer : Signer
}

interface ItemProps {
  data : ContractData
}

export default function ContractListView ({ signer } : Props) {

  const { data, error, isLoading } = useContractList(signer)

  console.log(data)

  return (
    <Box>
      { error     && <p>Error: {String(error)}</p>           }
      { isLoading && <p>Loading...</p>                       }
      { data && (
        data.length !== 0 
          && data.map(e => <ContractListItem data={e} />)
          || <Text>No contracts found</Text>
        )
      }
    </Box>
  )
}

function ContractListItem ({ data } : ItemProps) {
  return (
    <p>{data.cid}</p>
  )
}