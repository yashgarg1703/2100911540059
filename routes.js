const express = require('express');
const { getProducts, getProductDetails } = require('./api-services');

const router = express.Router();

router.get('/:companyname/categories/:categoryname/products', async (req, res) => {
    const { companyname, categoryname } = req.params;
    console.log(companyname,categoryname)
    const { top = 10, minPrice = 1, maxPrice = 100000 } = req.query;
    try { 
        const products = await getProducts(companyname, categoryname, top, minPrice, maxPrice);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET details of a specific product (let us assume the API supports this)
router.get('/:companyname/categories/:categoryname/products/:productid', async (req, res) => {
    const { companyname, categoryname, productid } = req.params;
    try {
        const product = await getProductDetails(companyname, categoryname, productid);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
