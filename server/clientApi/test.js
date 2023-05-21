const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();


const router = express.Router();
const categoryFile = "./db/test/categories.json";
const productsFolder = "./db/test/products/";
const dataFile = "./db/test/data.json";


const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}))

router.use(helmet());
router.use(bodyParser.json({ limit: '1mb' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

router.use("/test", limiter);

// get all categories
router.get('/categories', async (req, res) => {
    try {
        const data = await fs.readFile(categoryFile);
        res.set('Content-Type', 'application/json');
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error reading categories');
    }
});

// get all products from category
router.get('/category/:name', async (req, res) => {
    try {
        const data = await fs.readFile(productsFolder + req.params.name + ".json");
        res.set('Content-Type', 'application/json');
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error reading category');
    }
});

// get specific product with category name
router.get('/category/:name/:id', async (req, res) => {
    try {
        const data = await fs.readFile(productsFolder + req.params.name + ".json");
        const products = JSON.parse(data);
        const specificProduct = products.find(product => product.id === Number(req.params.id));
        if (specificProduct) {
            res.set('Content-Type', 'application/json');
            res.send(specificProduct);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error reading product');
    }
});

// get specific product without category name
router.get('/product/:name', async (req, res) => {
    try {
        // read all product files in the products folder
        const files = await fs.readdir(productsFolder);

        // iterate over each file and search for the product with the given name
        for (const file of files) {
            const data = await fs.readFile(productsFolder + file);
            const products = JSON.parse(data);
            const specificProduct = products.find(product => product.name === req.params.name);

            // if the product is found, return it as JSON
            if (specificProduct) {
                res.set('Content-Type', 'application/json');
                res.send(specificProduct);
                return;
            }
        }
        // if the product is not found in any file, return a 404 error
        res.status(404).send('Product not found');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error reading product');
    }
});

// openai api input product output prompt with 3 products
router.get('/might-like/:product', async (req, res, next) => {
    try {
        prompt = `Give me 3 things from the menu that customers looking at ${req.params.product} would like, but not milkshake. -->`

        const response = await openai.createCompletion({
            model: 'ada:ft-personal-2023-04-22-19-25-36',
            prompt: prompt,
            max_tokens: 11,
            temperature: 0.2
        });
        const message = response.data.choices[0].text.trim();
        res.send({ message });
    } catch (err) {
        next(err)
    }

});

// send visited products
router.post('/api/visited-products', async (req, res) => {
    try {
        const data = req.body.products;
        const fileData = await fs.readFile(dataFile);
        let dataInJson = JSON.parse(fileData);
        dataInJson.push(data);
        await fs.writeFile(dataFile, JSON.stringify(dataInJson));
        console.log('Data added to file:', data);
        res.send('working');
    } catch (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Error writing file');
    }
});

// error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message || 'Internal server error');
});

module.exports = router;

