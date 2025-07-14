import { upseartStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    const { email, password, fullName } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "all fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "passowrd length must be atleast 6 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })
        await upseartStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic||"",
        })
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({ success: true, user: newUser })

    } catch (error) {
        console.log("Error in sign up", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export async function login(req, res) {
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"All fields are necessary"});
        }
        const user=await User.findOne({email});
        if(!user) return res.status(401).json({message:"Invalid email or password"});

        const isCorrectPassword=await user.matchPassword(password)
        if(!isCorrectPassword){
            return res.status(401).json({message:"Invalid email or passowrd"});
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'7d'
        })
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV==="production"
        })
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error signing in",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({message:"logout successful"})
}

export async function onboard(req,res) {
    try {
        const userId=req.user._id;
        const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body;

        if(!fullName||!bio||!nativeLanguage||!learningLanguage||!location){
            return res.status(400).json({
                message:"all fields required",
                missingFileds:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            })
        }
        const updatedUser=await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded:true
        },{new:true},)

        if(!updatedUser) return res.status(404).json({message:"user not found"})

            try {
                await upseartStreamUser({
                    id:updatedUser._id.toString(),
                    name:updatedUser.fullName,
                    image:updatedUser.profilePic||"",

                })
            } catch (stream_error) {
                console.error("Error updating userStream data",stream_error);
            }

        return res.status(200).json({success:true,user:updatedUser})
    } catch (err) {
        console.error("Onboarding failed",err)
        return res.status(500).json({message:"Internal server error"})   
    }
}

