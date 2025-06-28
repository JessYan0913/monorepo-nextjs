import NextAuth, { type Session, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './config';

interface ExtendedSession extends Session {
  user: User;
}

async function getUser(email: string, password: string): Promise<{
  id: string;
  name: string;
  email: string;
  password: string;
}> {
	return {
		id: '1',
		name: 'test user',
		email: email,
		password: password,
	};
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
      name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
      async authorize({email, password}) {
        const user = await getUser(
					email as string,
					password as string
				);

				return user ?? null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
