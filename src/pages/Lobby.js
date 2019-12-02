import React, { Component } from 'react';
import { Player, Typography } from '../components'

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
                    <Typography size="7vw">Press the button on your armband to join the game!</Typography>
                </TitleWrapper>
                    
                <PlayerWrapper>
                    <Player color="red" playerNum={1} />
                    <Player color="blue" playerNum={2} />
                    <Player color="green" playerNum={3} />
                    <Player color="yellow" playerNum={4} />
                </PlayerWrapper>
            </div>
        )
    }
}

export default Lobby
