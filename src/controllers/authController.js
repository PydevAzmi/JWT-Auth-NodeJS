//Auth controller
const User = require("../model/User");
module.exports.signup_post = async (req, res)=>{
    const {username, password, password2, email} = req.body;
    if (password !== password2) {
        res.status(400).json({errors:{'password':"Passwords do not match"}});
        return;
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch(err){
        let errors = {email: "", password: "", username: ""};
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
        res.status(400).json({'errors':errors});
    }
}

module.exports.login_post = async (req, res)=>{
    const {username, password} = req.body;
    if (!username && !password) {
        res.status(400).json({errors:{'username':"Username is required", 'password':"Password is required"}});
        return;
    }
    else if (!username && password) {
        res.status(400).json({errors:{'username':"username is required"}});
        return;
    }else if (username && !password) {
        res.status(400).json({errors:{'Password':"Password is required"}});
        return;
    }
    try{
        const user = await User.findOne({username: username});
        if (!user) {
            res.status(400).json({errors:{'username':"Username does not exist"}});
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
