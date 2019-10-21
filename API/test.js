const express = require('express');
const app = express();
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'configuration.cfumvwabw5ok.us-east-2.rds.amazonaws.com',
    user: 'review',
    password: 'Cloud2019',
    database: 'configuration'
});

app.get('/targetingh', function(req, res){
    res.status(200);
    res.send("OK");
});

connection.connect(function(err){

    if(err) throw err;

    app.get('/targeting', function(req, res){
        console.log("Si");

        var advertiser_campaigns = req.query.advertiser_campaigns;
        var zip_code = req.query.zip_code;
        var separados = advertiser_campaigns;

        if(typeof advertiser_campaigns != 'undefined' && advertiser_campaigns && typeof zip_code != 'undefined' && zip_code){

            connection.query( `SELECT c.id
                FROM advertiser_campaigns c
                JOIN campaign_targeting t ON c.id = t.campaign_id
                WHERE t.zip_code = ${zip_code}
                UNION
                SELECT c.id
                FROM advertiser_campaigns c
                WHERE c.id IN (${separados})
                AND NOT EXISTS (
                SELECT t.campaign_id
                FROM campaign_targeting t
                WHERE t.campaign_id = c.id)`,
            function (err, result, fields) {
                if (err) {
                        res.status(400);
                        res.send("Bad Request");
                }
                console.log(result);

                if(result.length > 0){
                    res.status(200);
                    var nuevo = [];
                    for(var i = 0; i < result.length; i++){
                            nuevo.push(result[i]['id']);
                    }
                    res.json(nuevo);
                }else{
                    res.status(200);
                    res.json(result);
                }
            });
            console.log(separados);
            console.log(zip_code);
        }else{
            res.status(200);
            var resultado = {};
            res.json(resultado);
        }
        connection.end();
    })
  
    var server = app.listen(3000, function(){});
}) 
  