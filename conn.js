const mongoose = require("mongoose");

//link from mongodb atlas
const DB = "mongodb+srv://shiva:shiva@cluster0.sl1rr8c.mongodb.net/OneMD "

//connecting nodejs to mongodb
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DataBase Connected")).catch((err) => {
    console.log(err);
})