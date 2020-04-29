import React, { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Market from './Market';

import './App.scss';

function App() {
  const[ show, setShow ] = useState(false);

  const click = (show) => {
    setShow(show)
  }

  const missClick = ev => {
    !ev.target.closest('.select') && click(false);
  }

  return (
    <div 
      className="App"
      onClick={missClick}  
    >
      <Header />

      <Market show={show} click={click} />

      <Footer />
    </div>
  );
}

export default App;
