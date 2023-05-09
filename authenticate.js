const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "qwertyuiopasdfghjklzxcvbnmqwertyu"

//getting token to backend from dashboard
const authenticate = async (req, res, next) => {

    try {

        //token generated
        const token = req.headers.authorization;
        //console.log(token);

        //token verified getting id from payload
        const verifytoken = jwt.verify(token, keysecret);
        //console.log(verifytoken);

        //finding user
        const rootUser = await userdb.findOne({ _id: verifytoken._id });
        //console.log(rootUser);

        if (!rootUser) { throw new Error("user not found") }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized no token provided" })
    }
}


module.exports = authenticate