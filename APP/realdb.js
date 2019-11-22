var firebase = require("firebase-admin");

var serviceAccount = require("./tri-commerce-f1c7b03ce5b6.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://tri-commerce.firebaseio.com"
});

/**
* Loading Firebase Database and refering 
* to user_data Object from the Database
*/
var db = firebase.database();
//var ref = db.ref("/categorias");  //Set the current directory you are working in
//console.log(ref);
const data = require("./Intelaf.json");
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        let catRef = db.ref("/categorias/"+ docKey);
        //console.log(docKey);
        let values = {
            name: docKey,
            urls: data[docKey]
        }

        let name = docKey;
        catRef.set(values);
    });
}