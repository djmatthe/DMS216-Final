import React from 'react';
import { subscribe } from 'mqtt-react';

const OutTopic = props => {
  return (
    <div>
      {props.data[0]}
    </div>
  );
}

export default subscribe({
    topic: 'outTopic'
})(OutTopic);
