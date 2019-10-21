const sock = io();
let server
let name
var socket = io.connect();
const socketUrl = 'http://localhost:9000';
socket = io(socketUrl, {
    autoConnect: false,
  });
console.log('running')
sock.on('join', join);
var socket = io.connect();
socket.on('disconnect', function() {
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
  }
}
function clicked(form) {

  if (form.inputbox.value === '') {
    document.getElementById('error-div').style.display = 'block'
     document.getElementById('error').innerHTML = '⚠️ Please Enter a Game Pin.'
     document.getElementById('form1').setAttribute("class", "shake");
    setTimeout(function() { document.getElementById('form1').removeAttribute("class", "shake"); }, 600);
    return
  } else {
    let name = form.inputbox.value
    sock.emit('name', server)
    document.getElementById('login').style.display = 'none'
    document.getElementById('game').style.display = 'block'
  }
}
sock.on('requests-recieve', recieved);
function recieved(text) {
  if (text == 'nope') {
    document.getElementById('error').innerHTML = '⚠️ Sorry this game does not exsist.'
    document.getElementById('error-div').style.display = 'block'
    document.getElementById('form1').setAttribute("class", "shake");
    setTimeout(function() { document.getElementById('form1').removeAttribute("class", "shake"); }, 600);
  } else {
    document.getElementById('error-div').style.display = 'none'
    document.getElementById('error').style.display = 'none'
    document.getElementById('pin').innerHTML = 'Enter Your Username'
    document.getElementById('button123').value = 'ENTER'
    document.getElementById("form").setAttribute( "placeholder", "Enter Username" );
    document.getElementById("button123").setAttribute( "onClick", "javascript: clicked(this.form);" );
  }
}