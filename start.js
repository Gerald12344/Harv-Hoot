var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');


// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1547J1ych8vG33a78ftt8KSPxC-pvlozlQQTet8XvKOY');




// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function(err) {
        doc.addRow(1, {
            TimeStamp: today.toLocaleString("en-UK"),
        }, function(err) {
            if (err) {
                console.log(err);
            }
        });
        // Get all of the rows from the spreadsheet.
        doc.getRows(1, function(err, rows) {
            console.log(rows)
        });


}
