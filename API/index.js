const express = require("express");
const app = express();
const puppeteer = require('puppeteer');


let scrapeIntelaf = async (link) => {
    const browser = await puppeteer.launch({ //Launch Puppeteer Instance
        headless: false
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
        let imgdata = [];
        let address = [];
        let elements = document.querySelectorAll('.descripcion'); // Select all Cars 
        let elements2 = document.querySelectorAll('.area_imagen');
        let elements3 = document.querySelectorAll('.btn_mas_info');

        for(var element of elements3){
            let name = element.getAttribute('name');

            address.push({
                name
            });
        }

        for (var elemento of elements2) { // Loop through each product
            let img = elemento.getAttribute('style').split(' '); // Select the title of the product
            let img_src = img[1]
            let img_urls = img_src.split("url('")
            let img_url2 = img_urls[1]
            let img_url3 = img_url2.split("');")
            let img_url = img_url3[0]
            console.log(img_url);
            imgdata.push({
                img_url,
            }); // Push an object with the data into our array
        }
        let i = 0;
        for (var element of elements) { // Loop through each product
            let Product = element.childNodes[0].innerText; // Select the title of the product
            let Price = element.childNodes[1].innerText; // Select the price of the product
            let CashPrice = element.childNodes[2].innerText;    //Select the Cash price of the product
            let imgurl = "http://www.intelaf.com/" + imgdata[i]["img_url"];
            let source = "http://www.intelaf.com/" + address[i]["name"];
            data.push({
                Product,
                Price,
                CashPrice,
                imgurl,
                source
            }); // Push an object with the data into our array
            i += 1;
        }

        return data; // Return our data array
    });

    browser.close();
    return result; // Return the data
};

let scrapeIntelafOfertas = async (link) => {
    const browser = await puppeteer.launch({ //Launch Puppeteer Instance
        headless: false
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
        let imgdata = [];
        let address = [];
        let elements = document.querySelectorAll('.descripcion'); // Select all Cars 
        let elements2 = document.querySelectorAll('.area_imagen');
        let elements3 = document.querySelectorAll('.btn_mas_info');

        for(var element of elements3){
            let name = element.getAttribute('name');

            address.push({
                name
            });
        }

        for (var elemento of elements2) { // Loop through each product
            let img = elemento.getAttribute('style').split(' '); // Select the title of the product
            let img_src = img[1]
            let img_urls = img_src.split("url('")
            let img_url2 = img_urls[1]
            let img_url3 = img_url2.split("');")
            let img_url = img_url3[0]
            console.log(img_url);
            imgdata.push({
                img_url,
            }); // Push an object with the data into our array
        }
        let i = 0;
        for (var element of elements) { // Loop through each product
            let Product = element.childNodes[0].innerText; // Select the title of the product
            let Price = element.childNodes[1].innerText; // Select the price of the product
            let CashPrice = element.childNodes[2].innerText;    //Select the Cash price of the product
            let imgurl = "http://www.intelaf.com/" + imgdata[i]["img_url"];
            let source = "http://www.intelaf.com/" + address[i]["name"];
            data.push({
                Product,
                Price,
                CashPrice,
                imgurl,
                source
            }); // Push an object with the data into our array
            i += 1;
        }

        return data; // Return our data array
    });

    browser.close();
    return result; // Return the data
};

let scrapeMacro = async (link) => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto(link);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const result = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let imgdata = [];
        let address = [];
        
        /*
        $('a.link').each(function() {
            //const url = $(this).find('a').attr('title');
            console.log($(this))
            //const title = $(this).find('a').attr('title')
            data.push({
                'title' : url                
            });
        });
        */

        let elements = document.querySelectorAll('.product-inner'); // Select all products  
        let element2 = document.querySelectorAll('.imgproduct');        
        let element3 = document.querySelectorAll('.readmore');

        for (var elemento of element3) { // Loop through each product
            
            let url = elemento.getAttribute('href'); // Select the img src of the product

            address.push({
                url,
            }); // Push an object with the data into our array
        }


        for (var elemento of element2) { // Loop through each product
            let img = elemento.getAttribute('src'); // Select the img src of the product

            imgdata.push({
                img,
            }); // Push an object with the data into our array
        }
        let i = 0;
        if(elements.length>4){
            i = 4;
        }
        let j = 0;
        //let next = document.getElementsByTagName('ul');
        //data.push({next});
        for (var element of elements) { // Loop through each product
            let Product = element.childNodes[3].innerText;// Select the title of the product
            let Price = element.childNodes[5].innerText; // Select the price of the product
            let imgurl = "https://www.macrosistemas.com" + imgdata[i]["img"];
            let source = "https://www.macrosistemas.com" + address[j]["url"];
            data.push({
                Product,
                Price,
                imgurl,
                source
            }); // Push an object with the data into our array
            i += 1;
            j += 1;
        }

        console.log(data);

        return data; // Return our data array
    });

    browser.close();
    return result; // Return the data
};


