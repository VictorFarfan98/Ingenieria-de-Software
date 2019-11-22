const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://www.macrosistemas.com/todas-las-ofertas');

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

scrape().then((value) => {
    console.log('\n Productos Electonicos:\n ');
    console.log('Results:\n', value); // Success!
    console.log('\n Fin del Scraping. \n ');
});