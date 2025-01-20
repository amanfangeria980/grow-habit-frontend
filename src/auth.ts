import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// http://localhost:8080/api/auth/signin

class customError extends CredentialsSignin {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
    code = "custom_error";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            authorize: async (credentials) => {
                const email = credentials?.email as string | undefined;
                const password = credentials?.password as string | undefined;

                if (!email || !password) {
                    throw new customError(
                        "Please enter both email and password"
                    );
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    }
                );
                const responseData = await response.json();
                const user = responseData.user;
                if (
                    responseData.success &&
                    responseData.message === "Sign in successful"
                ) {
                    return user;
                } else {
                    return {
                        success: false,
                        error: responseData.message || "Invalid Credentials",
                    };
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token, user }) {
            // to store google id in db
            // if (token?.sub) session.user.id = token.sub;
            if (token.sub && token.fullName && token.email) {
                session.user.id = token.sub;
                session.user.name = token.fullName as string;
                session.user.email = token.email as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                // @ts-ignore
                token.fullName = user.fullName;
                token.email = user.email;
            }
            return token;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const { name, email, image, id } = user;
                    await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                fullName: name,
                                email,
                                oauthId: id,
                                image,
                            }),
                        }
                    );

                    return true;
                } catch (error) {
                    console.error("Error while creating user", error);
                }
            }
            if (account?.provider === "credentials") {
                return true;
            }
            return false;
        },
    },
});
