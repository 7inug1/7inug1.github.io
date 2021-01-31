const express = require('express');
const app = express();
const connection = require('./db/connection.js');
const DogComment = require('./models/DogComment.js');

app.use(express.static('public'));
app.use(express.json());

// Get an array of comments about a specific breed of dog
app.get('/comments/:dog', (req,res)=>{
    DogComment
    .find({ 'breed':req.params.dog } )
    .then(results => {
        res.send(results);
    })
    .catch(error => res.send(error));
});

// Create a new comment and save it to the database
app.post('/comments', (req,res)=>{
   let comment = new DogComment(req.body);
   console.log("comment: "+comment);

   comment
   .save()
   .then(result => {
       res.send(comment);
   })
    .catch(error => res.send(error));
});

connection.once('open', ()=>{
    console.log('connected to db');
    app.listen(8080, ()=>{ console.log('listening on 8080') });
});