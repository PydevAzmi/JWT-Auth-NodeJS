const  jwt = require('jsonwebtoken');
const require_auth =(req, res, next) =>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if (err){
                console.log(err.message);
                res.status(401).json({error: "Token is not valid"});
            }else{
                next();
            }
        });
    }else{
        res.status(401).json({error: "Unauthorized"});
    }
}

module.exports = {require_auth};