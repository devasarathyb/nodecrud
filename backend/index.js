const express = require("express")
const mysql = require("mysql")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const data = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"text"
})

app.get('/', (req, res) => {
    res.json('hai backend')
})

app.post("/books", (req,res)=> {
   
    const q = "INSERT INTO books (`book`,`desc`,`price`,`cover`) VALUES (?)"
    const values =[req.body.book,
                    req.body.desc,
                    req.body.price,
                   req.body.cover]
       
    data.query(q,[values], (err,data) => {
        
        if(err){
            console.log(err)
            return res.json(err)           
        } 
        return res.json("book added")
    })
})

app.get("/books", (req, res)=>{
    const que = "SELECT * FROM books"
    data.query(que, (err,data) => {
        
        if(err)
            return res.json(err)
        
        return res.json(data)
    })
})

app.delete("/books/:id",(req,res) => {
    const bookId = req.params.id;
    const q = "delete from books where id = ?"
    data.query(q, [bookId], (err,data) => {
        if(err) return res.json(err);
        return res.json("book deleted ")
    })
})

app.put("/books/:id",(req,res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `book`=?, `desc`=?, `price`=?, `cover`=? WHERE id = ?";

    const values = [
        req.body.book,
                    req.body.desc,
                    req.body.price,
                   req.body.cover
    ]
    data.query(q, [...values, bookId], (err,data) => {
        if(err) return res.json(err);
        return res.json("book updated ")
    })
})

app.listen(8800, ()=>{
    console.log("connected")
})
