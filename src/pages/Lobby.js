import React, { Component } from 'react';
import { subscribe } from 'mqtt-react';
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
        this.state = {
            p1: false,
            p2: false,
            p3: false,
            p4: false
        }
    }

    enterPlayer = (topic, message) => {
        console.log("got message")

        if(message !== "start") return

        switch(topic){
            case "Player1":
                this.setState({p1: true})
                return
            case "Player2":
                this.setState({p2: true})
                return
            case "Player3":
                this.setState({p3: true})
                return
            case "Player4":
                this.setState({p4: true})
                return
            default:
                return
        }
    }


    render() {
        
        const Player1 = subscribe({topic: 'Player1', dispatch: this.enterPlayer})(Player)
        const Player2 = subscribe({topic: 'Player2', dispatch: this.enterPlayer})(Player)
        const Player3 = subscribe({topic: 'Player3', dispatch: this.enterPlayer})(Player)
        const Player4 = subscribe({topic: 'Player4', dispatch: this.enterPlayer})(Player)
        return (
            <div>
                <TitleWrapper>
                    <Typography size={80}>Press the button on your armband to join the game!</Typography>
                </TitleWrapper>
                    
                <PlayerWrapper>
                    <Player1 color="red" playerNum={1} active={this.state.p1}/>
                    <Player2 color="blue" playerNum={2} active={this.state.p2}/>
                    <Player3 color="green" playerNum={3} active={this.state.p3}/>
                    <Player4 color="yellow" playerNum={4} active={this.state.p4}/>
                </PlayerWrapper>
            </div>
        )
    }
}

export default Lobby
