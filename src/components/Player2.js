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

class Player extends Component { 
  constructor(props){
    super(props)
    this.state = {active: false}
  }

  static getDerivedStateFromProps(props, state){
    if(props.data[0]){
      const latestMessage = props.data[0].toString()
      if(latestMessage === 'start') return {active: true}
    }
  }

  render(){
    const {color, playerNum} = this.props

    return (
      <PlayerWrapper activated={this.state.active} color={color}>
        <LabelWrapper>
          <Typography size={40} color='white'>
            {`P${playerNum}`}
          </Typography>
        </LabelWrapper>
      </PlayerWrapper>
    );
  }
}

const onMessage = (topic, message) => {
  console.log(message.toString())
}

export default subscribe({topic: 'Player2'})(Player)