import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async(req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({
      success: false,
      message: 'Login required',
      status: 401,
    })
  }

  const [, token] = authorization.split(' ');

  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = decode;

    const user = await User.findById({id});
    console.log(user);

    if(!user){
      return res.status(401).json({
        success: false,
        message: 'User does not exist',
        status: 401,
      })
    }

    req.userId = id
    req.userEmail = email

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Expired or invalid token',
      status: 401
    })
  }
}
