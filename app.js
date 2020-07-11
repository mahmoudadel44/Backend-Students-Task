const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Students = require("./Models/Students");

const app = express();

// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://mahmoud12345:mahmoud12345@cluster0.29hac.mongodb.net/<dbname>?retryWrites=true&w=majority"
    ,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to db....."))
  .catch((err) => console.error("can not connected to db ...", err));


const createStudent = async (body) => {
  const student =new Students({
   Name:body.name,
   Status:body.status,
   Major:body.major
 });
try {
 const result = await student.save();
 console.log("result", result);
 return result
} catch (error) {
 console.log('craete error',error.message)
}

};
app.post("/addstudent", async(req, res) => {

  let student= await createStudent(req.body);
if (!student) {
  res.status(400).send('student not created by that data ')
  return;
}
res.send(student)
});
app.get("/getstudents", (req, res) => {
  Students.find().then((data) => {
    res.json(data);
  });
});


app.listen(3000, () => console.log("server started on port 3000 ...."));
