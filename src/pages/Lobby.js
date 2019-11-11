import React, { Component } from 'react';
import { subscribe } from 'mqtt-react';
import { Player } from '../components'
import styled from 'styled-components'

const Player1 = subscribe({topic: 'Player1'})(Player)
const Player2 = subscribe({topic: 'Player2'})(Player)
const Player3 = subscribe({topic: 'Player3'})(Player)
const Player4 = subscribe({topic: 'Player4'})(Player)

const Title = styled.div`
    font-family: Jumbo Regular;
    font-size: 80px; 
`

class Lobby extends Component {
    render() {
        return (
            <div>
                <Title>
                    Press the button on your armband to join the game!
                </Title>
                <Player1 color="red" playerNum={1}/>
                <Player2 color="blue" playerNum={2}/>
                <Player3 color="green" playerNum={3}/>
                <Player4 color="yellow" playerNum={4}/>
            </div>
        )
    }
}

export default Lobby
