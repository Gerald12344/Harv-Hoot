const raspi = require('raspi');
const pwm = require('raspi-pwm');
 
raspi.init(() => {
  const led = new pwm.PWM('P1-12');
  module.exports = {
    login: function(sock,io,usernameInput,passwordInput) {
        console.log('trying')
        if(usernameInput == username && passwordInput == password){
            loggedInIds.push(sock.id)
            console.log('logged in')
            io.sockets.connected[sock.id].emit('LoggedInAdmin', true);
        }else{
            io.sockets.connected[sock.id].emit('LoggedInAdmin', false);
        }
    },
    data: function(sock,io,device) {
        for(let i=0;i<loggedInIds.length;i++){
            if(loggedInIds[i] == sock.id){
                //do stuff
               led.write(device.MainFan/255);
            }
        }
    }
}
});
