import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: "https://dibshit.store/auth", // the base url of your auth server
    plugins: [ inferAdditionalFields<typeof auth>() ]
});

export type Session = typeof authClient.$Infer.Session;