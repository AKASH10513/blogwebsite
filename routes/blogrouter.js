const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/blogs/create', (req, res) => {
    console.log(req.body);
    res.render('create', { title: 'blog creat', })

});
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch(err => { console.log(errr) });


});
router.get('/blogs', (req, res) => {
    console.log(req.body);
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            console.log(result);
            res.render('index', { title: "ALL BLOGS", blogs: result })
        })
        .catch(err => {
            console.log(err);
        })
});
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    Blog.findById(id)
        .then(result => {
            console.log(result);
            console.log(result.length);
            res.render('details', { title: 'your blog', blog: result });
        })
        .catch(err => { console.log(err) })
});
router.get('/about', (req, res) => {

    // res.send('<p>hello paaji </p>');
    res.render('about', { title: 'about' });

});

router.get('/about-us', (req, res) => {
    res.redirect('/about', { title: 'about-us', });
});

router.get("/add-blog", (req, res) => {
    console.log("jii");
    const blog = new Blog({
        title: 'new blog',
        snippet: 'my new blog-3',
        body: 'more about my blog we create a new blog about my website '

    });
    blog.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});
router.get("/all/blog", (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);
        })
});
router.get("/single/blog", (req, res) => {
    Blog.findById("62a1dcdb39c18397c84951fd")
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err)
        })

});
module.exports = router;