const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const data = new FormData();
data.append('locale', 'hi-IN');
data.append('content', `<voice name="hi-IN-SwaraNeural">${fs.readFileSync(`text/${process.argv[3]}`).toString()}</voice>`);
data.append('ip', '2401:4900:1c32:570d:a14e:b6df:9dd9:8ea0');

axios
    .post('https://app.micmonster.com/restapi/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
            'Content-Length': '10000',
        },
    })
    .then((response) => {
        if (!fs.existsSync('audio')) {
            fs.mkdirSync('audio');
        }
        fs.writeFile(`audio/${process.argv[2]}`, Buffer.from(response.data, 'base64'), (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Audio file saved to: ${process.argv[2]}`);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
