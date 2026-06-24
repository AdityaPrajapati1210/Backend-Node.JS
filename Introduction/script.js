// function and javascript
// arrays and object 
// function return
// async js coding

// var arr = [1,2,3,4];
// arr.forEach(function(val){
//     console.log(val + " Hello");
// });


// map 

// var ans = arr.map(function(val){
//     return val+12;
// })
// console.log(ans);


// objects

// let obj = {
//     name : "Aditya",
//     age : 20
// };
async function abcd() {
    var blob = await fetch(`https://randomuser.me/api/`);
    var res = await blob.json();
    
    console.log(res);
    
}

abcd();