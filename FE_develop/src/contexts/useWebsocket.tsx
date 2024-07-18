import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client, Frame } from '@stomp/stompjs';

const useWebsocket = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log(new Date(), str),
    });

    newClient.onConnect = (frame: Frame) => {
      setConnected(true);
      console.log("웹소켓이 연결되었습니다.");
    };

    newClient.onStompError = (frame: Frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    setClient(newClient);

    return () => {
      // if (newClient.connected) {
      //   newClient.deactivate();
      //   setConnected(false);
      //   console.log("웹소켓 연결이 해제되었습니다.");
      // }
    };
  }, []);

  const connect = (): void => {
    if (client && !client.active) {
      client.activate();
    }
  };

  const disconnect = (): void => {
    if (client && client.connected) {
      client.deactivate();
      setConnected(false);
      console.log("웹소켓 연결이 해제되었습니다.");
    }
  };

  return { connect, disconnect, client, connected };
};

export default useWebsocket;
