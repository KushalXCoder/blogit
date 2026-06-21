"use client";

import { getUserData } from "@/controllers/user.controller";
import { useEffect } from "react";
import { userStore } from "@/store/user.store";
import { toast } from "sonner";

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setLoading, setUser } = userStore();
  // Function to fetch user data from the backend
  const getData = async () => {
    try {
      const userData = await getUserData();
      if(!userData) {
        toast.error("User data not found. Refresh the page");
        setLoading(false);
        return;
      }
      setUser(userData);
    } catch (error) {
      toast.error("Error fetching user data. Refresh the page");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on every page load to keep the auth state updated
  useEffect(() => {
    getData();
  }, [setUser, setLoading]);

  return children;
}

export default AuthProvider;
