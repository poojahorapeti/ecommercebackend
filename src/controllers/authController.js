const User = require(" ../models/userModel ");
const jwt = require("jsonwebtoken");
const  bcrypt = require("bcryptjs");
const { validationResults } = require
("express-validator");
//Generate JWT Token
const generateToken = (user) => {return jwt.sign({ id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d,"});};

const registerUser = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({errors:errors.array()});}
    const{email,password,role} = req.body;
    try{
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({message: "User already exists"});
        user = new User({email,password,role});
        await user.save();
        res.status(201).json({
            message:"User registered successfully",
            token:generateToken(user),

        });

    } catch (error) {res.status(500).json({ messsage: error.message }); }
};

const loginUser = async (req,res) => {
    const errors = validationResults(req);
    if (!erorr.isEmpty())  { return res.status(400).json({errors:errors.array()});}
    const { email, password} = req.body;
    try{
        const user = await User.findOne({ email});
        if (!user) return res.status(400).json({ message: "Invalid credentials"});
        const isMatch = await bcrypt.compare(password,user.password);
if (!isMatch) return res.status(400).json({message:"invalid credentials"});
    res.json({
        message: "login successful",
        token:generateToken(user),
    });

} catch (error) {res.status(500).json({ message:error.message }); }
    };
    module.exports = { registerUser,loginUser };