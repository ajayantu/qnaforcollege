const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const connectDB = require('./db.js');
const authRoutes = require('./routes/auth')
const qstnRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const userRoutes = require('./routes/user')
const notifyRoutes = require('./routes/notify')
require('dotenv').config();
const app = express();
const port = process.env.PORT|| 5000;
connectDB();

//middlewares

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:5000/a.
*/

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/api',authRoutes);
app.use('/api',qstnRoutes);
app.use('/api',answerRoutes);
app.use('/api',userRoutes);
app.use('/api',notifyRoutes);



//home route
app.get('/',(req,res)=>{
    res.send("hello world");
})


app.listen(port,()=>{
    console.log(`Listning at port http://localhost:${port} `);
})