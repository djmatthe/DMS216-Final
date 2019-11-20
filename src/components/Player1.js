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
let recentMessage = null
const onMessage = (topic, message) => {
  recentMessage = message.toString()
}



const Player = () => {
  const {color, playerNum} = this.props

  let active = false
  if(recentMessage === 'start') active = true

  return (
    <PlayerWrapper activated={active} color={color}>
      <LabelWrapper>
        <Typography size={40} color='white'>
          {`P${playerNum}`}
        </Typography>
      </LabelWrapper>
    </PlayerWrapper>
  );
}

export default subscribe({topic: 'Player1', dispatch: onMessage})(Player)