import React from 'react'

function CountryList({city}) {
  return (
    <li className="bg-gray-500 p-1 rounded list-none flex items-center gap-3">
      <div className="flex gap-3">
        <span className="text-xl">{city.emoji}</span>
        <h3 className="text-xl uppercase text-gray-300">{city.countryName}</h3>
      </div>
    </li>
  )
}

export default CountryList