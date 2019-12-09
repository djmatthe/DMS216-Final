import React, { Component } from 'react';
import { Typography } from '../components'
import styled from 'styled-components'
import { client } from '../index'
import { listenToTopic } from '../helpers'

const colors = ["red", "green", "blue", "yellow"]

const PageWrapper = styled.div`
    opacity: ${({active}) => active ? 1 : 0};
    transition: opacity 1s ease;
`

const ColorSequence = styled.div`
  margin: 2vw;
  height: 50vw;
  width: 50vw;
  border-radius: 50%;
  background-color: ${({color}) => color};
  opacity: ${({active}) => active ? 1 : 0};
  margin: 80px auto;
  transition: all .3s ease;
`

const ContinueButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border-radius: 10px;
    margin: 80px auto;
    padding: 10px;
    opacity: ${({active}) => active ? 1 : .2};
    transition: all 1s ease;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
`

class ColorOrder extends Component {

    constructor(props){
        super(props)
        this.state = {currentColor: "black", cycling: false, messages: []}
        this.sequence = shuffle(colors)


        client.subscribe('ColorOrder', err => err && console.log(err))
        client.publish('CurrentGame', 'ColorOrder')
        client.on('message', listenToTopic('ColorOrder', this.onMessage))
    }

    componentWillUnmount = () => {
        client.unsubscribe('ColorOrder', err => err && console.log(err))
    }

    onMessage = message => {
        const allMessages = [message, ...this.state.messages]
        const success = allMessages.length > 3 && JSON.stringify(this.sequence) == JSON.stringify(allMessages.slice(0, 4).reverse())

        console.log(this.sequence)
        console.log(allMessages.slice(0, 4).reverse())

        if(success){
            this.setState({victory: true})
        }
        
        this.setState({messages: allMessages })
    }

    doColorSequence = () => {
        if(!this.state.cycling){
            this.setState({currentColor: this.sequence[0], cycling: true})
        }
    }

    componentDidUpdate = () => {
        if(this.state.cycling){
            const nextColorIndex = this.sequence.indexOf(this.state.currentColor) + 1

            setTimeout(() => { // delay color change
                if(nextColorIndex > this.sequence.length-1){
                    this.setState({currentColor: "black", cycling: false})
                }
                else {
                    this.setState({currentColor: this.sequence[nextColorIndex]})
                }
            }, 1000)
        }
    }



    render(){
        return (
            <PageWrapper active={this.props.active}>
                
                {this.state.victory
                    ? <Typography size="7vw">Congratulations, you beat the puzzle!</Typography>
                    : <ColorSequence color={this.state.currentColor} active={this.state.cycling}/>
                }
                
                <ButtonWrapper>
                    <ContinueButton onClick={this.doColorSequence} active={!this.state.cycling}>
                        <Typography size="5vw">
                            {this.state.victory 
                                ? "Continue!"
                                : "Click Me!"
                            }
                        </Typography>
                    </ContinueButton>  
                </ButtonWrapper>
            </PageWrapper>
        );
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}

export default ColorOrder;
