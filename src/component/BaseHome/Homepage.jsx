import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import axios from 'axios';

const Homepage = () => {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setPokemonData(res.data.results || []);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <section className='py-10'>
            <div className='container'>
                <Dropdown pokemonData={pokemonData} />
            </div>
        </section>
    );
}

export default Homepage;