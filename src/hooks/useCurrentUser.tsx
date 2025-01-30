// "use client";
// import { useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function useCurrentUser() {
//     const { data: session } = useSession();
//     const queryClient = useQueryClient();

//     useEffect(() => {
//         if (session?.user) {
//             queryClient.setQueryData(["user"], session.user);
//         }
//     }, [session, queryClient]);
//     return session?.user;
// }

"use client";
import { useSession } from "next-auth/react";

export default function useCurrentUser() {
    const { data: session } = useSession();
    return session?.user;
}
