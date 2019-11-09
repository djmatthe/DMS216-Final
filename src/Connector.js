import React from 'react';
import { Connector } from 'mqtt-react';
import App from "./App"


const mqttConnectionOptions = {
  port: 8083,
  host: 'wss://mqtt.drewwilliams.dev',
  clientId: 'tehe2',
  username: 'drew',
  password: 'dms216'
}

const MqttConnector = () => {
  return (
    <Connector mqttProps={mqttConnectionOptions}>
      <App/>
    </Connector>
  );
}

export default MqttConnector;
