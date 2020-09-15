//import statement
const express=require('express');
const app=express();
const server=require('http').Server(app);
const {v4:uuid}=require('uuid');
app.get

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('room');
})



server.listen(3000);