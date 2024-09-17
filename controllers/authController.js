import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res)=>{
    const { username, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if ((user)) return res.status(400).json({ message: "User Already Exists"})
    user = new User({ username,email,password});
await user.save();


const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
    expiresIn: '1h',

});
res.status(201).json({token});

        } catch (error) {
       res.status(500).json({ message: 'Server Error '});

    }
}
export const login = async (req, res) => {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({ email });
          if (!user) return res.status(400).json({ message: 'Invalid credentials' });
      
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.json({ token });
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
};