let scrapeMacroOfertas = async (link) => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto(link);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const result = await page.evaluate(() => {
        let data = []; // Create an empty array that will store our data
        let imgdata = [];
        let urlsdata = [];

        let elements = document.querySelectorAll('.product-inner'); // Select all products  
        let element2 = document.querySelectorAll('.imgproduct');        
        let element3 = document.querySelectorAll('.readmore');
        

        
        for (var elemento of element3) { // Loop through each product
                
            let url = elemento.getAttribute('href'); // Select the img src of the product

            urlsdata.push({
                url,
            }); // Push an object with the data into our array
        }
        
        for (var elemento of element2) { // Loop through each product
            let img = elemento.getAttribute('src'); // Select the img src of the product

            imgdata.push({
                img,
            }); // Push an object with the data into our array
        }
        
        let i = 0;
        //if(elements.length>4){
        //    i = 4;
        //}
        let j = 0;
        //let next = document.getElementsByTagName('ul');
        //data.push({next});
        for (var element of elements) { // Loop through each product
            let Product = element.childNodes[3].innerText;// Select the title of the product
            let Price = element.childNodes[5].innerText; // Select the price of the product
            let imgurl = "https://www.macrosistemas.com" + imgdata[i]["img"];
            let source = "https://www.macrosistemas.com" + urlsdata[j]["url"];
            data.push({
                Product,
                Price,
                imgurl,
                source
            }); // Push an object with the data into our array
            i += 1;
            j += 1;
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
                        var Product = value[i]["Product"].substring(
                            0, 
                            value[i]["Product"].indexOf("\n")
                        );
                        var Price = value[i]["Price"].substring(
                            value[i]["Price"].indexOf(" ") + 1, 
                            value[i]["Price"].indexOf("\n")
                        );
                        var CashPrice = value[i]["Price"].substring(
                            value[i]["Price"].lastIndexOf(" ") + 1, 
                            value[i]["Price"].length
                        );
                        var imgurl = value[i]["imgurl"];    
                        var source = value[i]["source"];                       
                        data.push({
                            Product,
                            Price,
                            CashPrice,
                            imgurl,
                            source
                        }); // Push an object with the data into our array
                        //var precioNormal = value[i]["Price"]
                        value[i]["Price"] = value[i]["Price"].concat("\n")
                        //console.log(value[i]["Price"])
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
                data: [req.query.cat, data]
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

app.get('/macrosistemasOfertas', function (req, res) {
    var good = true;
    let data = [];
    
    //console.log(url)
    scrapeMacroOfertas(req.query.url).then((value) => {        
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
                        var Product = value[i]["Product"].substring(
                            0, 
                            value[i]["Product"].indexOf("\n")
                        );

                        var s = value[i]["Price"].substring(
                            value[i]["Price"].indexOf("\n") + 1, 
                            value[i]["Price"].length
                          );

                        var Price = s.substring(
                            s.indexOf(" ") + 1, 
                            s.indexOf("\n")
                        );
                        var CashPrice = s.substring(
                            s.lastIndexOf(" ") + 1, 
                            s.length
                        );
                        var imgurl = value[i]["imgurl"];    
                        var source = value[i]["source"];                       
                        data.push({
                            Product,
                            Price,
                            CashPrice,
                            imgurl,
                            source
                        }); // Push an object with the data into our array
                        //var precioNormal = value[i]["Price"]
                        value[i]["Price"] = value[i]["Price"].concat("\n")
                        //console.log(value[i]["Price"])
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
                data: [req.query.cat, data]
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
    console.log(req.query);
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
        console.log("Categoria: " + req.query.cat);
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

app.get('/intelafOfertas', function (req, res) {
    var good = true;
    console.log(req.query);
    scrapeIntelafOfertas(req.query.url).then((value) => {        
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
        console.log("Categoria: " + req.query.cat);
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
    try{
        console.log("El servidor está inicializado en el puerto 3000");
    }catch(e){
        console.log("error:" + e);
    }
});

