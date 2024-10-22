#!/usr/bin/env node

async function getEvents (username) {
    // url to set source
    const url = 'https://api.github.com/users/' + username + '/events';

    // creating request object
    let request = new Request(
        url,
        {
            method: 'GET',
        }
    );

    let response = await fetch(request);

    let data = await response.json();

    return data;
}

// take input username from arguments
const username = process.argv[2];

const eventData = getEvents(username);
