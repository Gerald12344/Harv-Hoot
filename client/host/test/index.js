let img = document.getElementById('img-parrallax')
let img2 = document.getElementById('img-parrallax2')
let state = false
let current = '1'
setInterval(rendercheck, 100)

function rendercheck() {
    if (window.matchMedia("(min-width: 700px)").matches) {
        state = false
        document.getElementById('img').style.display = 'block'
        document.getElementById('ceneter').style.display = 'block'
        document.getElementById('img2').style.display = 'block'
        document.getElementById('divy').style.marginTop = '0vh'
        document.getElementById('above-triangles').style.display = 'block'
        document.getElementById('below-triangles').style.display = 'block'
        // document.getElementById('footer').style.display = 'flex'
    } else {
        document.getElementById('img').style.display = 'none'
        document.getElementById('img2').style.display = 'none'
        document.getElementById('above-triangles').style.display = 'none'
        document.getElementById('below-triangles').style.display = 'none'
        document.getElementById('divy').style.marginTop = '-100vh'
        document.getElementById('ceneter').style.display = 'none'
        //document.getElementById('footer').style.display = 'block'
        state = true
    }
}
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
/*
setInterval(render,0.01)
function render(){
    if(state == false){
        document.getElementById('divy').style.marginTop = '0vh'
        img.style.top = window.pageYOffset/2+"px";
        img2.style.top = (window.pageYOffset-window.innerHeight)/6-80+"px";
    }else{
        document.getElementById('divy').style.marginTop = '-100vh'
        document.getElementById('ceneter').style.display = 'none'
        return
    }
    
}
*/

window.addEventListener("DOMContentLoaded", scrollLoop, false);
var bigYellowCircle = document.getElementById("img-parrallax");
var xScrollPosition;
var yScrollPosition;

function scrollLoop(e) {
    xScrollPosition = window.scrollX;
    yScrollPosition = window.scrollY;
    setTranslate(0, yScrollPosition * 0.5, bigYellowCircle);
    setTranslate(0, yScrollPosition * 0.3 - 260, img2);
    requestAnimationFrame(scrollLoop);
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0";
}


function change(value, notvalue1, notvalue2, notvalue3) {
    document.getElementById(notvalue1).className = ''
    document.getElementById(notvalue2).className = ''
    document.getElementById(notvalue3).className = ''
    if (!(value === 4)) {
        document.getElementById(value).className = 'active'
    }
    document.getElementById(`div-${value}`).style.display = 'block'
    document.getElementById(`div-${notvalue1}`).style.display = 'none'
    document.getElementById(`div-${notvalue2}`).style.display = 'none'
    document.getElementById(`div-${notvalue3}`).style.display = 'none'
    if (current === value && value === 1) {
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

const form = document.getElementById('boxx');
let span = document.getElementById('usernames')

const form2 = document.getElementById('boxx2');
let span2 = document.getElementById('passwords');


form.addEventListener('focusin', (event) => {
    form.style.borderColor = '#2ecc71'
    form.style.borderStyle = 'solid'
    let i = 0
    let interval = setInterval(animate, 5)
    span.style.marginTop = '-25px;'
    span.style.fontSize = '20px'
    function animate() {
        if (i > 24) {
            clearInterval(interval)
        } else {
            i++
            span.style.marginTop = (span.style.marginTop).replace(/[^0-9 ]/g, "") - 1 + 'px'

            if ((i % 5) === 0) {
                span.style.fontSize = parseInt((span.style.fontSize).replace(/[^0-9 ]/g, "")) - 1 + 'px'
            }
        }
    }


});

form.addEventListener('focusout', (event) => {
    if (form.value == '') {
        form.style.borderColor = '#dcdde1'
        form.style.borderStyle = 'none'
        form.style.borderBottomStyle = 'solid'
        let i = 0
        let interval = setInterval(animate, 5)

        function animate() {
            if (i > 24) {
                clearInterval(interval)
            } else {
                i++
                span.style.marginTop = parseInt((span.style.marginTop).replace(/[^0-9 ]/g, "")) + 1 + 'px'
                if ((i % 5) === 0) {
                    span.style.fontSize = parseInt((span.style.fontSize).replace(/[^0-9 ]/g, "")) + 1 + 'px'
                }
            }
        }
    }
});


form2.addEventListener('focusin', (event) => {
    form2.style.borderColor = '#2ecc71'
    form2.style.borderStyle = 'solid'
    let i = 0
    let k = 0
    let interval = setInterval(animate, 5)
    span.style.marginTop = '-25px;'
    span.style.fontSize = '20px'
    function animate() {
        if (i > 24) {
            clearInterval(interval)
        } else {
            i++
            span2.style.marginTop = (span2.style.marginTop).replace(/[^0-9 ]/g, "") - 1 + 'px'
            if ((i % 5) === 0) {
                span2.style.fontSize = parseInt((span2.style.fontSize).replace(/[^0-9 ]/g, "")) - 1 + 'px'
            }
        }
    }


});



form2.addEventListener('focusout', (event) => {
    if (form2.value = '') {
        form2.style.borderColor = '#dcdde1'
        form2.style.borderStyle = 'none'
        form2.style.borderBottomStyle = 'solid'
        let i = 0
        let interval = setInterval(animate, 5)

        function animate() {
            if (i > 24) {
                clearInterval(interval)
            } else {
                i++
                span2.style.marginTop = parseInt((span2.style.marginTop).replace(/[^0-9 ]/g, "")) + 1 + 'px'

                if ((i % 5) === 0) {
                    span2.style.fontSize = parseInt((span2.style.fontSize).replace(/[^0-9 ]/g, "")) + 1 + 'px'
                }
            }
        }
    }
});
