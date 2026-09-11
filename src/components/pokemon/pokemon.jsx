import React, { useEffect, useState, useLayoutEffect } from 'react'
import { axiosCached } from '../AxiosCached/AxiosCached'
import PokemonStats from './PokemonStats'




export default function Pokemon(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useLayoutEffect(() => {
        setLoading(true)
    }, [props.value])

    useEffect(() => {
        setError(null);
        setLoading(true);

        axiosCached.get('https://pokeapi.co/api/v2/pokemon/' + props.value)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [props.value])

    if (loading) return "Loading...";
    if (error) {
        if (error.status === 404) {
            return (
                <div>
                    <span>Pokemon not found</span>
                </div>
            )
        } else { return (<pre>{error.message}</pre>) }
    }

    return (
        <div className="Pokemon">
            <img src={data.sprites.other["official-artwork"].front_default !== null ? data.sprites.other["official-artwork"].front_default : data.sprites.front_default} alt={data.name} className="m-auto" />
            <PokemonStats data={data} />
        </div>
    );
}
