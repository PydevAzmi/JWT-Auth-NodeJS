//Auth controller
const User = require("../model/User");
module.exports.signup_post = async (req, res)=>{
    const {username, password, email} = req.body;
    try{
        console.log("trying to create user", req.body);
        const user = await User.create(req.body);
        console.log("user created", user);
        res.status(201).json(user);
        return;
    }catch(err){
        console.log("error creating user", err);
        let errors = {email: "", password: "", username: ""};
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
        res.status(400).json({'errors':errors});
        return;
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
        const user = await User.findOne({email: email});
        if (!user) {
            res.status(400).json({errors:{'email':"email does not exist"}});
            return;
        }
    }
    catch(err){
        let errors = {email: "", password: ""};
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
        res.status(400).json({'errors':errors});
        return;
    }

}


module.exports.list_users = async (req, res)=>{
    const users = await User.find({});
    res.status(200).json(users);
}

module.exports.del_user = async (req, res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
}