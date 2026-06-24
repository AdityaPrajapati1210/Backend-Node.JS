const fs = require('node:fs');

fs.writeFile("hey.txt","Its very to understand the Node js",function(err){
    if(err) console.error(err);
    else console.log("done");
});