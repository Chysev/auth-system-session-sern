import Axios from "./Axios";
import { UseNavigateResult } from "@tanstack/react-router";

const useSession = async () => {
  try {
    const response = await Axios.get("/api/session");

    return response.data;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const isAuthenticated = async (navigate: UseNavigateResult<string>) => {
  try {
    await useSession();
  } catch (error) {
    // If there is no session
    navigate({ to: "/auth/login" });
    console.error("Error getting session:", error);
  }
};

export const isNotAuthenticated = async (
  navigate: UseNavigateResult<string>
) => {
  try {
    // If there is session
    await useSession();
    navigate({ to: "/profile" });
  } catch (error) {
    console.error("Error getting session:", error);
  }
};

export default useSession;
