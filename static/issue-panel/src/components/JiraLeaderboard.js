// generate react a leaderboard for each hole and  award prizes once the Jira issue is complete

 // to create a leaderboard for each hole that shows the scores and awards prizes once the Jira issue is complete:

import React, { useState, useEffect } from 'react';

const Leaderboard = ({ issueKey }) => {
    const [scores, setScores] = useState([]);
    const [issue, setIssue] = useState({});

    useEffect(() => {
        // Fetch scores from the server
        const fetchScores = async () => {
            const res = await fetch(`https://your-server.com/api/scores?issueKey=${issueKey}`);
            const data = await res.json();
            setScores(data.scores);
        };
        fetchScores();
    }, [issueKey]);

    useEffect(() => {
        // Fetch issue from Jira
        const fetchIssue = async () => {
            const res = await fetch(`https://your-jira-instance.com/rest/api/2/issue/${issueKey}`);
            const data = await res.json();
            setIssue(data);
        };
        fetchIssue();
    }, [issueKey]);

    // submit scores
     useEffect(() => {
        //  scores to the server
        const submitScores = async () => {
            const res = await fetch(`https://your-server.com/api/scores?issueKey=${issueKey}`);
            const data = await res.json();
            setScores(data.scores);
        };
        submitScores();
    }, [issueKey]);

    const handlePrize = () => {
        if (issue.fields.status.name === 'Done') {
            alert('Issue is completed, awarding prizes!');
            // Do something to award the prizes
        }
    };

    useEffect(() => {
        handlePrize();
    }, [issue]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map(score => (
                        <tr key={score.player}>
                            <td>{score.player}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;

//can you generate react a leaderboard for each hole and  award prizes once the Jira issue is complete.   and to allow players to submit their scores 
