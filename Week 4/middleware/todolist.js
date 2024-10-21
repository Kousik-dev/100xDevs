const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const filePath = path.join(__dirname, "todo.json");


let todos = [];

//imports the existing tasks here
if(fs.existsSync(filePath)){
    const data = fs.readFileSync(filePath,"utf-8");
    todos =  JSON.parse(data);
}

//save the present tasks here

const saveTodos = ()=>{
    fs.writeFileSync(filePath,JSON.stringify(todos,null,2));
}

//getNext id for the tasks

const getId = ()=>{
    if(todos.length===0)
        return 1;

    return Math.max(...todos.map(todo => todo.id))+1;
}

//reassing the id ex if the id 1 is deleted then the id 2 will be, reassigned

const newId  = ()=>{
  todos.forEach((todo,index)=>{
    todo.id = index + 1;
  });
  saveTodos();
}

//display all todo tasks item

app.get("/todos",(req,res)=>{
    res.status(200).json({todos});
})

//display todos taks of the specific id

app.get("/todos/:id",(req,res)=>{
    const indexId = req.params.id;
    const task = todos.find(t => t.id === parseInt(indexId));
    if(task)
        res.status(200).json({task});
    else
    res.status(404).json({error:"Task not found"});

})

//add new Task here
app.post("/add",(req,res)=>{
    const {title, description} = req.body;
    if(!title || !description)
        res.status(400).json({error:"Task is incomplete"});
    const newTask = {
        id:getId(),
        title,
        description
    }
    todos.push(newTask);
    saveTodos();

    res.status(201).json({id:`${newTask.id} is created`})

})


//update the existing tasks
app.put("/edit/:id",(req,res)=>{

    const indexId = req.params.id;
    const {title,description} = req.body;

    let val = todos.find(todo => todo.id === parseInt(indexId));
    if(!val)
        res.status(404).json({error:"Task is not found"})
    if(title)
        val.title = title;
    if(description)
        val.description = description;

    saveTodos();

    res.status(200).json({ "Updated Task": val });



})


//deleting the task by id

app.delete("/todos/:id",(req,res)=>{
    const indexId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id == indexId)

    if(todoIndex===-1)
        res.status(404).json({error:"file not found"});

    todos.splice(todoIndex,1);
    newId();
    saveTodos();

    res.status(200).json({message:"Task Deleted Successfully"});


    
})

app.use((req,res)=>{
    res.status(404).json({error:"wrong route"});
})
app.listen(3000,()=>{
    console.log("Port is running on 3000")
});