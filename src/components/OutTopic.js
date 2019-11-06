import React from 'react';
import { subscribe } from 'mqtt-react';


const onMessage = () => {
    console.log("got a new message")
}

const OutTopic = props => {
  return (
    <ul>
      {props.data.map( message => <li>{message}</li> )}
    </ul>
  );
}

export default subscribe({
    topic: 'outTopic',
    dispatch: onMessage
})(OutTopic);
