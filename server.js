const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

// Connect to MongoDB database
mongoose.connect('mongodb+srv://shuklaaashish90:Aman123@mydatabase.jx3c3fn.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase', {}).then(() => {
    console.log("Connected to MongoDB database");
}).catch((err) => {
    console.error("Error connecting to MongoDB database:", err);
});

// Define mongoose schema and model for products (UPDATED with new fields)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    artisan: String,
    artisanPhoto: String, // Photo of artisan making the product
    category: String, // e.g., "Clothing", "Handcraft", "Portraits"
    region: String, // e.g., "Maharashtra", "Gujarat/Kutch", "Rajasthan"
    imageUrl: String, // Product image
    paintingUrl: String, // Traditional painting/design image
    sdgGoals: [String], // Array of SDG goals
    description: String
});

const Product = mongoose.model('Product', productSchema);

// Define mongoose schema and model for users
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Create an instance of express app
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets'); // Save uploaded files to the 'public/assets' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append current timestamp to filename to ensure uniqueness
    }
});

const upload = multer({ storage: storage });

// Route to get all products
app.get('/api/products', async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query = { category: req.query.category };
        }
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to add a new product (UPDATED to handle multiple images and new fields)
app.post('/api/products', upload.fields([
    { name: 'product-image', maxCount: 1 },
    { name: 'artisan-photo', maxCount: 1 },
    { name: 'painting-image', maxCount: 1 }
]), async (req, res) => {
    const { name, price, artisan, category, region, sdgGoals, description } = req.body;
    
    const imageUrl = req.files['product-image'] ? '/assets/' + req.files['product-image'][0].filename : '';
    const artisanPhoto = req.files['artisan-photo'] ? '/assets/' + req.files['artisan-photo'][0].filename : '';
    const paintingUrl = req.files['painting-image'] ? '/assets/' + req.files['painting-image'][0].filename : '';
    
    // Parse SDG goals if sent as JSON string
    let parsedSdgGoals = [];
    if (sdgGoals) {
        try {
            parsedSdgGoals = JSON.parse(sdgGoals);
        } catch (e) {
            parsedSdgGoals = [];
        }
    }
    
    try {
        const newProduct = new Product({ 
            name, 
            price, 
            artisan, 
            artisanPhoto,
            category, 
            region,
            imageUrl,
            paintingUrl,
            sdgGoals: parsedSdgGoals,
            description
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route for user login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.redirect('/home.html');
            } else {
                res.status(401).send('Invalid username or password');
            }
        } else {
            res.status(401).send('User not found');
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route for user signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.redirect('/home.html');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to serve auth.html initially
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/auth.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});