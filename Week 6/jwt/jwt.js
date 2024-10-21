const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

let users = []

const JWT_SECRET = "hidakousik";

app.post("/signup",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    const existingUser = users.find(u =>u.username === username && u.password === password);
    if(existingUser){
        return res.status(400).json({
            message: "Sorry this user is already registered"
        })
    }

    users.push({
        username: username,
        password: password
    })
    res.status(200).json({message: "You have successfully signed up"})
})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const findUser = users.find(u=>u.username === username && u.password === password);
    if(findUser){

        const token = jwt.sign({
            username: findUser.username,
        },
        JWT_SECRET
    );
     findUser.token = token;

     return res.status(200).json({
        message: "You have signed in successfully",
        token: token
     });

    }
    else{
        return res.status(400).json({
            message:"Invalid username or passowrd",
        })
    }
})


app.get("/me",(req,res)=>{

    const token = req.headers.token;
    const userDetail = jwt.verify(token,JWT_SECRET);
    const user = users.find(u=>u.username===userDetail.username);
    if(user){
        res.status(200).json({

            username: user.username,
            password: user.password
        })
    }
    else{
        res.status(400).json({
            message: "The Given Token Id of the User does exist "
        })
    }

})

app.listen(3000,()=>{
    console.log("Port is listening on 3000");
})