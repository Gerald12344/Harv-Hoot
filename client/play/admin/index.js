 const sock = io();
    var socket = io.connect();
    function clicked1(form) {
        if (form.inputbox.value == '') {
            return
        } else {
            let username2 = form.inputbox.value
            let password = form.inputbox2.value
            let server = { "username2": username2, "password": password }
            console.log(server)
            sock.emit('Admin-Panel-Login', server)
        }
    }
    function LoggedInAdmin(value) {
        if (value == true) {
            document.getElementById('Control-Panel').style.display = 'flex'
            document.getElementById('form').style.display = 'none'
            document.getElementById("boxx2").value = ''
            document.getElementById("wrong").style.display = 'none'
        } else {
            document.getElementById("boxx2").value = ''
            document.getElementById("wrong").style.display = 'block'
        }
    }
    sock.on('LoggedInAdmin', LoggedInAdmin);

var slider = document.getElementById("myRange");
    var output = document.getElementById("MainFanSpeed");
    output.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = this.value;
    }
    //----------------------------------------------
    var slider2 = document.getElementById("myRange2");
    var output2 = document.getElementById("CPUFanSpeed");
    output2.innerHTML = slider.value;

    slider2.oninput = function () {
        output2.innerHTML = this.value;
    }
    //------------------------------------------------
    var slider3 = document.getElementById("myRange3");
    var output3 = document.getElementById("RoomFanSpeed");
    output3.innerHTML = slider.value;

slider3.oninput = function () {
        output3.innerHTML = this.value;
    }
    function update(){
        var slider = document.getElementById("myRange");
	var slider2 = document.getElementById("myRange2");
        let data = {'MainFan':slider.value,'CPUFan':slider2.value}
	if(slider2.value>0){
		document.getElementById('CPU-FAN-STATUS').innerHTML = 'true'
		document.getElementById('CPU-FAN-STATUS').style.color = 'green'
	}else{
		document.getElementById('CPU-FAN-STATUS').innerHTML = 'false'
        	document.getElementById('CPU-FAN-STATUS').style.color = 'red'
	}
	if(slider.value>0){
                document.getElementById('MAIN-FAN-STATUS').innerHTML = 'true'
                document.getElementById('MAIN-FAN-STATUS').style.color = 'green'
        }else{
                document.getElementById('MAIN-FAN-STATUS').innerHTML = 'false'
                document.getElementById('MAIN-FAN-STATUS').style.color = 'red'
	}

        sock.emit('Admin-Panel-Data', data)
    }
    function values(data){
        document.getElementById("myRange").value = data.MainFan
        document.getElementById("MainFanSpeed").innerHTML = data.MainFan
	document.getElementById("myRange2").value = data.CPUFan
        document.getElementById("CPUFanSpeed").innerHTML = data.CPUFan
	if(data.CPUFan>0){
                document.getElementById('CPU-FAN-STATUS').innerHTML = 'true'
                document.getElementById('CPU-FAN-STATUS').style.color = 'green'
        }else{
                document.getElementById('CPU-FAN-STATUS').innerHTML = 'false'
                document.getElementById('CPU-FAN-STATUS').style.color = 'red'
        }
        if(data.MainFan>0){
                document.getElementById('MAIN-FAN-STATUS').innerHTML = 'true'
                document.getElementById('MAIN-FAN-STATUS').style.color = 'green'
        }else{
                document.getElementById('MAIN-FAN-STATUS').innerHTML = 'false'
                document.getElementById('MAIN-FAN-STATUS').style.color = 'red'
        }

    }
    sock.on('fan-data', values);

function temp(data){
        document.getElementById('CPUTEMP').innerHTML = 'Current Temperature: '+data+'*'
	console.log(data)
    }
sock.on('CPU-temp', temp);



