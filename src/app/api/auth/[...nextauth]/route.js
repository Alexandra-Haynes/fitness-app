import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import { signJwtToken } from "../../../lib/jwt";
import bcrypt from "bcrypt";
import dbConnect from "../../../lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Type email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await dbConnect();

        const user = await User.findOne({ email });
console.log("User Data:", user);
        if (!user) {
          throw new Error("Invalid input");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Invalid input");
        } else {
          const { password, ...currentUser } = user._doc;

          const accessToken = signJwtToken(currentUser, { expiresIn: "3d" });

          return {
            //return user data
            ...currentUser,
            accessToken,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //saving _id to token
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
       
        // token.userId = user.userId; 
      }

      return token;
    },
    async session({ session, token }) {
      //extracting the _if from token and adding it to session object
      if (token) {
        session.user._id = token._id;
        // session.user._id = token.userId;
        session.user.accessToken = token.accessToken;
        // session.user.username = token.username;
      }

      return session;
    },

   
  },
});

export { handler as GET, handler as POST };
