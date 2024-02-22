import {
    Text,
    Group
} from '@mantine/core';


const currentYear = new Date().getFullYear()

const FooterComponent = () => {
  return (
    <footer >
        <Group justify='center' mt={10}>
            <a href="https://bitescrow.app/privacy" style={{ textDecoration: 'none' }}>
            <Text c="dimmed" size="sm">Privacy</Text>
            </a>
            <a href="https://bitescrow.app/legal" style={{ textDecoration: 'none' }}>
            <Text c="dimmed" size="sm">Legal</Text>
            </a>
            <a href="https://bitescrow.app/terms" style={{ textDecoration: 'none' }}>
            <Text c="dimmed" size="sm">Terms</Text>
            </a>
            
        </Group>
          <Text c='dimmed' size='sm' pt={5} style={{textAlign: 'center'}}>
&copy; Talaria Software, Inc. {currentYear} | BitEscrow Beta Version 1.0
        </Text>
    </footer>
  );
};

export default FooterComponent;