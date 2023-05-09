const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "qwertyuiopasdfghjklzxcvbnmqwertyu"

//defining schema
const userSchema = new mongoose.Schema({
    tel: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not valid Email")
            }
        }

    },
    fname: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 8

    },
    cpassword: {
        type: String,
        required: true,
        minlength: 8

    },
    date: {
        type: Date,
        required: true,
        default: Date.now

    },
    exp: {
        type: Number,
        required: true
    },
    d1name: {
        type: String,
        required: true,
        trim: true

    },
    d2name: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

//hash password
userSchema.pre("save", async function (next) {
    //once bcrypted password should not be changed only when modified by user
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next()
});

//token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token2 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d",
        });

        //(token2 is generated) (token is defined)
        this.tokens = this.tokens.concat({ token: token2 });
        await this.save();
        return token2;
    } catch (error) {
        res.status(422).json(error);
    }

}


//creating model
const userdb = new mongoose.model("users", userSchema)

module.exports = userdb;

