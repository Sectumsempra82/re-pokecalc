
import { useEffect, useState, useCallback } from "react";
import { axiosCached } from '../AxiosCached/AxiosCached'



export default function useHints(inputValue) {



  const [pkmList, setPkmList] = useState([]);
  const [hints, setHints] = useState([]);

  const getFilteredHints = useCallback((name) => {
    var hintsFiltered = pkmList.filter(pkm => pkm.includes(name));
    return(hintsFiltered);
  },[pkmList]);

  //this useEffect actually runs every time we change input in order to filter the cached list as desired

  useEffect(() => {

    if (inputValue && inputValue.length > 2) {
      setHints(getFilteredHints(inputValue));
    } else {
      console.log('name too short');
      setHints([]);
    }

  }, [inputValue, pkmList, getFilteredHints])


  // We retrieve the full list only the first time and we save it in local state
  // no need of keeping this in global state

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'access-token': '',
      'Access-Control-Allow-Origin': '*',
    }
    axiosCached
      .post('https://beta.pokeapi.co/graphql/v1beta', {

        query: `
          query pokeQuery {
            pokemon_v2_pokemon {
                id
                name
            }
        }
          `


      },
        { crossdomain: true },
        { headers: headers }
      )
      .then((response) => {
        console.log(response.data.data.pokemon_v2_pokemon);
        console.log(response.cached ? "Cached!" : "Not cached :(")
        if (response.data.data.pokemon_v2_pokemon) {
          var list = response.data.data.pokemon_v2_pokemon.map(pkm => pkm.name);
          setPkmList(list);
        }
      })
      .catch(err => {
        console.log('error fetching hints')
        setPkmList([]);
      })
      ;
  }, [])

  return (hints);
}
