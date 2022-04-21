// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)

const { name } = require('dot');
var Userdb = require('../model/usermodel');
var Book = require('../model/bookmodel');

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    const id = req.body.name;
    const password = req.body.password;
    // res.send("ha yaha tak aaya")
    console.log(req.body.name);
    if(req.body.name && req.body.password){
        Userdb.find({'name':id,'password':password},
        function (err,result) {
            if(err) throw err;
            //console.log(result[0].name);
            if(!result.length){
                Book.find(function(err,booksres){
                    if(err) throw err;
                    res.render('userbooks.ejs',{mybooks:booksres});
                })
            }else{
                res.render('userlogin.ejs',{message:"Enter correct details"});
            }
        }
    )}
    else{
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
    }
}

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        u_id : req.body.u_id,
        name : req.body.name,
        email : req.body.email,
        password: req.body.password,
        gender : req.body.gender
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/userlogin');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}
