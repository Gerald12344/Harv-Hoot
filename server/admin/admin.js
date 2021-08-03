const raspi = require('raspi');
const pwm = require('raspi-pwm');
let password = 'Guss'
let username = 'Admin'
let cpuTemp = 30

var temp = require("pi-temperature");
function measureTemp(){
	temp.measure(function(err, temp) {
    		if (err) console.error(err);
    		else cpuTemp = temp;
	});
}
let loggedInIds = []

let pmwValue2 = 0
let pmwValue = 0 
raspi.init(() => {
function update(){
  const led = new pwm.PWM('P1-12');
  const led2 = new pwm.PWM('P1-33');
led.write(pmwValue/255);
led2.write(pmwValue2/255);
}
setInterval(update,50);
});


module.exports = { login: function(sock,io,usernameInput,passwordInput) {
        console.log('trying')
        if(usernameInput == username && passwordInput == password){
            loggedInIds.push(sock.id)
            console.log('logged in')
            io.sockets.connected[sock.id].emit('LoggedInAdmin', true);
	    let data = {"MainFan": pmwValue,"CPUFan": pmwValue2};
            io.sockets.connected[sock.id].emit('fan-data', data);
            console.log(data); 
	   function sendTemp(){
           measureTemp()
           for(let i = 0;i<loggedInIds.length;i++){
		if(!io.sockets.connected[loggedInIds[i]] == ''){
               	     io.sockets.connected[loggedInIds[i]].emit('CPU-temp', cpuTemp);
               }
           }
          }
         setInterval(sendTemp, 500);

        }else{
            io.sockets.connected[sock.id].emit('LoggedInAdmin', false);
        }
    },
    data: function(sock,io,device) {
console.log(device.MainFan)
                pmwValue = device.MainFan
		pmwValue2 = device.CPUFan
for(let i = 0;i<loggedInIds.length;i++){
                if(!io.sockets.connected[loggedInIds[i]] == ''){

let data = {"MainFan": pmwValue,"CPUFan": pmwValue2};
	io.sockets.connected[loggedInIds[i]].emit('fan-data', data);
}
}
    },
   disconnect: function(sock,io){
	for(let k = 0;k<loggedInIds.length;k++){
	    if(loggedInIds == sock.Id){
		loggedInIds.splice(k,1);
	    }
	}
  }
}



