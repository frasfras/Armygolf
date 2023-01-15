//  generate react to commit request to jira to create sandtrap
//  here's an example of how you might use React to pull data from Jira and use that data to create a sand trap in a game:

import React, { useState, useEffect } from 'react';

const JiraSandTrap = ({ issueKey }) => {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        // Fetch data from Jira using the API
        const fetchData = async () => {
            const res = await fetch('https://dodo77.atlassian.net/rest/api/2/issue/YOUR-ISSUE-KEY/changes?expand=changelog');
            const data = await res.json();
            setCommits(data.changelog.histories.map(history => history.items));
        };
        fetchData();
    }, []);

    return (
        <div>
            {commits.map(commit => (
                <div key={commit.id}>
                    {/* Use the commit data to create a sand trap in the game */}
                    <SandTrap commit={commit} />
                </div>
            ))}
        </div>
    );
};

const SandTrap = ({ commit }) => {
    // Use the commit data to create a sand trap in the game
    return <div>Sand Trap created from commit</div>;
};

export default JiraSandTrap;

// Here, we are using the useState and useEffect hooks in React
//  to fetch data from Jira using the API. The fetchData
//   function is executed once when the component is rendered, and it fetches the commit data from 
//Jira's changelog and stores it in the commits state. We are then mapping over the commits data to create a SandTrap component for each commit.

