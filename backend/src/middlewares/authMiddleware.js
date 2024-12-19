import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Token has expired"
        : "Invalid token, authorization denied";
    return res.status(401).json({ message });
  }
};

const getTokenFromRequest = (req) => {
  const tokenFromCookie = req.cookies?.accessToken;
  
  const tokenFromHeader = req.header("Authorization")?.startsWith("Bearer ")
  ? req.header("Authorization").split(" ")[1]
  : null;
  
  console.log(`\nToken from cookie: ${tokenFromCookie} and token from Header ${tokenFromHeader} \n`);
  return tokenFromCookie || tokenFromHeader;
};

export default authMiddleware;
