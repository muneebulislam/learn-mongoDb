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
    name: {
      type:String, 
      required:[true, "Name of the fruit is required."],
    },
    rating: Number,
    review: String
  });
// Now create a model
  const Fruit = mongoose.model('Fruit', fruitSchema); 
  //inside the parenthesis 'Fruit' is name of collection that will be automatically converted to Fruits name.
  const mango = new Fruit({ name: 'Mango', rating: 8, review: 'Yellow and very sweet!'});
  console.log(mango.name);
  // we can insert many fruits to collection as follows
  const apple = new Fruit({
    name: "apple",
    rating: 5,
    review:"An apple a day keeps the doctor away!"
  });

  const kiwi = new Fruit({
    name: "kiwi",
    rating: 5,
    review: "kiwi is sour!"
  });

  const orange = new Fruit({
    name: "orange",
    rating: 3,
    review: "refreshing!"
  });

  Fruit.insertMany([orange,kiwi,apple], (err)=>{
    if(err){console.log(err)
    } else {
      console.log("All the fruits inserted in the Fruits collection!")
    }
  })

  // Now save mango to the mongo database.
  // await mango.save();
  // Now we can find everything about the Fruit collection
  // const fruits = await Fruit.find();
  // console.log("Fruits collection is given by \n"+fruits)

  //Another collection.
  const personSchema = mongoose.Schema({
    name:String,
    age: {type:Number, min: 0, max: 110},
  });

  const Person  = mongoose.model('Person', personSchema);
//   const john = new Person({name:"John", age: 32});
//   await john.save();

// Delete all the documents in Fruits model where name is apple
// Fruit.deleteMany({ name: 'apple' }, function (err) {
//   if (err) {console.log(err)};
//   // deleted at most one Fruit document
// });


 Fruit.find((err,data)=>{ // here data is an array of objects. 
    if(err){
        console.log(err);
    } else {
      mongoose.connection.close();
        data.forEach((item)=>{
          console.log(item.name);
        })
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