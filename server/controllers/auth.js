import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt'


export const register = async (req, res, next) => {

  
    
    try{

        const { username, email, password ,isAdmin} = req.body;

        console.log('admin...');
        
        const saltRounds = 10;

        const salt = bcrypt.genSaltSync(saltRounds);

        
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash,'----');

        const newAdmin = new Admin({ username, email, password:hash, isAdmin })
        const savedAdmin = await newAdmin.save();
        res.json(savedAdmin)
        // return true

    

    }catch(error){
        console.log(error.message);
    }


   


    try {

        const { password, isAdmin, ...otherDetails } = savedUser._doc;

        res.status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}


export const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) return next(createError(404, "User is not founded!"))

        const isPassword = await bcrypt.compare(req.body.password, user.password)

        if (!isPassword) return next(createError(400, "Wrong username or password!"))

        const { password, isAdmin, ...otherDetails } = user._doc;

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails);
        
    } catch (error) {
        
        next(error)

    }
}