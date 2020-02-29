const sock = io();
let server
let name
let pin
var socket = io.connect();
const socketUrl = 'http://localhost:9000';
socket = io(socketUrl, {
  autoConnect: false,
});
console.log('running')
sock.on('join', join);
var socket = io.connect();
socket.on('disconnect', function () {
  document.getElementById('main-body').style.display = 'none'
  document.getElementById('error-404').style.display = 'block'
});

function join(text) {
  console.log(text)
}
function clicked1(form) {

  if (form.inputbox.value == '') {
    return
  } else {
    let server = form.inputbox.value
    document.getElementById("form").value = ''
    sock.emit('request', server)
    pin = server
    console.log(pin)
  }
}
function clicked(form) {

  if (form.inputbox.value === '') {
    document.getElementById('error-div').style.display = 'block'
    document.getElementById('error').style.display = 'block'
    document.getElementById('error').innerHTML = '⚠️ Please Enter a username.'
    document.getElementById('form1').setAttribute("class", "shake");
    setTimeout(function () { document.getElementById('form1').removeAttribute("class", "shake"); }, 600);
    return
  } else {
    let name = form.inputbox.value
    let data = {Pin: `${pin}`,name: `${name}`}
    sock.emit('name', data)
    document.getElementById('login').style.display = 'none'
    document.getElementById('Waiting-Room').style.display = 'block'
  }
}
sock.on('requests-recieve', recieved);
function recieved(text) {
  if (text == 'nope') {
    document.getElementById('error').innerHTML = '⚠️ Sorry this game does not exsist.'
    document.getElementById('error-div').style.display = 'block'
    document.getElementById('form1').setAttribute("class", "shake");
    setTimeout(function () { document.getElementById('form1').removeAttribute("class", "shake"); }, 600);
  } else {
    document.getElementById('error-div').style.display = 'none'
    document.getElementById('error').style.display = 'none'
    document.getElementById('pin').innerHTML = 'Enter Your Username'
    document.getElementById('button123').value = 'ENTER'
    document.getElementById("form").setAttribute("placeholder", "Enter Username");
    document.getElementById("button123").setAttribute("onClick", "javascript: clicked(this.form);");
  }
}

function kicked(data){
  document.getElementById('Waiting-Room').style.display = 'none'
  console.log('kicked');
  document.getElementById('login').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  document.getElementById('error-div').style.display = 'block';
  document.getElementById('error').style.display = 'block';
  document.getElementById('error').innerHTML = data;
  document.getElementById('pin').innerHTML = 'Enter Your Username';
  document.getElementById('button123').value = 'Submit';
  document.getElementById("form").setAttribute("placeholder", "Enter Game Pin");
  document.getElementById("button123").setAttribute("onClick", "javascript: clicked1(this.form);");
}

sock.on('removed', kicked);