import React, { Component } from 'react';
import styled from 'styled-components'
import { Typography } from '.'

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
    this.state = {activated : false}
  }

  activate = () => {
    this.setState({activated: !this.state.activated})
  }

  render(){
    console.log(this.props.data)
    let active = false;
    if(this.props.data[0]){
      active = this.props.data[0].toString() === "Start"
    }

    return (
      <PlayerWrapper activated={active} color={this.props.color}>
        <LabelWrapper>
          <Typography size={40} color='white'>
            {`P${this.props.playerNum}`}
          </Typography>
        </LabelWrapper>

      </PlayerWrapper>
    );
  }
}

export default Player
