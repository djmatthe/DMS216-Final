import React, { Fragment } from 'react';
import { Lobby } from "./pages"
import "./index.css"
import ColorOrderInstructions from './pages/ColorOrderInstructions';
import NumberCodeInstructions from './pages/NumberCodeInstructions';
import HiddenNumberInstructions from './pages/HiddenNumberInstructions';
import HiddenOrderInstructions from './pages/HiddenOrderInstructions';
import CorrectSoundInstructions from './pages/CorrectSoundInstructions';
import RecreateSoundInstructions from './pages/RecreateSoundInstructions';

const App = props => {
  return (
    <Fragment>
      <HiddenNumberInstructions/>
    </Fragment>
  );
}

export default App;
