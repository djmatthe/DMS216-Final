import React, { Component } from 'react';
import { subscribe } from 'mqtt-react';
import { Player, Typography } from '../components';
import styled from 'styled-components';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  //background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://external-preview.redd.it/Dz7tyCzZrq64wLRyokb1l7o31a_imihGizhaeCv487U.png?auto=webp&s=697c055da98a0875756fe555965c9aa4c10bf00a");
`;

const TitleWrapper = styled.div`
  padding: 120px;
  text-align: center;
`;

const SubtitleWrapper = styled.div`
  padding: 30px;
  text-align: center;
`;

const ButtonWrapper = styled.button`
  justify-content: center;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  border-radius: 12px;
  margin: 10px;
  padding: 8px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
`;

class RecreateSoundInstructions extends Component {
  state = { isVisible: true };

componentDidMount() {
  setInterval(() => {
    this.setState({ isVisible: !this.state.isVisible });
  }, 1000);
}

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        <PageWrapper>
          <TitleWrapper>
            <Typography size={50}>
                In this puzzle, each play will be assigned a random sound. You can check your sound by pressing the button on your controller. Then, a small melody will be played from the computer, composed of each of the four sounds given to the players. You must recreate the melody by pressing your buttons in the correct order.
            </Typography>
          </TitleWrapper>
          <SubtitleWrapper>
            <Typography size={38}>When you are ready to start, click the button to 
              <ButtonWrapper>
                <Typography size={38}> continue</Typography>
              </ButtonWrapper>
            </Typography>
          </SubtitleWrapper> 
        </PageWrapper>
      </div>
    )
  }
}

export default RecreateSoundInstructions;