const request = require('request');
const fs = require('fs');
const sleep = require('system-sleep');


let rawdata = fs.readFileSync('Intelaf.json');
let urls = JSON.parse(rawdata);
//console.log(urls);
const host = "http://localhost:3000/";

/*
for(var key in urls){   
    //console.log(urls[key]);
    for(i=0; i<urls[key].length; i++){
        var path = "intelaf?url=".concat(urls[key][i]);
        var finalpath = host.concat(path);
        console.log(finalpath);
        
        
        request(host.concat(path), { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(key);
            console.log(body.data)
        });
        sleep(60*1000); // sleep for 10 seconds
    }    
}
*/
async function sendRequest () {
    let { response, body } = await request.get(`http://localhost:3000/intelaf?url=http://intelaf.com/Precios_stock_resultado.aspx?area=SERVIDORES`)
    console.log("Mierda");
    if (body.statusCode !== 200) {
        return error(response, body)
    }
  
    success(response, body)
}
sendRequest()
  