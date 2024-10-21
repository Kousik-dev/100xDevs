const fs = require("fs");

const data = "hi da machi nala irukiyaa unalla mudiyum";



fs.writeFile("files.txt", data,"utf-8", (err)=>{
    if(err)
        console.log(error);
    else
        console.log("Writed");
});


for(let i = 1; i<=10000000; i++){}
console.log("done with loop");

