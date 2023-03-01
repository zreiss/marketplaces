import type {GetServerSidePropsContext} from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {env} from "../env.mjs";
import {prisma} from "./db";
import bcrypt from "bcryptjs";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({token, user}) {
      if (user) {
        console.log("JWT user", user)
        token.id = user.id;
        // token.role = user.role; <-- put other properties on the token here
      }
      return token;
    },

    session: function ({session, token}) {
      if (token.id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.id = token.id;
      }
      return session;
    }

  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          value: "ysall@zreiss.com",
          placeholder: "Enter your email",
        },
        password: {
          label: "password",
          type: "password",
          value: "zrFriedRice770",
          placeholder: "Enter your name",
        },
      },
      async authorize(credentials, _req) {
        let isAuthenticated = false;
        const user = await prisma.users.findUnique({where: {email: credentials?.email}});

        if (!credentials?.password || !user) {
          return null;
        }

        if (user && credentials?.password && user.password) {
          isAuthenticated = !! await bcrypt.compare(credentials.password, user.password);

          if(isAuthenticated) {
            return user;
          }
        }
        return null;
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
