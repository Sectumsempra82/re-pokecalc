import React, {Fragment}  from 'react'
import StatsGen1Gen2 from './StatsGen1Gen2'



const PokemonStats = (props) => {
 
    return(
        <Fragment>
            <StatsGen1Gen2 data={props.data}/>
        </Fragment>
    )

}
export default PokemonStats