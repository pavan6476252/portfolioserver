const Article = require('../models/Article');

// Create a new article
const createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user._id; // Assuming you have implemented user authentication

        const article = await Article.create({ title, content, author });

        res.status(201).json({ success: true, article });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'username'); // Populate the author field with the username

        res.status(200).json({ success: true, articles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a specific article
const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'username');

        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }

        res.status(200).json({ success: true, article });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update an article
const updateArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }

        res.status(200).json({ success: true, article });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Delete an article
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }

        res.status(200).json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getArticle,
    updateArticle,
    deleteArticle,
};

