const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const server = express()
server.use(bodyParser.json())

//Establish the database connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'rajkumar',
    database: 'dbsmschool',
});
db.connect(function(error){
    if(error){
        console.log('Error connected to DB');
    }
    else{
        console.log('successfully connected to DB');
    }
})
//establish the port 
server.listen(8088,function check(error){
    if(error) console.log("error")
    else{
        console.log("started")
    }
});

//create the records

server.post("/api/student/add",(req,res)=>{
    let details = {
        stname:req.body.stname,
        course:req.body.course,
        fee:req.body.fee,
    };
    let sql = "insert into student set ?";
    db.query(sql,details,(error) =>{
        if(error){
            res.send({ status:false,message:"Student created failed"});

        }else{
            res.send({status:true,message:"student created Successfully"});
        }
    });
});


//view the records

server.get("/api/student",(req,res)=>{
   
    let sql = "select * from student";
    db.query(sql,function(error,result){
        if(error){
           console.log("Error connecting to DB");

        }else{
            res.send({status:true,data:result});
        }
    });
});

//Search the Records

server.get("/api/student/:id",(req,res)=>{
   var studentid = req.params.id;
    let sql = "select * from student where id="+ studentid;
    db.query(sql,function(error,result){
        if(error){
           console.log("Error connecting to DB");

        }else{
            res.send({status:true,data:result});
        }
    });
});

//Update the record
server.put("/api/student/update/:id",(req,res)=>{

    let sql =
    "update student set stname='" +
    req.body.stname + 
    "', course='" +
    req.body.course +
    "',fee='" + req.body.fee +
    "' where id=" + req.params.id;
   
   
     let a = db.query(sql,function(error,result){
         if(error){
            res.send({ status:false,message:"Student upadated failed"});

 
         }else{
             res.send({status:true,message:"student updated successfully"});
         }
     });
 });

 //Delete  request
 server.delete("/api/student/delete/:id",(req,res)=>{

    let sql =
    "delete from  student where id=" + req.params.id;
   
   
     let a = db.query(sql,function(error,result){
         if(error){
            res.send({ status:false,message:"Student Deleted failed"});

 
         }else{
             res.send({status:true,message:"student Deleted successfully"});
         }
     });
 });
