const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//Define the User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match:[/[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/, "Please enter valid email ID" ],
    },
    password: {
        type: String,
        required: true,
        minlength: 8, //minimum length of pwd 8
    },
    role: {
        type: string,
        enum:["user","admin"],
        default: "user"
    }
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    
};

module.exports = mongoose.model("User", UserSchema);
