/*const admin = require('firebase-admin');

let serviceAccount = require('./tri-commerce-f1c7b03ce5b6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

/*let docRef = db.collection('categorias').doc('Audio');

let setAda = docRef.set({
    name: 'Audio'    
});
*/
/*
const data = require("./Intelaf.json");
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        //console.log(docKey);
        let values = {
            name: docKey,
            urls: data[docKey]
        }
        //console.log(values)
        
        db.collection("categorias").doc(docKey).set(values).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
        
    });
}*/

var admin = require("firebase-admin");

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog/posts");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});