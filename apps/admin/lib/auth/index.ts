import NextAuth, { type Session, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './config';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      orgId: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    orgId: string;
  }
}

async function getUser(email: string, password: string) { 
  return {
    id: '1',
    name: 'John Doe',
    email,
    password,
    role: 'admin',
    orgId: '1',
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        return await getUser(email, password);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.orgId = user.orgId;
      }

      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.orgId = token.orgId as string;
      }

      return session;
    },
  },
});
