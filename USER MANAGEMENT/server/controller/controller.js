// server/controller/controller.js

var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    //new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in the database
    user
    .save(user)
    .then(data =>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err =>{
        res.status(500).send({
            message:err.message ||"some error occurred while creating operation"
        })
    })
}


// retrive and return all users /retrive and return a single user
exports.find=(req,res)=>{

    if(req.query.id){
        const id=req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:"Not found user with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Error retrieving user with id"+id})
        })
        
    }else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({message:err.message ||"error Occurred while retriving user information"})
        })
    }

 
}

// Update a new identified user by the user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to be updated cannot be empty" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with id ${id}. Maybe user not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user information" });
        });
};


// delete a user with specified user id in request
exports.delete=(req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(400).send({message:'Connot Delete With Id $(id).Maybeid is wrong'})
        }else{
            res.send({
                message:"user was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message:"Could not delete User with id="+id
        });
    });
}
