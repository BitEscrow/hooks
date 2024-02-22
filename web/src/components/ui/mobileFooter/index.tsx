// import { useState } from 'react';
import {
    ActionIcon,
    Text,
    Group
} from '@mantine/core';
import {
    IconFileText,
    // IconMoon,
    // IconSun
} from '@tabler/icons-react';


const currentYear = new Date().getFullYear()

const MobileFooterComponent = () => {

    // const [isDarkTheme, setIsDarkTheme] = useState(true); // Assuming the default theme is dark

    // const toggleTheme = () => {
    //   setIsDarkTheme(!isDarkTheme);
    // };

  return (
      <footer style={{
          left: 0,
          bottom: 0,
          width: '100%',
          backgroundColor: 'white',
          marginTop: '43vh'
      }}
      >
        <Group justify='center' mt={10} gap={20}>
            <ActionIcon
                style={{borderRadius: '10px', backgroundColor: '#5765f2'}}                
                component="a"
                href="https://discord.gg/GEZJJYteyB"
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                size="lg"
                
                >
                    <img width="22" height="22" src='/discord_logo.svg' alt="Discord" />
            </ActionIcon>
            <ActionIcon
                style={{borderRadius: '10px', backgroundColor: '#2D2D2D'}}                
                component="a"
                href="https://github.com/BitEscrow"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                
            >
                <img width="22" height="22" src='/github_logo.svg' alt="GitHub" />
            </ActionIcon>
            <ActionIcon
                style={{borderRadius: '10px', backgroundColor: '#0068FD'}}                
                component="a"
                href="https://BitEscrow.dev"
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                size="lg"
                
            >
                <IconFileText size={22} color='white'/>
            </ActionIcon>
            {/* <ActionIcon
                style={{
                    borderRadius: '10px',
                    backgroundColor: !isDarkTheme ? '#2D2D2D' : '#e8e8e8',
                }}                
                component="a"
                variant="subtle"
                size="lg"
                onClick={toggleTheme}
            >
                {isDarkTheme ? (
                    <IconSun size={21} color='black' />
                ) : (
                    <IconMoon size={21} color='white' />
                )}
            </ActionIcon> */}
        </Group>
          <Text c='dimmed' size='xs' pt={15} style={{textAlign: 'center'}}>
&copy; Talaria Software, Inc. {currentYear} | BitEscrow Beta Version 1.0
        </Text>
    </footer>
  );
};

export default MobileFooterComponent