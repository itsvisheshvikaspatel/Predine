
 const jwt = require("jsonwebtoken");
  console.log("Auth Middleware Loaded");

function authMiddleware(req, res, next) {
     console.log("Inside Auth Middleware Loaded");
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    console.log("JWT Secret:", process.env.JWT_SECRET);
console.log("Token:", token);

   try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log("Decoded Token:", decoded);

  req.user = decoded;

  console.log("Calling next()...");

  next();

} catch (err) {
  console.log("JWT ERROR:", err);

  return res.status(401).json({
    success: false,
    message: "Invalid token",
  });
}
  } catch (error) {
   console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

module.exports = authMiddleware;