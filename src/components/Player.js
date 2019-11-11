import React, { Component } from 'react';
import styled from 'styled-components'

const PlayerWrapper = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${({color}) => color}
`

class Player extends Component {
  render(){
    return (
      <PlayerWrapper color={this.props.color}>
        {`Player ${this.props.playerNum}`}
      </PlayerWrapper>
    );
  }
}

export default Player
