const express = require('express');
const cors = require('cors');
var bodyparser=require('body-parser');
const UserData = require ('./models/usermodel')
const BookData = require('./models/booksmodel')
const app = new express();
app.use(bodyparser.json());

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
// console.log("body"+ req.body);
app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
    console.log("this is");
    console.log("name:" +req.body.firstname)

    var thing = {
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    age:req.body.age,
    gender:req.body.gender,
    role:req.body.role,
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword
    }
    var data = UserData(thing);
    console.log("data=", data);
    data.save();
    UserData.find().then(function(data){
        res.send(data);
    })
})



// post for addbooks
app.post('/addbook',function(req,res){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
    console.log("this is");
    console.log("name:" +req.body)

    var book = {
        bookname:req.body.bookname,
    authorname:req.body.authorname,
    genre:req.body.genre,
    availability:req.body.availability
    }
    var bookdata = BookData(book);
    console.log("data=", bookdata);
    bookdata.save();
    BookData.find().then(function(bookdata){
        res.send(bookdata);
    })
})
// TO LOGIN

// app.post('/login', (req, res) => {
//         var cred= {
//             email:req.body.email,
//             password:req.body.password
//         }
//         var userData = UserData(cred);
//         console.log('cred=',userData);
//         userData.save();    
//         if (!email) {
//           res.status(401).send('Invalid Username')
//         } else 
//         if ( password !== userData.password) {
//           res.status(401).send('Invalid Password')
//         } else {
//           let payload = {subject: username+password}
//           let token = jwt.sign(payload, 'secretKey')
//           res.status(200).send({token})
//         }
      
    // })

// to get data to books page
app.get('/books',function(req,res) {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
   BookData.find()
      .then(function(books){
         res.send(books);
})
})


// to delete data
app.delete('/remove/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
   
   const id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

//   to update data
app.put('update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    bookname=req.body.bookname,
    authorname=req.body.authorname,
    genre=req.body.genre,
    availability=req.body.availability
   BookData.findOneAndUpdate({"_id":id},
                                {$set:{"bookname":bookname,
                                "authorname":authorname,
                                "genre":genre,
                                "availability":availability
                               }})
   .then(function(){
       res.send();
   })
 })

app.get('/books/:id',(req,res)=>{
    console.log("getedit")
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
    BookData.findOne({"_id":req.params.id})
    .then (function(books){
        res.send(books);
    })
})








app.listen(process.env.PORT || 3000, function(){
    console.log('listening to port 3000');
});
