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

    // adding error status reporting
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    let data = await response.json();

    return data;
}

async function printEvents(user) {
    const eventData = await getEvents(username);
    let ref;
    for (let i = 0; i < eventData.length; i++) {
        console.log(i);
        switch (eventData[i].type) {
            case 'CommitCommentEvent' :
                console.log(
                    '- commented on a commit to ' + eventData[i].repo.name 
                );
                break;

            case 'CreateEvent' :
                ref = eventData[i].payload.ref? eventData[i].payload.ref + ' ': '';
                console.log(
                    '- Created a ' + ref + eventData[i].payload.ref_type + ' ' + eventData[i].repo.name
                );
                break;

            case 'DeleteEvent' :
                ref = eventData[i].payload.ref? eventData[i].payload.ref + ' ': '';
                console.log(
                    '- Deleted a ' + ref + eventData[i].payload.ref_type + ' ' + eventData[i].repo.name
                );
                break;

            case 'ForkEvent' :
                console.log(
                    '- Forked repo ' + eventData[i].payload.forkee.full_name + ' from ' + eventData[i].repo.name 
                );
                break;

            case 'GollumEvent' :
                console.log('- Wiki Event in ' + eventData[i].repo.name);
                for (page of eventData[i].payload.pages) {
                    console.log(
                        '   - ' + page.action + page.page_name + ' page'
                    );
                }
                break;

            case 'IssueCommentEvent' :
                console.log(
                    '- ' + eventData[i].payload.action + ' an Issue in ' + eventData[i].repo.name
                );
                break;

            case 'IssuesEvent' :
                console.log(
                    '- Created an Issue in ' + eventData[i].repo.name
                );
                break;

            case 'MemberEvent' :
                console.log(
                    '- Added '  + eventData[i].payload.member + ' as collaborator to ' + eventData[i].repo.name
                );
                break;

            case 'PublicEvent' :
                console.log(
                    '- Made repo ' + eventData[i].repo.name + ' public'
                );
                break;

            case 'PullRequestEvent' :
                console.log(
                    '- Created a Pull Request ' + eventData[i].repo.name
                );
                break;

            case 'PullRequestReviewEvent' :
                console.log(
                    '- Made a Pull Request Review ' + eventData[i].repo.name
                );
                break;

            case 'PullRequestReviewCommentEvent' :
                console.log(
                    '- Made a Pull Request review comment ' + eventData[i].repo.name
                );
                break;

            case 'PullRequestReviewThreadEvent' :
                console.log(
                    '- ' + eventData[i].payload.action + ' an Issue in ' + eventData[i].repo.name
                );
                break;

            case 'PushEvent' :
                let commits = eventData[i].payload.commits.length === 1 ? ' commit ' : ' commits ';
                console.log(
                    '- Pushed ' + eventData[i].payload.commits.length + commits + 'to ' + eventData[i].repo.name 
                );
                break;

            case 'ReleaseEvent' :
                break;

            case 'SponsorshipEvent' :
                break;

            case 'WatchEvent' :
                console.log(
                    '- Starred ' + eventData[i].repo.name
                );
                break;
        }
    }
}

// take input username from arguments
const username = process.argv[2];

printEvents();
