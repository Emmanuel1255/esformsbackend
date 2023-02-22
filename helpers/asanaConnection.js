const asana = require('asana')
// eslint-disable-next-line no-undef
const ASANA_TOKEN = process.env.ASANA_PAT

const client = asana.Client.create().useAccessToken(ASANA_TOKEN)

function createAsanaTask(data) {
    return client.tasks
        .createTask({
            projects: '1195154733712533',
            name: 'New Vehicle Request.',
            assignee: '1198727297178672',
            pretty: true,
            details: data,
        })
        .then((result) => {
            console.log(result)
        })
}

module.exports = createAsanaTask
