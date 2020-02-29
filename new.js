let request = require('request')

const options = {
    url: 'localhost:8081/playerRank',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        '
    }
};
request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});