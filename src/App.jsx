
import './components/Homepage/Homepage';
import Homepage from './components/Homepage/Homepage';
import './components/searchbar/searchbar';
import Searchbar from './components/searchbar/searchbar';
import Pokemon from './components/pokemon/pokemon';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'

import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar'


function App() {

  const [mode, setMode] = useState('light')
  const refToSearchBar = useRef(null)
  const selectedPokemon = useSelector(state => state.pokemon.selectedPokemon)
  
  useEffect(() => {
    if( refToSearchBar.current ) { 
      setTimeout(() => { window.scrollTo({ behavior: 'smooth', top: refToSearchBar.current.offsetTop }) }, 500 )      
    }
  },[selectedPokemon])

  return (
        <div className={mode}>
          <div className=" text-center min-h-screen pb-10 bg-white-500 dark:bg-gray-700" >
            <ButtonAppBar mode={{'current': mode, 'setMode': setMode}} />
            <Homepage/>
            <Searchbar refToSearchBar={refToSearchBar}  ></Searchbar>
            {selectedPokemon !== '' ? <Pokemon value={selectedPokemon} /> : null }
          </div>
        </div>



  );
}

export default App;