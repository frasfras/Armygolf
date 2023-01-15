// This component takes in a holeNumber prop, which is used to display the number of the hole that the player is submitting their score for. The component uses a useState hook to keep track of the player's score, which is initially set to an empty string.

// The handleSubmit function is called when the player submits the form, and it prevents the page from refreshing and Send the score to the server for storage or update leaderboard directly as you want.
// You would want to put this component in a loop where it is rendering the forms for each holes you want to get the scores from.
import React, { useState } from 'react';

const HoleScoreForm = ({ holeNumber }) => {
    // useState hook to keep track of the player's score for the hole
    const [score, setScore] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send the score to the server for storage
        // Or to update leaderboard directly
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Hole {holeNumber}:
                <input type="number" value={score} onChange={event => setScore(event.target.value)} />
            </label>
            <button type="submit">Submit Score</button>
        </form>
    );
}

export default HoleScoreForm;
