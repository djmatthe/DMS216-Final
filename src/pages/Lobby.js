import React, { Component } from 'react';
import { subscribe } from 'mqtt-react';
import { Player, Typography } from '../components'
import { Player1, Player2, Player3, Player4 } from '../components'

import styled from 'styled-components'

const TitleWrapper = styled.div`
    padding: 60px;
`

const PlayerWrapper = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
`

class Lobby extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <TitleWrapper>
                    <Typography size={80}>Press the button on your armband to join the game!</Typography>
                </TitleWrapper>
                    
                <PlayerWrapper>
                    <Player1 color="red" playerNum={1}/>
                    <Player2 color="blue" playerNum={2}/>
                    <Player3 color="green" playerNum={3}/>
                    <Player4 color="yellow" playerNum={4}/>
                </PlayerWrapper>
            </div>
        )
    }
}

export default Lobby
