//Auth controller
const User = require("../model/User");
const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24;
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge * 3
    });
}

module.exports.signup_post = async (req, res)=>{
    const {username, password, email} = req.body;
    try{
        const user = await User.create(req.body);
        token = createToken(user._id);
        res.cookie('jwt', token, {maxAge: maxAge * 3 * 1000});
        res.status(201).json({user_id:user._id, token: token});
        return;
    }catch(err){
        if (err.code === 11000){
            res.status(400).json({'errors':err.keyValue});
            return;
        }else{
            let errors = {email: "", password: "", username: ""};
            Object.values(err.errors).forEach(({properties})=>{
                errors[properties.path] = properties.message;
            });
            res.status(400).json({'errors':errors});
            return;
        }
    }
}

module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body;
    if (!email && !password) {
        res.status(400).json({errors:{'email':"email is required", 'password':"Password is required"}});
        return;
    }
    else if (!email && password) {
        res.status(400).json({errors:{'email':"email is required"}});
        return;
    }else if (email && !password) {
        res.status(400).json({errors:{'Password':"Password is required"}});
        return;
    }

    try{
        const user = await User.login_user(email, password);
        token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 3 * 1000});
        res.status(201).json({user_id:user._id, token: token});
        return;
    }
    catch(err){
        res.status(400).json({errors:err.message});
        return;
    }

}

module.exports.logout = (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).json({message: "Logout successful"});
}

module.exports.list_users = async (req, res)=>{
    const users = await User.find({});
    res.status(200).json(users);
}

module.exports.del_user = async (req, res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user){
        res.status(400).json({errors:"User not found"});
        return;
    }
    res.status(200).json(user);
}


module.exports.get_current_user = async (req, res)=>{
    const token = req.cookies.jwt;
    if (!token){
        res.status(400).json({errors:"No token found"});
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded_data)=>{
        if (err){
            res.status(400).json({errors:err.message});
            return;
        }
        const user = await User.findById(decoded_data.id);
        res.status(200).json(user);
        return;
    });
}