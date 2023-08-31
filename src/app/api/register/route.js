import User from "../../models/User";
import bcrypt from "bcrypt";
import dbConnect from "../../lib/db";

export async function POST(req) {
  try {
    await dbConnect();

    const requestData = await req.json();
    console.log("Request Data:", requestData);

    const { username, email, password: pass } = requestData;

    const isExisting = await User.findOne({ email });
    console.log("Is existing user:", isExisting);

    if (isExisting) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password, ...user } = newUser._doc;
    console.log("New user:", user);

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
