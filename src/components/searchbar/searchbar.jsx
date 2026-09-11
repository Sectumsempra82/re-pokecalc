import React, { useState, Fragment } from 'react';
import useHints from '../hints/hints';


import { useDispatch } from 'react-redux'
import { updateSelectedPokemon } from '../store/slices/pokemonSlice'

export default function Searchbar(props) {

  const dispatch = useDispatch()
  const [currentInput, setCurrentInput] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const hints = useHints(currentInput)

  const moveCursorDown = () => {
    if (cursor < hints.length - 1) {
      setCursor(c => c + 1)
    }
  }

  const moveCursorUp = () => {
    if (cursor > 0) {
      setCursor(c => c - 1)
    }
  }

  const handleHintsNav = (e) => {
    switch (e.key) {
      case "ArrowUp":
        moveCursorUp();
        break;
      case "ArrowDown":
        moveCursorDown();
        break;
      case "Enter":
        if (cursor >= 0 && cursor < hints.length) {
          handleEnter(hints[cursor]);
        }
        break;
      default:
        break;
    }
  }
 //HANDLE FOR ENTER BUTTON AND CLICKING ON A HINT
  const handleEnter = (newValue) => {
    if (newValue !== null) {
      setCurrentInput(newValue)
      dispatch(updateSelectedPokemon(newValue.toLowerCase()));
      setShowHints(false);
    }
  }
  //HANDLE FOR SEARCH BUTTON, NO NEED TO OVERWRITE THE CURRENT INPUT IN THIS CASE
  const handleSubmit = () => {
    dispatch(updateSelectedPokemon(currentInput.toLowerCase()));
    setShowHints(false);
  }

  return (
    <Fragment >
      <span ref={props.refToSearchBar} >&nbsp;</span>
      <div className="flex align-middle justify-center">
        <div className="relative w-64 block" >

          <input type="text" className="w-full border-2 px-4 py-2 outline-none rounded-lg"
            value={currentInput}
            onChange={(event) => { setCurrentInput(event.target.value) }}
            onFocus={() => setShowHints(true)}
            //Need to delay the hiding of the hits so the user can click on the hint, with no delay the user cannot click on the hintlist as it vanishes instantly onclick
            onBlur={() => setTimeout(() => { setShowHints(false) }, 300)}
            onKeyDown={handleHintsNav}
          />

          <ul className={`absolute w-full rounded-lg shadow-lg ${!showHints && 'hidden'} select-none`}>
            {hints.length > 0 ?
            //show the list only if at least a hint is returned, if so, build a list of hints 
              hints.map((option, i, arr) => {
                let className = "px-4 hover:bg-gray-100  rounded-lg"

                if (i === 0)
                  className += "pt-2 pb-1 rounded-t-lg"
                else if (i === arr.length)
                  className += "pt-1 pb-2 rounded-b-lg"
                else if (i === 0 && arr.length === 1)
                  className += "py-2 rounded-lg"
                else
                  className += "py-1"

                if (cursor === i) {
                  className += " bg-gray-100"
                } else {
                  className += "bg-white dark:bg-gray-500"
                }

                return <li className={className}
                  key={option}
                  value={option}
                  onClick={() => handleEnter(option)}
                >{option}</li>
              }) : 
              //otherwise empty hints
              <li className="px-4 py-2 text-gray-500 bg-white dark:bg-gray-500 dark:text-black rounded-lg">No results</li>}

          </ul>

        </div>
        <button onClick={ handleSubmit }  className="
        bg-indigo-500 mx-4 box-content my-1
        gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-lg px-7 text-sm leading-relaxed text-white bg-light-blue-500 hover:bg-light-blue-700 focus:bg-light-blue-400 active:bg-light-blue-800 shadow-md-light-blue hover:shadow-lg-light-blue 
        "> SEARCH </button>
      </div>
    </Fragment>
  );

}
