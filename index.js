const express = require('express');
const {PrismaClient}= require('@prisma/client');

const app = express();
const prima= new PrismaClient();
const nodemailer = require("nodemailer");
const cors= require("cors");

app.use(cors());
app.get('/getallreferal', async function (req, res) {
    try{
        const refer=await prima.refer.findMany({});
        res.json(refer)
    }
    catch(err){
        console.log(err);
    }
})

app.use(express.json());

app.post('/createReferal',async (req, res,next)=>{
    const data1 = req.body;
    console.log(data1.referalemail);
   
    let receiver_email = data1.referalemail;
   
    
    try {
        const referdata = await prima.refer.create({data:data1})
        console.log(referdata); 
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: "sjpatil599@gmail.com",
              pass: "ajzodikwfjfyktqe",
            },
          });
        
          async function main() {
            const info = await transporter.sendMail({
              from: '<sjpatil599@gmail.com>',
              to: receiver_email,
              subject: "reference for movie ",
            
              html: "your friend sumit has given reference to you"
            });
          
            console.log("Message sent: %s", info.messageId);
          }
          main().catch(console.error);
        
        res.send("added successfully");
    } catch (error) {
        console.error("Error creating referral:", error);
        res.status(500).send("Error creating referral");
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});