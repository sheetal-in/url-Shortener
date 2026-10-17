import express from 'express';
import  urlRoute from './routes/url.js' 
import {connectToMongoDB} from './connect.js';
import URL from './models/url.js'
import { url } from 'node:inspector';
import { timeStamp } from 'node:console';
const app=express();
const port=8080;

app.use(express.json());
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("connected"));

app.use('/url',urlRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
       shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        },
    }
);
  res.redirect(entry.redirectURL);

});
app.listen(port,()=>console.log(`server started at port ${port}`
));
