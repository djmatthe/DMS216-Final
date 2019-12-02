import React, { Component } from 'react';
import styled from 'styled-components'
import { Typography } from '.'
import { client } from '../index'
import { listenToTopic } from '../helpers'

const PlayerWrapper = styled.div`
  margin: 2vw;
  height: 20vw;
  width: 20vw;
  border-radius: 50%;
  background-color: ${({color}) => color};
  opacity: ${({activated}) => activated ? 1 : .1};

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
    this.state = { active: false, messages: [] }

    client.subscribe(`Player${this.props.playerNum}`, err => err && console.log(err))
    client.on('message', listenToTopic(`Player${this.props.playerNum}`, this.onMessage))
  }

  componentWillUnmount = () => {
    client.unsubscribe(`Player${this.props.playerNum}`, err => err && console.log(err))
  }

  onMessage = message => {
    this.setState({messages: [message, ...this.state.messages], })
    if(message === "start"){
      this.setState({active: true})
    }
  }

  render(){
    const { color, playerNum } = this.props
    return(
      <PlayerWrapper activated={this.state.active} color={color}>
        <LabelWrapper>
          <Typography size="6vw" color='white'>
            {`P${playerNum}`}
          </Typography>
        </LabelWrapper>
      </PlayerWrapper>
    );
  }
}

export default Player