import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt'


export const register = async (req, res, next) => {

  
    
    try{

        const { email, password } = req.body;

        console.log('admin...');
        
        const saltRounds = 10;

        const salt = bcrypt.genSaltSync(saltRounds);

        
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash,'----');

        const newAdmin = new Admin({ email, password:hash})
        const savedAdmin = await newAdmin.save();
        res.json(savedAdmin)
        // return true

    

    }catch(error){
        console.log(error.message);
    }


   


    
}




export const login = async (req, res, next) => {

try {
    const{ email, password } = req.body
    const user = await Admin.findOne({email:email })
    console.log(user);

    if(!user){
        res.status(404).json({message:"user not found!"})
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password)
    console.log(isPassword,"password");

    if (isPassword) {
        res.status(200).json(user)
    } else {
        res.status(404).json({message:"user not found!"})
    }


}catch(error){
    res.status(404).json({message:error.message})
    console.log(error);
}


}


// export const login = async (req, res, next) => {

//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });

//         if (!user) return next(createError(404, "User is not founded!"))

//         const isPassword = await bcrypt.compare(req.body.password, user.password)

//         if (!isPassword) return next(createError(400, "Wrong username or password!"))

//         const { password, isAdmin, ...otherDetails } = user._doc;

//         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

//         res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails);
        
//     } catch (error) {
        
//         next(error)

//     }
// }