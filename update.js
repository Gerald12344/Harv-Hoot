let request = require('request')
let fs = require('fs')

var JavaScriptObfuscator = require('javascript-obfuscator');
let FileList = ['server/game/game.js','server/game/database.js','server/login/login.js','client/index.html','client/play/index.html','client/play/scripts/client.js','client/play/styles/style.css','client/host/index.html','client/host/script.js','client/host/style.css','client/host/play/index.html','client/host/play/script.js','client/host/play/style.css']

for(let i = 0;i<FileList.length;i++){
request.get(`http://192.168.1.101:8000/${FileList[i]}`, function (error, response, body) {
console.log('error:',error)    
console.log(i + '  ' +FileList[i])
    //console.log('body:', body); // Print the HTML for the Google homepage.
    if(i==5||i==8||i==11){
        var obfuscationResult = JavaScriptObfuscator.obfuscate(body,{
                compact: true,
                controlFlowFlattening: true
            }
        );
        console.log(obfuscationResult.getObfuscatedCode());
        fs.writeFileSync(FileList[i],obfuscationResult.getObfuscatedCode());
    }else{
       fs.writeFileSync(FileList[i],body);
    }
  });
}
