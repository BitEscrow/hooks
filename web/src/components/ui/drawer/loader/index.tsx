import { useState }  from 'react'

import { Box } from '@mantine/core'

import ImportView   from './import'
import SeedView     from './create'
import ControlView  from './controls'
import LoginView    from './login'



export default function LoaderView () {

  const [ view, setView ] = useState('login')

  return (
    <Box>
      <ControlView view={view} setView={setView} />
      <Box>
          { view === 'create' && <SeedView   />}
          { view === 'import' && <ImportView />}
          { view === 'login'  && <LoginView  />}
      </Box>
    </Box>
  )
}
