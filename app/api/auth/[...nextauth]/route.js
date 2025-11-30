// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";           // ⭐ Add this
import { databaseConnection } from "@/lib/db"; // ⭐ Add this

const authOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, trigger }) {

      // ⭐ User login ho raha hai
      if (account) {
        await databaseConnection();
        const dbUser = await User.findOne({ authId: user.id }).lean();

        token.phone = dbUser?.phone || "";
        token.role = dbUser?.role || "user";
        token.isUserExistInDB = !!dbUser;

        return token;
      }

      // ⭐ Jab hum session refresh trigger karein
      if (trigger === "update") {
        await databaseConnection();
        const dbUser = await User.findOne({ authId: token.sub }).lean();

        token.phone = dbUser?.phone || "";
        token.role = dbUser?.role || "user";
        token.isUserExistInDB = !!dbUser;
      }

      return token;
    },


    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.phone = token.phone || "";
      session.user.role = token.role || "user";
      session.user.isUserExistInDB = token.isUserExistInDB;

      return session;
    }

  }

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
