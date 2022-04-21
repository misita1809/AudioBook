// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)


const MongoClient = require('mongodb').MongoClient;
var Book = require('../model/bookmodel');
const db_url = 'mongodb://localhost:27017';
const gtts = require('gtts')
const fs = require("fs");
 

exports.downloadAudioBook = (req,res)=>{
    let id = req.params.book_id;
    
    MongoClient.connect(db_url,function(err, dbServer){
        if (err) {res.render('404.ejs',{theError:err.message})}
        const mydb = dbServer.db('TermProject');
        mydb.collection('books').find({"id":id}).toArray(function(err,results){
            if (err) {
                
            }
            else {
                // var sample = "Hello and welcome to Group 9 term project. Book selected "+results[0].title+" written by author "+results[0].author+" Please enjoy the book.";
                //     var text = sample + results[0].content;
                var text = "Hello and welcome to Group 9 term project. Book selected "+results[0].title+" written by author "+results[0].author+" Please enjoy the book." + results[0].content;
                console.log(text)     
                var language = 'ar';
                    outputFilePath = Date.now() + "output.mp3"
                    var voice = new gtts(text,language)
                    voice.save(outputFilePath,function(err,result){
                        if(err){
                        fs.unlinkSync(outputFilePath)
                        res.send("Unable to convert to audio")
                        }
                        res.download(outputFilePath,(err) => {
                        if(err){
                            fs.unlinkSync(outputFilePath)
                            res.send("Unable to download the file")
                        }
                    
                        fs.unlinkSync(outputFilePath)
                        // res.redirect('/user/books')
                        })
                    })
            }
        });
    });  
}