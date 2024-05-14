import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Abilities from '../Abilities/Abilities';

const Dropdown = ({ pokemonData }) => {
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState('');
    const [pokemontAb, setPokemontAb] = useState([]);
    const [cachedData, setCachedData] = useState([]);
    // const cachedData = [];

    console.log('cachedData', cachedData);

    useEffect(() => {
        let makeApiCall = {};
        if (selectedPokemonUrl) {
            if (true) {
                makeApiCall = cachedData.find(el => el.selectedPokemonUrl === selectedPokemonUrl) || {};
                if (makeApiCall && Object.keys(makeApiCall).length !== 0) {
                    console.log('makeApiCall', makeApiCall, Object.keys(makeApiCall));
                    setPokemontAb(makeApiCall?.abilities)
                } else {
                    axios.get(selectedPokemonUrl)
                        .then(res => {
                            if (res.status === 200 || res.status === 201) {
                                console.log('makeApiCall inside api', makeApiCall);

                                setPokemontAb(res?.data.abilities);
                                setCachedData([...cachedData, { selectedPokemonUrl, abilities: res?.data.abilities }])
                            }
                        })
                }
            }
        }
    }, [selectedPokemonUrl]);

    // useEffect(() => {
    //     const fetchPokemonData = async () => {
    //         if (selectedPokemonUrl) {
    //             // Check if data is already cached
    //             const cachedItem = cachedData.find(el => el.selectedPokemonUrl === selectedPokemonUrl);
    //             if (cachedItem) {
    //                 setPokemontAb(cachedItem.abilities);
    //             } else {
    //                 // Make API call if not cached
    //                 try {
    //                     const res = await axios.get(selectedPokemonUrl);
    //                     if (res.status === 200 || res.status === 201) {
    //                         setPokemontAb(res.data.abilities);
    //                         setCachedData(prevData => [...prevData, { selectedPokemonUrl, abilities: res.data.abilities }]);
    //                     }
    //                 } catch (error) {
    //                     console.error('Error fetching data:', error);
    //                 }
    //             }
    //         }
    //     };

    //     fetchPokemonData();
    // }, [selectedPokemonUrl]);

    const onSelectValueCahange = (e) => {
        if (e.target.value) setSelectedPokemonUrl(e.target.value);
    }

    return (
        <>
            <select name="pokemon" id="pokemon" onChange={(e) => onSelectValueCahange(e)}>
                <option key={'static'} value=''>select pokemon</option>
                {
                    pokemonData?.length ? (
                        pokemonData.map(pokemon => (
                            <option key={pokemon?.url} value={pokemon?.url}>{pokemon?.name}</option>
                        ))
                    ) : null
                }
            </select>
            {
                pokemontAb?.length ? (
                    <Abilities pokemontAb={pokemontAb} />
                ) : null
            }
        </>
    )
}

export default Dropdown;