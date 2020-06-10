const express =require('express')
const cors = require('cors')
var multer = require('multer');
var upload = multer();
const bodyParser = require('body-parser')
const app =express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })); 
require('./db/mongoose')

const passenger=require('./routes/passenger')
const admin = require('./routes/admin')
app.use(bodyParser.json())
app.use(admin)
app.use(passenger)
app.use(express.static('client/build'));
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(5000,()=>console.log('LISTENING AT 5000'))