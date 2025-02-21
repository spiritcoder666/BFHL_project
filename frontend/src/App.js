import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dropdownOptions = ['Alphabets', 'Numbers', 'Highest Alphabet'];

  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const handleSubmit = async () => {
    setError('');
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('http://localhost:3001/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedInput)
      });
      if (!res.ok) {
        const errRes = await res.json();
        setError(errRes.message || 'Error from API');
        return;
      }
      const data = await res.json();
      setResponseData(data);
      // Set the website title to the roll number from the response
      if (data.roll_number) {
        document.title = data.roll_number;
      }
    } catch (e) {
      setError('Invalid JSON Input');
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Highest Alphabet')) {
      filteredResponse.highest_alphabet = responseData.highest_alphabet;
    }
    return (
      <div className="response-container">
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>Frontend for BFHL Challenge</h1>
      <textarea 
        value={jsonInput}
        onChange={handleChange}
        placeholder='Enter JSON here, e.g. { "data": ["A", "C", "z"] }'
        rows="5"
        cols="50"
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {responseData && (
        <div>
          <label htmlFor="options">Select Options:</label>
          <br />
          <select id="options" multiple onChange={handleDropdownChange}>
            {dropdownOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
