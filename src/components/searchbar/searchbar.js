import React, { useState, Fragment} from 'react';
import useHints from '../Hints/Hints';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {ColorModeContext} from '../../style/theme';

export default function Searchbar(props) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const hints = useHints(value)
  const colorMode = React.useContext(ColorModeContext);

  const handleSubmit = (event) => {
    props.setPokemon(value);
    event.preventDefault();
  }
  
  return (
    <Fragment>
    <span>&nbsp;</span>
    <Stack spacing={2} direction="row" style={{ margin: 'auto', width: '25vw' }} >

      

      <Autocomplete
        freeSolo
        value={inputValue}
        onChange={(event, newValue) => {
          
          if(newValue !== null){
            setInputValue(newValue.toLowerCase());
            setValue(newValue.toLowerCase());
            props.setPokemon(newValue.toLowerCase());
          } else {
            setInputValue(null);
          }
        }}
        inputValue={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue === '' ? '' : newInputValue.toLowerCase());
        }}
        id="controllable-states-demo"
        options={hints}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search a pokemon" />}
      />

      <Button onClick={(e) => { handleSubmit(e) }} > SEARCH </Button>

      <Button onClick={(e) => { colorMode.toggleColorMode() }} > CHANGE THEME </Button>

    </Stack>
    </Fragment>
  );

}

