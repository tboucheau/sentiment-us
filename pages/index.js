import React, { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://nnbgvwnxn1.execute-api.eu-central-1.amazonaws.com/us/sentiment-analysis', { data: inputValue });
      setResponseData(response.data);
    } catch (error) {
      setError(error);
    }
  };

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Shout something you think</h1>
	<p>AI will tell you if it's positive or negative !! (validate with ↩️ key)</p>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Type your text" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
      {responseData && (
<div className="alert alert-info" role="alert">
What you say is {JSON.stringify(responseData, null, 2) === "\"NEGATIVE\"" ? "negative 😥 !" : 
   JSON.stringify(responseData, null, 2) === "\"POSITIVE\"" ? "positive 😃 !" :
   JSON.stringify(responseData, null, 2) === "\"NEUTRAL\"" ? "neutral 😐 !" : "inconnu"}</div>
      )}
      {error && <div className="alert alert-danger" role="alert">Error: {error.message}</div>}
    </div>
  );
};

export default IndexPage;
