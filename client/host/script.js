const sock = io();
var socket = io.connect();
const socketUrl = 'http://localhost:9000';
socket = io(socketUrl, {
    autoConnect: false,
  });
let img1 = 'https://ctl.s6img.com/society6/img/gvwozL3NbYrBa59etDlFbEoxO3c/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/e97ccdf88fe24bb4b99a37fb96bcd415/~~/gamer-collection-do-not-disturb-gamer-at-work-ps4-white-controller-prints.jpg'
let current = '1'
let change1 = function(id){
  document.getElementById('photos').style.display = 'none'
  document.getElementById('more-info').style.display = 'none'
  document.getElementById('loading').style.display = 'block'
  sock.emit('homepage-query(send)specific', id)

}

let add = function(text,one){
  let plays = text.Plays
  let date = text.Date
  let id = text._id
  let img = text.PhotoId
  let title1 = text.Title
  if(!img){ 
    img = 'https://icon-library.net/images/red-cross-icon/red-cross-icon-12.jpg'
  }
  let div = document.getElementById(one)
  let newitem = document.createElement("div");
  newitem.className = 'card'
  let newdiv = document.createElement("div"); 
  newdiv.style.background = `url(${img})`
  newdiv.className = 'image123'
  newdiv.style.backgroundSize = 'cover'
  let titletextnode = document.createTextNode(title1)
  let title = document.createElement('h1')
  title.appendChild(titletextnode)
  let desctextnode = document.createTextNode(`Created ${date} - Plays ${plays}`)
  let description = document.createElement('p')
  description.appendChild(desctextnode)
  let button = document.createElement('button')
  let buttontext = document.createTextNode('Play')
  button.setAttribute( "onClick", `change1('${id}');` );
  button.appendChild(buttontext)
  newitem.appendChild(newdiv)
  newitem.appendChild(title)
  newitem.appendChild(description)
  newitem.appendChild(button)
  div.appendChild(newitem)
}
function change(value,notvalue1,notvalue2){
  document.getElementById(value).className = 'active'
  document.getElementById(notvalue1).className = ''
  document.getElementById(notvalue2).className = ''
  document.getElementById(`div-${value}`).style.display = 'block'
  document.getElementById(`div-${notvalue1}`).style.display = 'none'
  document.getElementById(`div-${notvalue2}`).style.display = 'none'
  if(current === value && value === 1){
    document.getElementById('forms').style.display = 'block'
    document.getElementById('error').style.display = 'none'
    document.getElementById('searchresponse').style.display = 'none'
    document.getElementById('front-page').style.display = 'block'
    document.getElementById('more-info').style.display = 'none'
    document.getElementById('photos').style.display = 'block'
  document.getElementById('loading').style.display = 'none'
  }
  current = value
}
let data = function(text,location){
  for(let i=0;i<text.length;i++){
    add(text[i],'item')
  }
}


let data2 = function(text,location){
  for(let i=0;i<text.length;i++){
    add(text[i],'item1')
  }
} 

let update = function(text){
  text = text[0]
  document.getElementById('play').setAttribute( "onClick", `play('${text._id}');` );
  document.getElementById('more-info').style.display = 'flex'
  document.getElementById('loading').style.display = 'none'
  let photo =  document.getElementById('image1')
  photo.style.background = `url(${text.PhotoId})`
  photo.style.backgroundSize = 'cover'
  document.getElementById('more').innerHTML = text.Title
  document.getElementById('description').innerHTML = text.Desciption
  document.getElementById('plays').innerHTML = `Plays: ${text.Plays}`
  let data = new Date(text.Date*1000)
  data = data.toUTCString()
  data = data.split(' ')
  document.getElementById('date').innerHTML = `Created: ${data[0]} ${data[1]} ${data[2]} ${data[3]}`
  let firstDiv = document.getElementById('questions-cards')
  while (firstDiv.hasChildNodes()) {
    firstDiv.removeChild(firstDiv.lastChild);
}
  for(let k=0;k<text.Questions.length;k++){
    addNewCard(text.Questions[k],text.Answers[k])
  }
}



function addNewCard(question, answer){
  let firstDiv = document.getElementById('questions-cards')
  let div = document.createElement('div')
  let question1 = document.createElement('p')
  let questionText = document.createTextNode(`Question: ${question}`)
  question1.appendChild(questionText)
  let answerText = document.createTextNode(`Answer: ${answer}`)
  let answer1 = document.createElement('p')
  answer1.appendChild(answerText)
  div.appendChild(question1)
  div.appendChild(answer1)
  div.className = 'question-card'
  firstDiv.appendChild(div)
}


function move(direction){
  let scroll = document.getElementById('item')
  if(direction){
      let i = 0
      let interval = setInterval(function increment(){document.getElementById('item').scrollLeft -= 1;i++;if(i>275){clearInterval(interval)}},1)

  }else{
    let i = 0
      let interval = setInterval(function increment(){document.getElementById('item').scrollLeft += 1;i++;if(i>275){clearInterval(interval)}},1)
  }
}

function clicked1(form){
  console.log(form.inputbox.value)
  document.getElementById('forms').style.display = 'none'
  document.getElementById('loading').style.display = 'block'
  sock.emit('searchbar',form.inputbox.value)
}

function serachRecieve(data){
  let firstDiv = document.getElementById('response')
  while (firstDiv.hasChildNodes()) {
    firstDiv.removeChild(firstDiv.lastChild);
  }
  document.getElementById('boxx').value = ''
  document.getElementById('loading').style.display = 'none'
  console.log(data)
  if(data.length === 0){
    document.getElementById('error').style.display = 'block'
    document.getElementById('searchresponse').style.display = 'block'
    document.getElementById('error').innerHTML  = 'Nothing found'
  }else{
    for(let i=0;i<data.length;i++){
      document.getElementById('error').style.display = 'none'
      document.getElementById('searchresponse').style.display = 'block'
      add(data[i],'response')
    }
  }
}

function play(id){
  
}


sock.emit('trending-now', 'request')
sock.emit('homepage-query(send)', 'request')
sock.on('homepage-query(recieve)', data);
sock.on('homepage-query(recieve)Specific', update);
sock.on('feautured-list', data2);
sock.on('search-recieve',serachRecieve)
