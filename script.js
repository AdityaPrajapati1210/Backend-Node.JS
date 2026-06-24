const fs = require('node:fs');


function create(){
    fs.writeFile("hey.txt","Its very to understand the Node js",function(err){
        if(err) console.error(err);
        else console.log("done");
    });

}

function rename(){
    fs.rename("myFile.cpp","myFile.txt",function(err){
        if(err) console.error(err);
        else console.log("successfull");
    });

}

rename();
