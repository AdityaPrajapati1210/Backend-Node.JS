import express from 'express';
import path from 'path';
import methodOverride from "method-override";
import { faker } from '@faker-js/faker';
import mysql, { Connection } from 'mysql2/promise';
import { connect } from 'http2';
import { asyncWrapProviders } from 'async_hooks';
const app = express();


app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(import.meta.dirname,"public")));


// random user-----------------------------------------
let createRandomUser = ()=>{
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}
// ------------------------------------------------------


// Create the connection to database-----------------------------------------------------
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'clg',
  password: 'AKP@2005'
});


// let q = "insert into user(id,name,email,password) values ?";
// let user = [];
// for(let i=0;i<100;i++){
//     user.push(createRandomUser());
// }

// try{
//     await connection.query(q,[user],(err,results)=>{
//         if(err) throw err;
//         console.log(results);
//     })
// }catch(err){
//     console.log(err);
// }

// await connection.end();
// --------------------------------------------------------------------------------------------



// api___________________________________________________________________________________________


// Show total numner of user
app.get("/",async (req,res)=>{
  try{
    const [results] =  await connection.query("Select count(*) as count from user")      
      res.send(`Total User : ${String(results[0].count)}`);
      // console.log(results);
      
  }catch(err){
    console.log(err);
  }
})


// show all user details
app.get("/user",async (req,res)=>{
  const data = await connection.query("Select * from user");
  // console.log(data[0][0]);
  // res.send(data[0]);
  res.render("showUser",{data : data[0],deleted: req.query.deleted});
})


// edit specific user
app.get("/user/:id", async(req,res)=>{
  // console.log( req.params.id);
  const [data] = await connection.query("Select *from user where id = ?",String(req.params.id));

  res.render("editUser",{"user":data[0]});
})


// update user name
app.patch("/user/:id",async (req,res)=>{
  await connection.query("update user set name = ? where id = ?",[req.body.UpdatedName,String(req.params.id)])
  res.redirect("/user");
})


// add newuser page
app.get("/newUser",(req,res)=>{
  res.render("newUser");
})

// add newuser to database
app.post("/user",async (req,res)=>{
  const {name ,email,id,passWord,} = req.body;

  await connection.query("insert into user value (?,?,?,?)",[id,name,email,passWord]);

  res.redirect("/user");
})

// delete page
app.get("/user/delete/:id",async (req,res)=>{
  const [data] = await connection.query("Select * from user where id = ?",[req.params.id]);
  console.log(data[0]);

  res.render("deleteUser" ,{"data":data[0]});
})

app.delete("/user/:id",async (req,res)=>{
  await connection.query("delete from user where id = ?",req.params.id);
  // alert("account deleted!!");
  res.redirect("/user?deleted=true");
})







// _______________________________________________________________________________________________

app.listen(5000,()=>{
  console.log("app running on port 5000");
});