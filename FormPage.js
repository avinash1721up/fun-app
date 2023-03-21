import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';


function FormPage() {
  const [name, setName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState({ age: null, country: null, gender: null });

  const handleChange = (event) => {
    const newName = event.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\s{2,}/g, ' ');
    setName(newName);
    setIsButtonDisabled(newName.trim().length < 3);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setResult({ age: null, country: null, gender: null });

    try {
      const [ageResponse, countryResponse, genderResponse] = await Promise.all([
        axios.get(`https://api.agify.io/?name=${name}`),
        axios.get(`https://api.nationalize.io/?name=${name}`),
        axios.get(`https://api.genderize.io/?name=${name}`),
      ]);

      setResult({
        age: ageResponse.data.age,
        country: countryResponse.data.country?.[0]?.country_id || countryResponse.data.country?.[1]?.country_id || null,
        gender: genderResponse.data.gender,
      });
    } catch (error) {
      setError('An error occurred while fetching data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setName('');
    setIsButtonDisabled(true);
    setError('');
    setResult({ age: null, country: null, gender: null });
  };

  return (
    <div>
      <h1>Enter your name:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isButtonDisabled}>
          {isLoading ? 'Loading...' : 'Check Fun'}
        </button>
        <button type="button" onClick={handleClear}>Clear</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result.age && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>{result.gender}</td>
                <td>{result.age}</td>
                <td>{result.country}</td>
              </tr>
              
            </tbody>
          </table>
        )}
      </form>
      <Footer />
    </div>
  );
}

export default FormPage;

