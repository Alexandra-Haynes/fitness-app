import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import { signJwtToken } from "../../../libs/jwt";
import bcrypt from "bcrypt";
import db from "../../../libs/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await db.connect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid input");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Wrong password");
        } else {
          const { password, ...currentUser } = user._doc;

          const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });

          return {
            ...currentUser,
            accessToken,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: '/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //user has access
        token.accessToken = user.accessToken;
        token._id = user._id;
      }
      return token; //to be stored
    },
    //setup session
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
