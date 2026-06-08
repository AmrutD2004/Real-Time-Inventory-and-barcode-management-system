import { prisma } from "../prisma/lib/prisma.ts";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import "dotenv/config";

export const register = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const dbcount = await prisma.users.count();
    const role = dbcount === 0 ? 'Admin' : 'Manager'

    const hashPassword = await bcrypt.hash(password, 8);

    const result = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        role
      },
    });

    return res.status(201).json({
      success: true,
      message: "User Created",
      user: {
        id: result.id,
        email: result.email,
        role: result.role,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const login = async(req : Request, res : Response)=>{
  const jwtsecret = process.env.JWT_SECRET
  if (!jwtsecret) {
  return res.status(500).json({
    success: false,
    message: "JWT secret is not configured",
  });
}
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(409).json({
      success : false,
      message : 'All fields are required!'
    })
  }

  try{
    const userExist = await prisma.users.findUnique({
      where : {email : email}
    })

    if(!userExist){
      return res.status(404).json({
        success : false,
        message : 'User not exist'
      })
    }

    const isMatched = await bcrypt.compare(password, userExist.password)
    if(!isMatched){
      return res.status(400).json({
        success : false,
        message : 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      {id : userExist.id , role : userExist.role},
      jwtsecret,
      {expiresIn : '1d'}
    )

    res.cookie('token', token, {
      httpOnly : true,
      sameSite : process.env.NODE_ENV === 'production' ? 'none' : "lax",
      secure :  process.env.NODE_ENV === 'production' ? true : false,
      path : '/',
      maxAge : 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      success : true,
      message : 'Login successfull'
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      success : false,
      message : 'Something went wrong'
    })
  }
}

export const logout = async (req : Request, res : Response)=>{
  try{
    res.clearCookie('token', {
    httpOnly : true,
      sameSite : process.env.NODE_ENV === 'production' ? 'none' : "lax",
      secure :  process.env.NODE_ENV === 'production' ? true : false,
      path : '/',
  })
  return res.status(200).json({
      success : true,
      message : 'Logout successfull'
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      success : false,
      message : 'Something went wrong'
    })
  }
}

export const isAuthenticated = async(req : Request, res : Response)=>{
  const { userId , userRole } = req.user

  if(!userId || !userRole){
    return res.status(409).json({
      success : false,
      message : 'Not Authenticated'
    })
  }
  const result = await prisma.users.findUnique({
    where : {id : userId}
  })
  return res.status(200).json({
    success : true,
    data : result
  })
}