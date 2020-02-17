//Instalise variables
const sock = io();
var socket = io.connect();
let currentId
let pin;
const socketUrl = 'http://localhost:9000';
socket = io(socketUrl, {
    autoConnect: false,
});

//Gain ID for game
let gameId = window.localStorage.getItem('game-id');
if(gameId == ''){
    window.location.href = '../';
}else{
    gameId = JSON.parse(gameId)
}
console.log(gameId)

//All socket connections
sock.emit('game-creation', gameId); //Create new game and Pin
sock.on('new-pin-host', newPin); //New pin from the server
sock.on('new-member', newmember); //New member

//Functions

//get element
function get(id) {
    return document.getElementById(id)
}

//Set new pin on the screen to see
function newPin(data) {
    window.localStorage.setItem('game-id', '');
    pin = data[1]
    get('loading').style.display = 'none'
    get('waiting-Page').style.display = 'block'
    if (data[0]) {
        get('pin').innerHTML = `Curent Pin: ${data[1]}`
    } else {
        get('pin').innerHTML = 'Internal server error please refresh the page'
    }
}


//new memeber
function newmember(name) {
    get('play1234').style.cursor = 'pointer'
    console.log(name)
    let div = get('players123')
    let newdiv = document.createElement('div')
    let node = document.createElement('h3')
    let text = document.createTextNode(name.name)
    node.setAttribute("onClick", `kick('${name.Id}');`);
    node.setAttribute("id", `${name.Id}`);
    node.appendChild(text)
    newdiv.appendChild(node)
    div.appendChild(newdiv)
    get('members').innerHTML = `Members: ${get('players123').childElementCount-2}`
}

//kick member
function kick(id){
    remove(id)
    let data = {pin: `${pin}`,id: `${id}`,text: '⚠️ You were kicked.'}
    console.log(data)
    sock.emit('kicked', data);
}

//remove from list
function remove(id){
    get(id).parentElement.remove();
    get('members').innerHTML = `Members: ${get('players123').childElementCount-2}`
}