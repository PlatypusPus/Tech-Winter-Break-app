import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import { genToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password is too short, make it at least 6 characters long" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        genToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const login = async (req,res) =>{
    const { email , password } = req.body

    try {
        const user = await User.findOne( {email} )
        if (!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect) return res.status(400).json({message:"Invalid Credentials"});

        genToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in Login Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
        console.log("Error in logout Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId= req.user._id;

        if(!profilePic){
            res.status(400),json({message:"Profile picture is required"})
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
        res.status(200),json(updatedUser)
    } catch (error) {
        console.log("Error in update profile:",error);
        res.status(400),json({message:"Internal Server error"})
    }
};

