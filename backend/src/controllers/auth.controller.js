import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { signToken } from "../utils/jwt.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = signToken({ id: user.id, role: user.role });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Register failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user.id, role: user.role });

    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};
