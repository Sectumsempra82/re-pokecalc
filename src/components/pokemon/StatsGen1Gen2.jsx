import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { StyledTableRow, StyledTableCell } from '../../style/theme'
import { useSelector, useDispatch } from 'react-redux'
import { updateIVBase, updateEVBase, updateLevel, updateBaseStats, selectEVBase, selectBaseStats, selectIVBase, selectLevel } from '../store/slices/pokemonSlice'
import { createSelector } from 'reselect'



//Needed for avoiding to lose focus on textfield while typing and, in the meantime, updating the rest of the table
const InputFiledForTable = (props) => { return (<TextField {...props} variant="standard" className="shortInput" />) }



export default function StatsGen1Gen2(props) {
    
    const theme = useTheme();
    // Required for correclty theming the table
    const inputStyle = { color: `${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light}` }
    const customRowHeaderStyle = {position: "sticky", left:0 , background: `${theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.primary.light}` , zIndex: 1}




    const dispatch = useDispatch()

    //HP, Attack, Defense, Speed, Special (used for both special attack and special defense)

    const IVBase = useSelector(selectIVBase)

    //HP, ATTACK, DEFENSE, SPECIAL-ATTACK, SPECIAL-DEFENSE, SPEED

    const EVBase = useSelector(selectEVBase)

    const baseStats = useSelector(selectBaseStats)



    const level = useSelector(selectLevel)




    const selectActualStats = createSelector(
        [selectBaseStats, selectEVBase, selectIVBase, selectLevel],
        (baseStats, EVBase, IVBase, level) => {
            let hp = 0
            let attack = 0
            let defense = 0
            let specialAttack = 0
            let specialDefense = 0
            let speed = 0

            // https://bulbapedia.bulbagarden.net/wiki/Individual_values#Usage


            hp = (Math.floor(((((baseStats[0] + IVBase[0]) * 2) + (Math.floor(Math.sqrt(EVBase[0]) / 4))) * level) / 100) + level + 10)

            attack = (Math.floor(((((baseStats[1] + IVBase[1]) * 2) + (Math.floor(Math.sqrt(EVBase[1]) / 4))) * level) / 100) + 5)

            defense = (Math.floor(((((baseStats[2] + IVBase[2]) * 2) + (Math.floor(Math.sqrt(EVBase[2]) / 4))) * level) / 100) + 5)

            specialAttack = (Math.floor(((((baseStats[3] + IVBase[4]) * 2) + (Math.floor(Math.sqrt(EVBase[3]) / 4))) * level) / 100) + 5)

            specialDefense = (Math.floor(((((baseStats[4] + IVBase[4]) * 2) + (Math.floor(Math.sqrt(EVBase[4]) / 4))) * level) / 100) + 5)

            speed = (Math.floor(((((baseStats[5] + IVBase[3]) * 2) + (Math.floor(Math.sqrt(EVBase[5]) / 4))) * level) / 100) + 5)

            return ([hp, attack, defense, specialAttack, specialDefense, speed])
        }
    )

    const actualStats = useSelector(selectActualStats)


    //SET INITIAL VALUES

    useEffect(() => {
        let hp = props.data.stats[0].base_stat
        let attack = props.data.stats[1].base_stat
        let defense = props.data.stats[2].base_stat
        let specialAttack = props.data.stats[3].base_stat
        let specialDefense = props.data.stats[4].base_stat
        let speed = props.data.stats[5].base_stat

        dispatch(updateBaseStats([hp, attack, defense, specialAttack, specialDefense, speed]))

    }, [dispatch, props.data])



    return (
        <div  className="DataTable sm:max-w-5xl max-w-7xl m-auto ">
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell component="th" scope="row" sx={customRowHeaderStyle}>
                                <InputFiledForTable
                                    id="outlined-basic"
                                    label="Level"
                                    value={level.toString() || ''}
                                    onChange={e => dispatch(updateLevel(parseInt(e.target.value !== '' ? e.target.value : '0')))}
                                    sx={inputStyle}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="center">Hp</StyledTableCell>
                            <StyledTableCell align="center">Attack</StyledTableCell>
                            <StyledTableCell align="center">Defense</StyledTableCell>
                            <StyledTableCell align="center">Special Attack</StyledTableCell>
                            <StyledTableCell align="center">Special Defense</StyledTableCell>
                            <StyledTableCell align="center">Speed</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow key={'IVS'}> 
                            <StyledTableCell component="th" scope="row" sx={customRowHeaderStyle}>
                                IV Stats
                            </StyledTableCell>
                            <StyledTableCell align="center" key={"ivbase-hp"}>
                                <InputFiledForTable
                                    id={"ivbase-hp"}
                                    value={IVBase[0].toString() || ''}
                                    onChange={e => dispatch(updateIVBase({ i: 0, val: parseInt(e.target.value !== '' ? e.target.value : '0') }))}

                                />
                            </StyledTableCell>
                            <StyledTableCell align="center" key={"ivbase-attack"}>
                                <InputFiledForTable
                                    id={"ivbase-hp"}
                                    value={IVBase[1].toString() || ''}
                                    onChange={e => dispatch(updateIVBase({ i: 1, val: parseInt(e.target.value !== '' ? e.target.value : '0') }))}

                                />
                            </StyledTableCell>
                            <StyledTableCell align="center" key={"ivbase-defense"}>
                                <InputFiledForTable
                                    id={"ivbase-hp"}
                                    value={IVBase[2].toString() || ''}
                                    onChange={e => dispatch(updateIVBase({ i: 2, val: parseInt(e.target.value !== '' ? e.target.value : '0') }))}

                                />
                            </StyledTableCell>
                            <StyledTableCell align="center" key={"ivbase-special"} colSpan={2}>
                                <InputFiledForTable
                                    id={"ivbase-hp"}
                                    value={IVBase[4].toString() || ''}
                                    onChange={e => dispatch(updateIVBase({ i: 4, val: parseInt(e.target.value !== '' ? e.target.value : '0') }))}

                                />
                            </StyledTableCell>
                            <StyledTableCell align="center" key={"ivbase-speed"}>
                                <InputFiledForTable
                                    id={"ivbase-hp"}
                                    value={IVBase[3].toString() || ''}
                                    onChange={e => dispatch(updateIVBase({ i: 3, val: parseInt(e.target.value !== '' ? e.target.value : '0') }))}

                                />
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={'EVS'}>
                            <StyledTableCell component="th" scope="row" sx={customRowHeaderStyle}>
                                EV Stats
                            </StyledTableCell>
                            {EVBase.map((stat, idx) => (
                                <StyledTableCell align="center" key={"evbase-" + idx}>
                                    <InputFiledForTable
                                        id={"base-" + idx}
                                        value={stat.toString() || ''}
                                        onChange={e => dispatch(updateEVBase({ i: idx, val: parseInt(e.target.value !== '' ? e.target.value : '0') }))}
                                        sx={inputStyle}
                                        
                                    />
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow key={'BaseStats'}>
                            <StyledTableCell component="th" scope="row" sx={customRowHeaderStyle}>
                                Base Stats
                            </StyledTableCell>
                            {baseStats.map((stat, i) => (
                                <StyledTableCell align="center" key={"base-" + i}>{stat}</StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow key={'ActualStats'}>
                            <StyledTableCell component="th" scope="row" sx={customRowHeaderStyle}>
                                Actual Stats
                            </StyledTableCell>
                            {actualStats.map((stat, i) => (
                                <StyledTableCell align="center" key={"actual-" + i}>{stat}</StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );


}