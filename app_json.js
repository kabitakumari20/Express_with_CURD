let express = require("express")
let app = express()
app.use(express.json())
var fs=require("fs");
var my_array=[]

app.get("/",(req,res)=>{
    res.send("Hiii")
})


app.post("/name",(req,res)=>{
    var main = {
        name:req.body.name,
        last_name:req.body.name,
        age:req.body.age,
        id:req.body.id
    }
    const userData = req.body
    if (userData.name == null || userData.age == null || userData.last_name == null || userData.id == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }

    res.send(main)
    console.log("data save on json file")
    var data=JSON.stringify(main)
    var data1=fs.writeFileSync("data.json",data)
    // my_araay.push(data1)
    // console.log(my_array)
    console.log(data1)

})

app.put("/update",(req,res)=>{
    main ={
        name:req.body.name,
        age:req.body.age,
        id:req.body.id
    }
    res.send(main)
    console.log("updating data")
    var read=JOSON.stringify(main)
    var upadate=fs.readFileSync("data.josn","utf8",read)
    console.log(upadate)
})


app.listen(7000,()=>{
    console.log("i am on server")
})


