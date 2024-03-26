import React, { useState, useEffect } from 'react';

const CountrySelect = ({ handleClienteChange }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/region/americas')
      .then(response => response.json())
      .then(data => {
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
        setLoading(false);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div>
      <label htmlFor="country" className="block text-left text-sm font-medium leading-6 text-gray-900">
        País
      </label>
      <div className="mt-2">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <select
            id="country"
            name="country"
            onChange={handleClienteChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Selecciona un país</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default CountrySelect;
