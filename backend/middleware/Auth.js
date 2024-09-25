const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next)=>{
    let auth = req.headers['authorization'];

    if(!auth){
        return res.status(403).json({message:"Unauthorized , JWT token is require "});
    }
    try {
        auth=auth.split(' ')[1]
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    } catch (error) {
        
        return res.status(403).json({message:"Unauthorized , JWT token wrong or expired "});
   
    }
}

module.exports = ensureAuthenticated;