const fs = require("fs");

 fs.readFile("files.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

    let newdata = data.replace(/\s+/g, " ");

    fs.writeFile("files.txt", newdata, "utf-8", (err) => {
        if (err)
            console.log(err);
    });
});


for(let i = 0; i<=1000000; i++){}
console.log("done loop");