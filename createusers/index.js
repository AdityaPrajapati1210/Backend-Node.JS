    const express = require("express")
    const app = express();;

    const path = require("path");
    const User = require("./userdatabase")


    app.set("view engine" , "ejs");
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname,"public")));


    app.get("/",(req,res)=>{
        res.render("index");
    });

    app.get("/read", async (req,res)=>{
        const user = await User.find();
        res.render("users" , {createduser:user});
    })

    app.post("/create", async (req, res) => {               //create
            const createduser = await User.create({
                name : req.body.name,
                email:req.body.email,
                image:req.body.image
            });
            res.redirect("/");
    });

    app.get("/delete/:name", async (req,res)=>{
        const deleteuser = await User.deleteOne({name:req.params.name});
        const user = await User.find();
        res.redirect("/read");
    })

    app.get("/edit/:id", async (req, res) => {
        const user = await User.findById(req.params.id);

        res.render("edit", { user });
    });

    app.post("/update/:id", async (req,res) =>{
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/read");
    });
    app.listen(3000);
