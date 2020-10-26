const mongoose = require("mongoose");
const Messages = require("./modules/messages");
const url = "mongodb://localhost:27017/messagedb";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false,
  poolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
var connect = mongoose.connect(url, options);

connect.then((db) => {
  console.log("connected");
  Messages.insertMany([
    {
      author: "N00B",
      title: "I cannot code!",
      content: "Anyone experienced out there?",
      message: [
        {
          body: "Hello there",
          date: "22.10.2020",
          id: "1",
        },
        {
          body: "What do you need help with?",
          date: "22.10.2020",
          id: "2",
        },
      ],
    },
    {
      title: "My code is broken - please help!",
      content: "I do not know s__t about Node.js!",
      author: "1337",
      message: [
        {
          body: "should i show a piece of code?",
          date: "25.10.2020",
        },
        {
          body: "code link",
          date: "25.10.2020",
        },
        {
          body: "thanks for all the help",
          date: "25.10.2020",
        },
      ],
    },
    {
      title: "I quit!",
      content: "This coding stuff is too hard! I quit!",
      author: "A student",
      message: [
        {
          body: "cya!",
          date: "25.10.2020",
        },
      ],
    },
  ])
    .then(() => {
      return Messages.find({}).exec();
    })
    .then((msg) => {
      console.log(msg[0]); //prints out the 1st object for reference (this value will be modified)
      return Messages.updateOne(
        //updates "body" value of a comment where message.id is "1" <- you can change this value to 2 to test for 2nd comment in object
        { "message.id": "1" },
        {
          $set: {
            "message.$.body": "updated comment",
          },
        }
      );
    })
    .then((msg) => {
      console.log("Values changed: " + msg.ok);
      return Messages.find({}).exec();
    })
    .then((msg) => {
      console.log(msg[0]); //prints out the 1st object for reference
      return Messages.deleteMany({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((msg) => {
      throw msg;
    });
});
