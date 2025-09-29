import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string, refreshToken: string) => {
  localStorage.setItem("access_token", token);
  localStorage.removeItem("refresh_token");

  console.log(token, refreshToken);
};

const attachToken = (config: any) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};

let isShowingError = false;
const errorResetTimeout = 5000; // 5 seconds

const getRefreshToken = () => localStorage.getItem("refresh_token");

const refreshToken = async () => {
  const rToken = getRefreshToken();
  if (!rToken) {
    throw new Error("No refresh token available");
  }

  try {
    // Create a new axios instance without interceptors for the refresh token call
    const response = await axios.get(`${baseUrl}auth/refresh`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (
      !response.data?.data?.access_token ||
      !response.data?.data?.refresh_token
    ) {
      throw new Error("Invalid token response");
    }

    const { access_token, refresh_token } = response.data.data;
    setToken(access_token, refresh_token);
    return access_token;
  } catch (error: any) {
    // Clear tokens on refresh failure
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw error;
  }
};

console.log(refreshToken);

const handleError = async (error: any) => {
  if (!error.response) {
    console.log("Network error or server is unreachable.");
    return Promise.reject(new Error("Network error or server is unreachable."));
  }

  const { status, data } = error.response;
  // const originalRequest = error.config;

  // Handle 401 errors with session expired dialog
  if (status === 401) {
    // Clear tokens on 401 error
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Show session expired dialog
    if (window.showSessionExpiredDialog) {
      window.showSessionExpiredDialog();
    }

    return Promise.reject(new Error("Session expired"));
  }

  const messages: Record<number, string> = {
    400: "Bad Request: Please check your input.",
    403: "Forbidden: You do not have access to this resource.",
    404: "Not Found: The resource was not found.",
    500: "Internal Server Error: Please try again later.",
  };

  const errorMessage =
    data?.message ||
    messages[status as keyof typeof messages] ||
    "An unexpected error occurred.";

  if (!isShowingError) {
    isShowingError = true;

    console.log(errorMessage);

    // Reset the flag after timeout
    setTimeout(() => {
      isShowingError = false;
    }, errorResetTimeout);
  }

  return Promise.reject(new Error(errorMessage));
};

axiosInstance.interceptors.request.use(attachToken, Promise.reject);
axiosInstance.interceptors.response.use((res) => res, handleError);

export { axiosInstance };
