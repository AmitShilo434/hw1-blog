import React from "react";
import { Session } from "inspector";

// const session = {
//   user: {
//     name: "AmitShilo434",
//     email: "shilob@post.bgu.ac.il",
//     image: "https://avatars.githubusercontent.com/u/132204571?v=4",
//   },
//   expires: "2023-06-30T20:43:58.925Z",
// };
const session = useSession(true);

export interface SessionContextValue<R extends boolean> {
  update: UpdateSession;
  data: null;
  status: R extends true ? "authenticated" : "unauthenticated" | "loading";
}

type UpdateSession = () => void;

export interface UseSessionOptions<R extends boolean> {
  // Add your options here
}

export function useSession<R extends boolean>(
  options?: UseSessionOptions<R>
): SessionContextValue<R> {
  return {
    update: () => {},
    data: null,
    status: "unauthenticated" as R extends true ? "authenticated" : "unauthenticated" | "loading",
  };
}

export function getSession(params?: any): any {
  return session;
};

export function SessionProvider(params?: any): any {
  return session;
};

export function signOut(params?: any): any {
  return session;
};

