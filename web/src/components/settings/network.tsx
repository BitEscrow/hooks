import { SetStateAction, useState }     from 'react';
import { Box, NativeSelect }            from "@mantine/core";
import {
    ToastContainer,
    toast,
    Slide
}                                       from 'react-toastify';
import                                       'react-toastify/dist/ReactToastify.css';

export default function Network() {
    const [network, setNetwork] = useState('Mutiny');

    const handleNetworkChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNetwork(event.target.value);
        toast.success(`Network changed to ${event.target.value}`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Slide,
        });
    };

    return ( 
        <Box>
            <NativeSelect
                label="Choose Network"
                data={['Mutiny', 'Testnet', 'Main']}
                maw={300}
                value={network}
                onChange={handleNetworkChange}
            />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Box>
    );
}
