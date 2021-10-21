const express=require("express");
const app=express();
var fs=require("fs");
app.use(express.json())
const getData=()=>{
    const data=fs.readFileSync("deatls.json")
    return JSON.parse(data)
};
const saveData=(data)=>{
    const string=JSON.stringify(data,null,3)
    fs.writeFileSync("deatls.json",string)
};

app.post("/user/name",(req,res)=>{
    const readData=getData();
    const userData = req.body
    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.send({error: true, msg: 'User data missing'})
    }
    const findExist = readData.find( user => user.username === userData.username )
    if (findExist) {
        return res.send({error: true, msg: 'username already exist'})
    }
    readData.push(userData)  
    saveData(readData);
    res.send({success: true, msg: 'User data added successfully'})
});

app.get('/user/list', (req, res) => {
    const users = getData()
    res.send(users)
})

app.put('/user/update', (req, res) => {
    const username = req.params.username
    const userData = req.body
    const readData = getData()      
    const findExist = readData.find( user => user.username === username )
    if (findExist) {
        return res.send({error: true, msg: 'username not exist'})
    }
    const updateUser = readData.filter( user => user.username !== username )
    updateUser.push(userData)
    saveData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
});

app.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username
    const existUsers = getData()
    const filterUser = existUsers.filter( user => user.username == username )
    console.log(filterUser)
    if ( existUsers.length === filterUser.length ) {
        return res.send({error: true, msg: 'username does not exist'})
    }
    saveData(filterUser)
    res.send({success: true, msg: 'User removed successfully'}) 
})

// app.delete('/user/delete/:username', (req, res) => {
//     fs.readFile("deatls.json", 'utf8', (err, data) => {
//       var existUsers = getData()
//     //   console.log(existUsers)
//       const username= req.params.username;
//       console.log(username)
//       const USERS =username.split(':');
//       console.log(USERS[1]);
//       let i=0
    
//     while (i<existUsers.length){
//         console.log("users",existUsers[i]["username"])
        
//         if (existUsers[i]["username"]==USERS[1]){
//             delete existUsers[i]; 
//         }
//         i++
//     }
//       saveData(existUsers);
//       res.send(`accounts with id ${username} has been deleted`)
//     }, true);
//   })
app.listen(4000,()=>{
    console.log("i am on sarver 4000")
})