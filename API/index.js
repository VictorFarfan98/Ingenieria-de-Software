const express = require("express");
const app = express();
const puppeteer = require('puppeteer');


let scrapeIntelaf = async (link) => {
    const browser = await puppeteer.launch({ //Launch Puppeteer Instance
        headless: true
    });
    const page = await browser.newPage();
    //await page.emulate(iPhone);
    await page.setViewport({
        width: 1400,
        height: 778
    });

    await page.goto(link);

    await autoScroll(page);

    const result = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let elements = document.querySelectorAll('.descripcion'); // Select all Cars 

        for (var element of elements) { // Loop through each product
            let Product = element.childNodes[0].innerText; // Select the title of the product
            let Price = element.childNodes[1].innerText; // Select the price of the product
            let CashPrice = element.childNodes[2].innerText;    //Select the Cash price of the product

            data.push({
                Product,
                Price,
                CashPrice,
            }); // Push an object with the data into our array
        }

        return data; // Return our data array
    });

    browser.close();
    return result; // Return the data
};

let scrapeMacro = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://www.macrosistemas.com/productos/memorias/memorias-usb');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const result = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        $('li.pagination-next').each(function() {
            const url = $(this).find('a').attr('title');
            //console.log(url)
            //const title = $(this).find('a').attr('title')
            data.push({
                'title' : url                
            });
        });
        
        let elements = document.querySelectorAll('.product-inner'); // Select all products  
        let next = document.getElementsByTagName('ul');
        //data.push({next});
        for (var element of elements) { // Loop through each product
            let Product = element.childNodes[3].innerText;// Select the title of the product
            let Price = element.childNodes[5].innerText; // Select the price of the product

            data.push({
                Product,
                Price,
            }); // Push an object with the data into our array
        }

        return data; // Return our data array
    });

    browser.close();
    return result; // Return the data
};

async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 50;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
}

app.get('/macrosistemas', function (req, res) {
    var good = true;
    let data = [];
    
    //console.log(url)
    scrapeMacro(req.query.url).then((value) => {        
        //console.log(value);        
        if(value.length <= 0){
            //good = false;
        }
        for(var i = 0; i < value.length; i++){
            //console.log(value[i]);
            if(typeof value[i]["Product"] === undefined){
                //good = false;
            }else{
                if(value[i]["Price"] != undefined){
                    if(!value[i]["Price"].includes("Q") || !value[i]["Price"].includes("En efectivo")){
                        //good = false;
                        console.log("Producto eliminado");
                        value.splice(i, 1);
                    }else{
                        //Manage prices
                        var producto = value[i]["Product"].substring(
                            0, 
                            value[i]["Product"].indexOf("\n")
                        );
                        var precioNormal = value[i]["Price"].substring(
                            value[i]["Price"].indexOf(" ") + 1, 
                            value[i]["Price"].indexOf("\n")
                        );
                        var precioEfectivo = value[i]["Price"].substring(
                            value[i]["Price"].lastIndexOf(" ") + 1, 
                            value[i]["Price"].length
                        );
                        data.push({
                            producto,
                            precioNormal,
                            precioEfectivo                            
                        }); // Push an object with the data into our array
                        //var precioNormal = value[i]["Price"]
                        value[i]["Price"] = value[i]["Price"].concat("\n")
                        console.log(value[i]["Price"])
                        /*var precioNormal = value[i]["Price"].substring(
                            str.lastIndexOf(":") + 1, 
                            str.lastIndexOf(";")
                        );*/
                    }
                }else{
                    //good = false;
                }
            }
        }
        //console.log(data.length);
        if(good == true){
            respuesta = {
                error:false,
                statusCode: 200,
                data: data
            };
        }else{
            respuesta = {
                error:true,
                statusCode: 404,
                data: "No se pudieron obtener los productos y/o precios"
            };
        }        
        res.send(respuesta);
    });        
});

async function get (url) {
    return new Promise((resolve, reject) => {
        request({ url, method: 'GET' }, (error, response, body) => {
            if (error) return reject(error)
    
            return resolve({ body, response })
        })
    })
}

app.get('/intelaf', function (req, res) {
    var good = true;
    console.log(req.query.url);
    scrapeIntelaf(req.query.url).then((value) => {        
        //console.log(value);        
        if(value.length <= 0){
            good = false;
        }
        for(var i = 0; i < value.length; i++){
            //console.log(value[i]);
            if(typeof value[i]["Product"] === undefined){
                good = false;
            }else{
                if(value[i]["Price"] != undefined){
                    if(!value[i]["Price"].includes("Precio normal")){
                        //good = false;
                        value.splice(i, 1);
                    }else{
                        if(value[i]["CashPrice"] != undefined){
                            if(!value[i]["CashPrice"].includes("Beneficio Efectivo")){
                                //good = false;
                                value.splice(i, 1);
                            }
                        }else{
                            good = false;
                        }
                    }
                }else{
                    good = false;
                }
            }
        }
        
        if(good == true){
            respuesta = {
                error:false,
                statusCode: 200,
                data: [req.query.cat, value]
            };
        }else{
            respuesta = {
                error:true,
                statusCode: 404,
                data: "No se pudieron obtener los productos y/o precios"
            };
        }        
        res.send(respuesta);
    });        
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

