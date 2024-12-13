const authorizeRole = (...allowedRole) => {
    return (req, res, next) => {
        console.log(`checking role: ${req.user.role}`);
        
        if(!allowedRole.includes(req.user.role)){
            return res.status(403).json({message: "Access denied"});
        }
        next();
    }
}
export default authorizeRole;