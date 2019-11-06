import React from 'react';
import { Connector } from 'mqtt-react';
import App from "./App"


const mqttConnectionOptions = {
  port: 1883,
  host: 'drewwilliams.dev',
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
