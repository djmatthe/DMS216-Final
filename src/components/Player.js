import React, { Component } from 'react';
import styled from 'styled-components'
import { Typography } from '.'
import { subscribe } from 'mqtt-react'; 

const PlayerWrapper = styled.div`
  margin: 20px;
  height: 20vw;
  width: 20vw;
  border-radius: 50%;
  background-color: ${({color}) => color};
  opacity: ${({activated}) => activated ? 1 : .4};

  transition: all .3s ease;
`

const LabelWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`



const Player = props => { 

  const _onClick = () => {
    const { mqtt } = props;
    mqtt.publish(`Player${props.playerNum}`, 'start');
    console.log("should have published")
  }

  return (
    <PlayerWrapper activated={props.active} color={props.color} onClick={_onClick}>
      <LabelWrapper>
        <Typography size={40} color='white'>
          {`P${props.playerNum}`}
        </Typography>
      </LabelWrapper>
    </PlayerWrapper>
  );
}

export default Player