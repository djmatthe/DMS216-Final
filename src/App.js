import React, { Fragment, Component } from 'react';
import { Lobby, ColorOrder } from "./pages"
import "./index.css"

const games = ["colorOrder", "correctSound", "hiddenOrder", "numberCode"]

class App extends Component {

  constructor(props){
    super(props)
    this.state = {lobby: true, colorOrder: false}
  }

  afterLobby = () => {
    // TODO: pick random game
    this.setState({lobby: false, colorOrder: true})
  }


  render(){
    return (
      <Fragment>
        {/*<Lobby active={this.state.lobby} onNextPage={this.afterLobby}/>*/}
        <ColorOrder active={true} />
      </Fragment>
    );
  }
}

export default App;
