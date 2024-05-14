import React from 'react'

const Abilities = ({ pokemontAb }) => {
    return (
        <ul className='mt-10'>
            {
                pokemontAb.map(el => (
                    <li key={el?.ability?.name || 'kk'}>{el?.ability?.name}</li>
                ))
            }
        </ul>
    )
}

export default Abilities;