const express=require("express")
const path=require("path")
const bcrypt=require("bcrypt")
const collection=require("./config")

const app=express()

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }

    const existingUser=await collection.findOne({name:data.name})
    if(existingUser){
        res.send("User already exists. Plaese choose a different username")
    }else{
        const saltRound=10;
        const hashPassword=await bcrypt.hash(data.password,saltRound)

        data.password=hashPassword

        const userData=await collection.insertMany(data)
    console.log(userData)
    }
})
/**
 * app.post("/signup", async (req, res) => {
    try {
        // Extract data from request body
        const name = req.body.name; // Make sure to use req.body.name instead of req.body.username
        const password = req.body.password;

        // Validate that both name and password are present
        if (!name || !password) {
            return res.status(400).json({ error: "Both name and password are required" });
        }

        // Check if the user already exists
        const existingUser = await collection.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists. Please choose a different username" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password.toString(), saltRounds);

        // Create new user
        const userData = await collection.create({ name, password: hashPassword });
        res.status(201).json(userData);
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
 */

app.post("/login",async(req,res)=>{
    try {
        const check=await collection.findOne({name:req.body.username})
        if(!check){
           res.send("user name cannot found")
        }

        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password)
        if(isPasswordMatch){
            res.render("home")
        }else{
            req.send("Wrong password")
        }
    } catch (error) {
        res.send("wrong details")
    }
})



const port=5000
app.listen(port,()=>{
console.log(`server running on port:${port}`)
})