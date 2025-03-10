import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


//Declaring a schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [50, "Name must be at most 50 characters long"],
    //trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validaaator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
    maxLength: [32, "Password must be at most 32 characters long"],
    trim: true,
  },
  resume: {
    public_id: String,
    url:String,
  },
  coverLetter: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum:["Job Seeker","Employer"],
    trim: true,
  },
  createdAt: {
    type: Data,
    default: Date.now
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

export const User = mongoose.model("User", userSchema);