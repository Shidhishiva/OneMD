const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


//for user registration api

router.post("/register", async (req, res) => {
    console.log(req.body);

    // object destructuring
    const { tel, fname, email, password, cpassword, date, exp, d1name, d2name } = req.body;

    //checking any field empty
    if (!tel || !fname || !email || !password || !cpassword || !date || !d1name || !d2name) {
        res.status(422).json({ error: "Fill all the details" })
    }

    //checking duplicates
    try {
        const preuser = await userdb.findOne({ tel: tel });

        if (preuser) {
            res.status(422).json({ error: " Mobile number already exists" });
        } else if (await userdb.findOne({ email: email })) {
            res.status(422).json({ error: "Email already exists" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and confirm password doesn't match " });
        } else {

            //storing user in database
            const finalUser = new userdb({
                tel, fname, email, password, cpassword, date, exp, d1name, d2name

            })


            //password hashing and storing in db
            const storeData = await finalUser.save();

            //storing data get data on console
            //console.log(storeData);
            // res.status(201).json({ error: "password and confirm password doesn't match " });
            res.status(201).json({ status: 201, storeData });
            //  res.status(201).json(storeData);
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("  catch block");

    }

});

//user login api

router.post("/login", async (req, res) => {
    //console.log(req.body);

    const { email, password } = req.body;

    //email and password validation
    if (!email || !password) {
        res.status(422).json({ error: "Fill all the details" })
    }

    try {
        const userValid = await userdb.findOne({ email: email });

        //comparing user login credentials
        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password);
            if (!isMatch) {
                res.status(422).json({ error: "Invalid details" })
            } else {

                // token generate
                const token = await userValid.generateAuthtoken();
                console.log(token);




                //cookie generate 
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 600000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })


            }
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("  catch block");

    }
});

//user validation
router.get("/validuser", authenticate, async (req, res) => {
    //console.log("done");
    try {
        const ValidUserOne = await userdb.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

// user logout

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})





module.exports = router;
