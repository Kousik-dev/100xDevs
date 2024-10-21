const express = require("express");
const app = express();

app.use(express.json());

let users = [];
function generateToken(){

    let hash = ['a','b','c','d','e','f','g','h','i','j','k', 'l', 'm','n','o', '1','2','3', '4', '5', '6', '7','8', '9'];
    let token = "";

    for(let i = 0; i<16; i++){

        token += hash[Math.floor(Math.random()*21)];
    }
    console.log(token);

    return token;
}


app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if the user with the given username already exists
    const existingUser = users.find(user => user.username === username);

    // If user already exists, return a message
    if (existingUser) {
        return res.status(400).json({
            message: "Username already exists, you cannot add this user!"
        });
    }

    // If the username is not taken, add the new user
    users.push({
        username: username,
        password: password
    });

    // Respond with success message
    res.status(200).json({
        message: "You have successfully signed up!"
    });
});


app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password; // Assuming you also need to check the password

    // Find the user by username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generate a token
        const token = generateToken();

        // Assign the token to the user object
        user.token = token;

        // Respond with the token
        return res.status(200).json({
            message: "Signin successful!",
            token: `Token id: ${user.token}`
        });
    } else {
        // If the user is not found or password is incorrect
        return res.status(400).json({
            message: "Invalid username or password!"
        });
    }
});

app.get("/me",(req,res)=>{

    const token = req.headers.authorization;

    const findUser = users.find(u=> u.token === token)
    if(findUser){

        res.json({

            message: findUser
        })
    }

    else{
        res.json({message: "Sorry can't find the user"});
    }

})

app.listen(3000,()=>{
    console.log("Listening Port on 3000");
})