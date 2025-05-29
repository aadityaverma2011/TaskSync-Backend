import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient';

const JWT_SECRET = process.env.JWT_SECRET!;

const registerUser = async (req: Request, res: Response): Promise<any> => {
  console.log("Register endpoint hit:", req.body);
  const { email, password } = req.body;

  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from('users').insert([{ email, password: hashedPassword }]);

  if (error) {
    console.error("Supabase insert error:", JSON.stringify(error, null, 2)); 
    return res.status(500).json({ message: 'Error creating user', error });
  }

  res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({ token });
};

export default {
  registerUser,
  loginUser
};