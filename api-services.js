const axios = require('axios');

// Test server base URL
const BASE_URL = 'http://20.244.56.144/test/companies';

// Supported companies and categories
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

// Function to fetch top 'n' products within a category for a specific company
const getProducts = async (companyname, categoryname, top, minPrice=1, maxPrice) => {
    if (!COMPANIES.includes(companyname)) {
        throw new Error('Invalid company name');
    }
    if (!CATEGORIES.includes(categoryname)) {
        throw new Error('Invalid category name');
    }

    const url = `${BASE_URL}/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    console.log(url)
    try{
        const response = await axios.get(url,{
            headers:{
                'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxNDYxMTY1LCJpYXQiOjE3MjE0NjA4NjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBkNTA3ZTY5LWViYmMtNGIxOS1hN2NhLTI4ODEzNzBmNWYzMyIsInN1YiI6IjIxY3NkczA0OEBqc3NhdGVuLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiQW51bmVldENvbXBhbnkiLCJjbGllbnRJRCI6IjBkNTA3ZTY5LWViYmMtNGIxOS1hN2NhLTI4ODEzNzBmNWYzMyIsImNsaWVudFNlY3JldCI6IllVVFpoa3ZYVUZYbnNrV2MiLCJvd25lck5hbWUiOiJZYXNodSIsIm93bmVyRW1haWwiOiIyMWNzZHMwNDhAanNzYXRlbi5hYy5pbiIsInJvbGxObyI6IjIxMDA5MTE1NDAwNTkifQ.XtffxdUoVuiPIAQQeJECc_nO31KaAKhXUktQ-cuZfjE`
            }
        });
        // console.log(response)// getting the products
        const products = response.data;
        
        
        // Add a custom unique identifier for each product
        return products.map((product, index) => ({
            ...product,
            customId: `${companyname}-${categoryname}-${index}`
        }));
    }
    catch(error)
    {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        throw error;
    }
    
};

// Function to fetch details of a specific product (assuming we have an endpoint for this, otherwise, this function may need to be revised)
const getProductDetails = async (companyname, categoryname, productid) => {
    // Assuming the product ID is unique and can be used to fetch details
    const url = `${BASE_URL}/${companyname}/categories/${categoryname}/products/${productid}`;
    
    
    try{
        const response = await axios.get(url,{
            headers:{
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxNDU5OTUzLCJpYXQiOjE3MjE0NTk2NTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBkNTA3ZTY5LWViYmMtNGIxOS1hN2NhLTI4ODEzNzBmNWYzMyIsInN1YiI6IjIxY3NkczA0OEBqc3NhdGVuLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiQW51bmVldENvbXBhbnkiLCJjbGllbnRJRCI6IjBkNTA3ZTY5LWViYmMtNGIxOS1hN2NhLTI4ODEzNzBmNWYzMyIsImNsaWVudFNlY3JldCI6IllVVFpoa3ZYVUZYbnNrV2MiLCJvd25lck5hbWUiOiJZYXNodSIsIm93bmVyRW1haWwiOiIyMWNzZHMwNDhAanNzYXRlbi5hYy5pbiIsInJvbGxObyI6IjIxMDA5MTE1NDAwNTkifQ.Sp-n0CMhYI4b5WCJxT5xVGZPn4LvjTgBVqhZKdfCOgc'
            }
    });
        return response.data;
    }
    catch(error)
    {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        throw error;
    }
    
};

module.exports = { getProducts, getProductDetails };
