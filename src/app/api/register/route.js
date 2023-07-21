import User from "../../models/User";
import bcrypt from "bcryptjs";
import db from "../../libs/db"

export async function POST(req) {
  try {
    await db.connect();
    const { username, email, password: pass } = await req.json();
    const isExisting = await User.findOne({ email });
    if (isExisting) throw new Error("User already exists"); //TODO: improve UI
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password, ...user } = newUser._doc; //store info
    return new Response(JSON.stringify(user), { status: 201 }); //no error
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
