import React, {useEffect, useState} from 'react';

import io from 'socket.io-client';

import CONFIG from "@/constants/CONFIG";
import SocketContext from '../context/SocketContext';

const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(CONFIG.SOCKET_SERVER);
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};


export default SocketProvider;
