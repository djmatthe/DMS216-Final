import React, { Component } from 'react';
import { Player, Typography } from '../components'

import styled from 'styled-components'
import { client } from '../index';

const TitleWrapper = styled.div`
    padding: 60px;
`

const LobbyWrapper = styled.div`
    opacity: ${({active}) => active ? 1 : 0};
    transition: opacity 1s ease;
`

const PlayerWrapper = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
`

const ContinueButton = styled.button`
    opacity: ${({active}) => active ? 1 : 0};
    background-color: #4CAF50;
    color: white;
    border-radius: 10px;
    margin: 80px auto;
    padding: 10px;
    transition: all 1s ease;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
`

class Lobby extends Component {
    constructor(props){
        super(props)
        this.state = {p1: false, p2: false, p3: false, p4: false, ready: false, 
            message: "Press the button on your armband to join the game!"}
    }

    onPlayerStart = (num, color) => {
        this.setState({[`p${num}`]: true})

        console.log(color)

        let colorCode;

        switch(color) {
            case "white":
            default:
                colorCode = 1
                break;
            case "red":
                colorCode = 2 
                break;
            case "green":
                colorCode = 3
                break
            case "blue":
                colorCode = 4
                break
            case "yellow":
                colorCode = 5
                break
        }

        client.publish(`Player${num}/ledState`, colorCode.toString())
    }

    render() {

        const { p1, p2, p3, p4} = this.state
        const message = (p1 && p2 && p3 && p4) 
            ? "Everyones In!" 
            : "Press the button on your armband to join the game!"

        return (
            <LobbyWrapper active={this.props.active}>
                <TitleWrapper>
                    <Typography size="7vw">{message}</Typography>
                </TitleWrapper>
                    
                <PlayerWrapper>
                    <Player color="red" playerNum={1} onActive={this.onPlayerStart}/>
                    <Player color="blue" playerNum={2} onActive={this.onPlayerStart}/>
                    <Player color="green" playerNum={3} onActive={this.onPlayerStart}/>
                    <Player color="yellow" playerNum={4} onActive={this.onPlayerStart}/>
                </PlayerWrapper>

                <ButtonWrapper>
                    <ContinueButton active={p1 && p2 && p3 && p4} onClick={this.props.onNextPage}>
                        <Typography size="5vw">Continue!</Typography>
                    </ContinueButton>  
                </ButtonWrapper>
            </LobbyWrapper>
        )
    }
}

export default Lobby
