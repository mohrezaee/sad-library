import { AuthBindings } from "@refinedev/core";
import { UserDataprovider } from "./dataproviders/UserDataprovider";
import { UserType } from "./dataproviders/UserDataprovider";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      const users = await UserDataprovider.users;
      
      const user = users.find(
        (user) => (user.username === username) && user.password === password
      );

      if (user) {
        localStorage.setItem(TOKEN_KEY, user.id);
        return {
          success: true,
          redirectTo: "/",
        };
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    // const token = localStorage.getItem(TOKEN_KEY);
    // if (token) {
      // const user = await UserDataprovider.getOne<UserType>({ id: token });
      // if (user) {
        return {
          id: "user.id",
          name: "user.name",
          avatar: "https://i.pravatar.cc/300", // You can customize the avatar field
        };
      // }
    // }
    // return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
