const si = require('systeminformation');
 
si.time(function(data) {
    console.log('CPU Information:');
    console.log(data)
})
