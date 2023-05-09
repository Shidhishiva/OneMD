require("dotenv").config();
const express = require("express");
const app = express();
const port = 7007;
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")

// app.get("/", (req, res) => {
//     res.status(201).json("server created")
// });

//getting data from frontend to backend in json format
app.use(express.json());
app.use(cookiParser());
//cors - cross orgin resource sharing 
app.use(cors());
app.use(router);


app.listen(port, () => {
    console.log(`server started at port no :${port}`);
});
