const express = require('express');
const  mongoose = require('mongoose');
const ShortUrl = require('./model/shortUrl.js');
const app = express();

mongoose.connect('mongodb+srv://Priyal:Priyal@sandbox.nkknl.mongodb.net/urlShortDatabase?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
   const shortUrls = await ShortUrl.find()
    res.render('index' , {shortUrls: shortUrls})
})

app.post('/shortUrls' , async (req, res)=>{
   await ShortUrl.create({full:req.body.fullUrl})
   res.redirect('/')
})

async function handleDeleteUrl(){
    const response = await api.delete(`/shorturls/delete/${props.match.params._id}`);    
    setShortURL(response.data);
    props.history.push('/');
}

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
  })

  let port = process.env.PORT;
  if(port == null || port == ""){
      port=5000;
  }

app.listen(port, function(){
    console.log("Server has started!!")
})