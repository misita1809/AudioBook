// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)


const { name } = require('dot');
var Userdb = require('../model/adminmodel');
var Book = require('../model/bookmodel');


// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    // res.send("Abcdef")
    if(req.body.name && req.body.password){
        const name = req.body.name;
        const password = req.body.password;

        console.log(name);
        console.log(password);
        Userdb.find({'name':name,'password':password},
        function (err,result) {
            if(err) throw err;
            if(result){
                res.redirect('/admin/books')
            }else{
                res.render('adminlogin.ejs',{message:"Enter correct details"});
            }
        })
            // .then(data =>{
            //     if(!data){
            //         res.status(404).send({ message : "Not found user with name "+ name})
            //     }else{
            //         res.redirect('/admin/books')
         
         
         
            //         console.log("hello hi")
            //     }
            // })
            // .catch(err =>{
            //     res.status(500).send({ message: "Erro retrieving user with name " + name})
            // })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving Admin information" })
            })
    }

    
}
exports.remove = (req, res)=>{
    let id = req.params.book_id;
	Book.remove({
		id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			// res.send('Successfully! Book has been Deleted.');	
            res.redirect('/admin/books')
	});
}

// Update a new idetified book by book id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.body.id;
    console.log(req.body);
    Book.updateOne({'id':req.body.id}, req.body)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update book with ${id}. Maybe book not found!`})
            }else{
                // res.send(data)
                res.redirect('/admin/books')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update book information"})
        })
}