import React, { Component } from 'react';
import { Typography } from '../components'
import styled from 'styled-components'

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
  transition: all .5s ease;
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
        this.state = {currentColor: "black", cycling: false}
        this.sequence = colors
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
                <ColorSequence color={this.state.currentColor} active={this.state.cycling}/>

                <ButtonWrapper>
                    <ContinueButton onClick={this.doColorSequence} active={!this.state.cycling}>
                        <Typography size="5vw">Click Me!</Typography>
                    </ContinueButton>  
                </ButtonWrapper>
            </PageWrapper>
        );
    }
}

export default ColorOrder;
