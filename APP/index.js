const request = require('request');
const fs = require('fs');
const sleep = require('system-sleep');

var firebase = require("firebase-admin");
var serviceAccount = require("./tri-commerce-f1c7b03ce5b6.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://tri-commerce.firebaseio.com"
});
var db = firebase.database();


let rawdataIntelaf = fs.readFileSync('Intelaf.json');
let urlsIntelaf = JSON.parse(rawdataIntelaf);
let rawdataMacro = fs.readFileSync('Macrosistemas.json');
let urlsMacro = JSON.parse(rawdataMacro);

let rawdataIntelafOfertas = fs.readFileSync('test.json');
let urlsIntelafOfertas = JSON.parse(rawdataIntelafOfertas);

let rawdataMacroOfertas = fs.readFileSync('testmacro.json');
let urlsMacroOfertas = JSON.parse(rawdataMacroOfertas);


//console.log(urls);
const host = "http://localhost:3000/";
var path = "intelaf?url=";
// My function
const myfunction = async function(url) {
    return new Promise((resolve, reject)=>{
        try{
            request(url, { json: true }, (err, res, body) => {
                if (err) { return reject(err) }
                //console.log(key);
                return resolve(body.data);
            });
        }catch(e){
            console.log(e);
        }
    });
    
}
  
// Start function
const start = async function(url) {
    const result = await myfunction(url);
    
    //result[0] = categoria
    //result[1] = array de productos     
    for(producto in result[1]){
        console.log(result[0] + ": ", result[1][producto])

        let productoname = result[1][producto]["Product"].replace(/[#.,\s\/]/g, ' ');;
        let catRef = db.ref("/categorias/"+ result[0]+"/"+productoname);
        catRef.set(result[1][producto]);
    }
}

const readUrlsIntelaf = async function(paths){
    for(var key in urlsIntelaf){   
        //console.log(urls[key]);
        for(i=0; i<urlsIntelaf[key].length; i++){
            var path = paths.concat(urlsIntelaf[key][i]);
            var finalpath = host.concat(path);
            //console.log(finalpath);
            //console.log(key);
            console.log(host.concat(path+"&cat="+key));
            await start(host.concat(path+"&cat="+key))


        }    
    }
}

const readUrlsMacro = async function(paths){
    for(var key in urlsMacro){   
        //console.log(urls[key]);
        for(i=0; i<urlsMacro[key].length; i++){
            var path = paths.concat(urlsMacro[key][i]);
            var finalpath = host.concat(path);
            //console.log(finalpath);
            //console.log(key);
            console.log(host.concat(path+"&cat="+key));
            await start(host.concat(path+"&cat="+key))
        
        }    
    }
}

const readUrlsMacroOfertas = async function(paths){
    for(var key in urlsMacroOfertas){   
        //console.log(urls[key]);
        for(i=0; i<urlsMacroOfertas[key].length; i++){
            var path = paths.concat(urlsMacroOfertas[key][i]);
            var finalpath = host.concat(path);
            //console.log(finalpath);
            //console.log(key);
            console.log(host.concat(path+"&cat="+key));
            await start(host.concat(path+"&cat="+key))
        
        }    
    }
}

const readUrlsIntelafOfertas = async function(paths){
    for(var key in urlsIntelafOfertas){   
        //console.log(urls[key]);
        for(i=0; i<urlsIntelafOfertas[key].length; i++){
            var path = paths.concat(urlsIntelafOfertas[key][i]);
            var finalpath = host.concat(path);
            //console.log(finalpath);
            //console.log(key);
            console.log(host.concat(path+"&cat="+key));
            await start(host.concat(path+"&cat="+key))
        
        }    
    }
}

const readBoth = async function(){
    //await readUrlsIntelaf(path);
    console.log("Despues");
    path = "macrosistemas?url=";
    //await readUrlsMacro(path);
    path = "macrosistemasOfertas?url=";
    //await readUrlsMacroOfertas(path);
    path = "intelafOfertas?url=";
    await readUrlsIntelafOfertas(path);
}


readBoth();
