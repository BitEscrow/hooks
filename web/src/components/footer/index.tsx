import {
    Button,
    Text,
    Group
} from '@mantine/core';
import { IconFileText }     from '@tabler/icons-react';


const currentYear = new Date().getFullYear()

const FooterComponent = () => {
  return (
    <footer>
        <Group justify='center' mt={10}>
            <Button
                style={{backgroundColor: '#5765f2', borderRadius: '15px'}}                
                component="a"
                href="https://discord.gg/GEZJJYteyB"
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                size="sm"
                >
                    <img width="24" height="24" src='/discord_logo.svg' alt="Discord" />
                </Button>
                <Button
                    style={{backgroundColor: 'black', borderRadius: '15px'}}                
                    component="a"
                    href="https://github.com/BitEscrow"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                >
                    <img width="24" height="24" src='/github_logo.svg' alt="GitHub" />
                </Button>
                <Button
                    style={{backgroundColor: '#0068FD', borderRadius: '15px'}}                
                    component="a"
                    href="https://BitEscrow.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    size="sm"
                >
                    <IconFileText size={24} color='white'/>
                </Button>
        </Group>
          <Text color='dimmed' size='sm' pt={5} style={{textAlign: 'center'}}>
&copy; Talaria Software, Inc. {currentYear} | BitEscrow Beta Version 1.0
        </Text>
    </footer>
  );
};

export default FooterComponent;