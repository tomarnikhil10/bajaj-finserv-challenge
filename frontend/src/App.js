import React, { useState } from 'react';

export default function BajajFinservApp() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);

            const res = await fetch('http://localhost:5000/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: parsedInput })
            });

            const data = await res.json();
            setResponse(data);
        } catch (e) {
            alert('Invalid JSON input. Please enter a valid array like ["T", "e", "s", "t", "1", "2", "3"]');
        }
    };

    return (
        <div className="app">
            <h1>Bajaj Finserv Health Dev Challenge</h1>
            <textarea
                placeholder='Enter JSON data...'
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ width: '100%', height: '100px' }}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <div>
                    <h2>Response:</h2>
                    <p>Numbers: {JSON.stringify(response.numbers)}</p>
                    <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
                    <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>
                </div>
            )}
        </div>
    );
}
