const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imagedownloader=require('image-downloader');
const multer=require('multer');
const  PlaceModel =require('./models/place');
const app = express();
const port = 3000;
const path = require('path');
const jswS = 'gt';
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect('mongodb+srv://sai:sai@cluster0123.nvotakz.mongodb.net/').then(() => { console.log("mongoose ") });




app.get('/test', (req, res) => {
  res.json('test ok');
})

const photosMiddleware=multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
     
   const uploadedFiles=[];
  for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path+' '+ext;
             fs.renameSync(path);
             uploadedFiles.push(newPath);
      } 
      res.json(uploadedFiles);
  
})

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: password,
    });
    res.json(userDoc);
    console.log(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userdoc = await UserModel.findOne({ email });

  if (userdoc) {
    if (password === userdoc.password) {
      // Generate a JWT token
      const token = jwt.sign({ userId: userdoc._id }, 'your-secret-key', { expiresIn: '1h' });

      // Set the token as a cookie
      res.cookie('token', token, { httpOnly: true }).json({ name: userdoc.name, email: userdoc.email });

      // Send the userdoc and _id in the response
      // res.json({ userdoc, _id: userdoc._id });
    } else {
      // Incorrect password
      res.json("pass incorrect");
    }
  } else {
    // User not found
    res.json('not found');
  }
});






app.post('/profile', async (req, res) => {
  // const { token } = req.cookies;
  const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'

  if (token) {
    // Verify the JWT token
    jwt.verify(token, 'your-secret-key', async (err, userData) => {
      if (err) {
        res.json(null);
      } else {
        const { name, email } = await UserModel.findById(userData.userId);
        res.json({ name, email });
      }
    });
  } else {
    res.json(null);
  }
});
app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true);
})
app.post('/upload-by-link',async(req,res)=>{
const {link}=req.body;

const newName='photo'+Date.now()+'.jpg';
await imagedownloader.image({
  url:link,
  dest: path.join(__dirname, 'uploads', newName)
});
console.log(newName);
res.json(newName);
})


app.post('/places',(req,res)=>{
  const {token}=req.cookies;
  const {title,address,aphotos,description,perks,extrainfo,checkin}=req.body;
  jwt.verify(token, 'your-secret-key', async (err, userData) => {
    if (err) {
      res.json(null);
    } 
const palceDoc=await  PlaceModel.create({
      owner:userData.id,
      title,address,aphotos,description
    })
  });
 
res.json(palceDoc);
})














app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});