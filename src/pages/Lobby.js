import React, { Component } from 'react';
import { subscribe } from 'mqtt-react';
import { Player } from '../components'

class Lobby extends Component {
    render(){
        return (
            <div>
                This is the lobby
                <Player color="red" playerNum={1}/>
            </div>
        )
    }
}

export default Lobby
