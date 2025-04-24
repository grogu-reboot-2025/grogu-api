const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const port = 3000;

app.use(cors());
app.use(express.json());

let products = JSON.parse(fs.readFileSync(path.join(__dirname, './lloyds_group_products.json'), 'utf-8'));

// Welcome route
app.get('/', (req, res) => res.json({ message: 'Welcome to the Grogu reboot API!' }));

// get products
app.get('/products', (req, res) => {
    const categories = req.query.category;

    if (!categories) return res.json(products);

    const categoryList = Array.isArray(categories) ? categories : categories.split(',');
    const categorizedProducts = categoryList.reduce((acc, category) => {
        acc[category] = products[category] || [];
        return acc;
    }, {});

    const invalidCategories = categoryList.filter(category => !products[category]);
    if (invalidCategories.length) {
        return res.status(400).json({
            message: 'One or more categories are invalid. Please provide valid categories.',
            invalidCategories
        });
    }

    return res.json(categorizedProducts);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
