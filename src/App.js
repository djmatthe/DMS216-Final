import React, { Fragment, Component } from 'react';
import { Lobby, ColorOrder } from "./pages"
import "./index.css"

const games = ["colorOrder", "correctSound", "hiddenOrder", "numberCode"]

class App extends Component {

  constructor(props){
    super(props)
    this.state = {lobby: true, lobbyRender: true, colorOrder: false, colorOrderRender: false}
  }

  afterLobby = () => {
    // TODO: pick random game

    this.setState({lobby: false, colorOrderRender: true})

    setTimeout(() => {
      this.setState({colorOrder: true, lobbyRender: false})
    }, 1000)
  }


  render(){
    return (
      <Fragment>
        {this.state.lobbyRender && <Lobby active={this.state.lobby} onNextPage={this.afterLobby}/>}
        {this.state.colorOrderRender && <ColorOrder active={this.state.colorOrder} />}
      </Fragment>
    );
  }
}

export default App;
