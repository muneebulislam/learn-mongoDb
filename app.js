// const express = require('express');
// const app = express();
// // const https = require('https');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDb');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
  });
// Now create a model
  const Fruit = mongoose.model('Fruit', fruitSchema); 
  //inside the parenthesis 'Fruit' is name of collection that will be automatically converted to Fruits name.
  const mango = new Fruit({ name: 'Mango', rating: 8, review: 'Yellow and very sweet!'});
  console.log(mango.name);
  // Now save mango to the mongo database.
//   await mango.save();
  // Now we can find everything about the Fruit collection
  const fruits = await Fruit.find();
  console.log("Fruits collection is given by \n"+fruits)

  //Another collection.
  const personSchema = mongoose.Schema({
    name:String,
    age: {type:Number, min: 0, max: 110},
  });

  const Person  = mongoose.model('Person', personSchema);
//   const john = new Person({name:"John", age: 32});
const kohn = new Person({name: "Kohn", age:150});
await kohn.save((err)=>{
    if(err){console.log("Person does not meet the data entry requirements!")}
    else {
        console.log("document successfully entered into the Person collection.")
    }
})
//   await john.save();
  const people = await Person.find((err,data)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Person collection is given by:\n"+data)
    }
  });

}














// app.use(express.json()); // for parsing application/json instead of body-parser
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// app.get("/joke", (req,res) => {
//     res.sendFile(__dirname+"/index.html");
// });



// app.listen(3000,()=>{
//     console.log("Server is running on http//localhost:3000 ");
// });