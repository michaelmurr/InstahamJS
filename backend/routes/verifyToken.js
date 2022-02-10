import jwt from "jsonwebtoken";

function verify(req, res, next) {
  const token = req.header("auth");
  if (!token) return res.status(401).send("Access Denied");
  
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload._id;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send("Invalid Token");
  }
}

export { verify };
