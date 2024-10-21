const fs = require("fs");



console.log("file loop started");

fs.readFile("files.txt", "utf-8",(err,data)=>{
    if(data)
        console.log(data);
    else
    console.log(err);

});

for(let i = 0; i<=10000000; i++){

}
console.log("Loop done");