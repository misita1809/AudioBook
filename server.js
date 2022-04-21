// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const admincontroller = require('../Project_MK/server/controller/admincontroller');
const usercontroller = require('../Project_MK/server/controller/usercontroller');
const audioBookController = require('../Project_MK/server/controller/audioBookController');
//var Book = require('./models/book');

const connectDB = require('./server/database/connection');

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

// mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))// css/style.css
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

const db_url = 'mongodb://localhost:27017';

//set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/folder")) -- if ejs files is within another folder in views folder

app.get('/', (req, res)=>{
    //res.send("Term project");
    res.render('login.ejs');
})

app.get('/adminlogin', (req, res)=>{
    //res.send("Term project");
    res.render('adminlogin.ejs');
})

app.get('/userlogin', (req, res)=>{
    //res.send("Term project");
    res.render('userlogin.ejs');
})
app.get('/register', (req, res)=>{
    //res.send("Term project");
    res.render('register.ejs');
})

app.get('/add-book',function(req,res){
    res.render('addbook.ejs');
});

app.get('/add-user',function(req,res){
    res.render('addbook.ejs');
});

app.get('/book/audio/:book_id', audioBookController.downloadAudioBook);

app.post('/adminsubmit', admincontroller.find);
app.post('/usersubmit', usercontroller.find);
// app.post('/adduser', usercontroller.create);

app.post('/adduser',function(req,res){
    theUser = req.body;
    MongoClient.connect(db_url,function(err, dbServer){
        if (err) throw err;
        const mydb = dbServer.db('TermProject');
        mydb.collection('user').insertOne(theUser,function(err, result){
            if (err) throw err;
            res.render('userlogin.ejs');
        });
    });
});

app.post('/book/add',function(req,res){
    theBook = req.body;
    MongoClient.connect(db_url,function(err, dbServer){
        if (err) throw err;
        const mydb = dbServer.db('TermProject');
        mydb.collection('books').insertOne(theBook,function(err, result){
            if (err) throw err;
            else{
                mydb.collection('books').find({}).toArray(function(err, results){
                    res.render('adminbooks.ejs',{mybooks:results});
                });
            }
        });
    });
});

app.get('/delete',function(req,res){
    // var id = parseInt(req.query.id);
    var id = req.query.id;
    res.render('delete.ejs',{id:id});
});

app.get('/book/delete/:book_id', admincontroller.remove);

app.get('/book/update/:book_id',function(req,res){
    var id = req.params.book_id;
    console.log(id);
    MongoClient.connect(db_url,function(err, dbServer){
        if (err) {res.render('404.ejs',{theError:err.message})}
        const mydb = dbServer.db('TermProject');
        mydb.collection('books').find({id:id}).toArray(function(err,results){
            if (err) {res.render('404.ejs',{theError:err.message})}
            else {
                console.log(results);
                res.render('editbook.ejs',{upbook:results});
            }
        });
    });
});

app.post('/book/update', admincontroller.update);

app.get('/admin/books',function(req,res){
    MongoClient.connect(db_url,function(err, dbServer){
        if (err) {res.render('404.ejs',{theError:err.message})}
        const mydb = dbServer.db('TermProject');
        mydb.collection('books').find({}).toArray(function(err,results){
            if (err) {res.render('404.ejs',{theError:err.message})}
            else {
                console.log(results);
                res.render('adminbooks.ejs',{mybooks:results});
            }
        });
    });
});

app.get('/user/books',function(req,res){
    MongoClient.connect(db_url,function(err, dbServer){
        if (err) {res.render('404.ejs',{theError:err.message})}
        const mydb = dbServer.db('TermProject');
        mydb.collection('books').find({}).toArray(function(err,results){
            if (err) {res.render('404.ejs',{theError:err.message})}
            else {
                console.log(results);
                res.render('userbooks.ejs',{mybooks:results});
            }
        });
    });
});


app.listen(PORT,()=>{console.log('Server is running on http://localhost:${(PORT)}')});