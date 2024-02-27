import { useState } from 'react'

import {
  TextInput,
  Button,
  Group,
  Text,
  Title,
} from '@mantine/core'

import {
  IconSearch,
  IconExclamationCircle
} from '@tabler/icons-react'

export default function () {

  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value
    const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(value)

    if (!hasSpecialChars) {
      setInputValue(value)
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleClick = () => {
    console.log(inputValue)
  }

    return (
     <>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={2} mb={15}>Lookup a Deposit</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Query a deposit by its DPID (Deposit ID)
          </Text>
        </div>
      </div>
      <Group>
        <TextInput
          style={{ width: '500px' }}
          placeholder="Enter a Deposit ID ..."
          leftSection={<IconSearch size={15}/>}
          value={inputValue}
          onChange={handleChange}
          error={!isValid && 'Please enter valid characters only and do not use special chars.'}
          rightSection={isValid ? null : <IconExclamationCircle size={15} color="red" />}
        />
        <Button
          style={{
            backgroundColor: '#0068FD',
            borderRadius: '15px',
          }}
          onClick={handleClick}
        >
          Search
        </Button>
      </Group>
    </>
  )
}
