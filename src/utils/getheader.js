import { auth } from "@/config/firebase";

export const getAuthHeader = async () => {
  let token = null;
  
  // Always prefer fresh token from Firebase SDK
  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (e) {
      console.error("Failed to retrieve Firebase token:", e);
    }
  }

  // Fallback to localStorage if SDK fails or user not found (though unlikely if logged in)
  if (!token) {
    token = localStorage.getItem('token');
  }

  return token ? { Authorization: `Bearer ${token}` } : {};
};

