let password = 'Guss'
let username = 'Admin'
let pmwValue
let loggedInIds = []
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
                pmwValue = device.MainFan
            }
        }
    }
}