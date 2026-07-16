import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/redux/hook";
import { authFailure, authStart, authSuccess } from "../authSlice";
import {
  LoginAPI,
  LogoutAPI,
  RegisterAPI,
  GetUserAPI,
} from "../service/api.service.js";
import { toast } from "react-toastify";
import { toastSettings } from "../../../utils/ToastSettings.js";
type ERROR = {
  response: {
    data: {
      message: string;
    };
  };
};


function isERROR(error: unknown): error is ERROR {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  );
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async (data: { email: string; password: string }) => {
    dispatch(authStart());
    const id = toast.loading("Logging in...");
    try {
      const response = await LoginAPI(data);
      dispatch(authSuccess(response.user));
      navigate("/chat");
      toast.update(id, {
        render: "Login Successful",
        type: "success",
        isLoading: false,
        ...toastSettings,
      });
    } catch (error: unknown) {
      if (isERROR(error)) {
        dispatch(authFailure(error!?.response!?.data.message!));
        toast.update(id, {
          render: error!?.response!?.data.message!,
          type: "error",
          isLoading: false,
          ...toastSettings,
        });
      }
    }
  };
  const RegisterHandler = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    dispatch(authStart());
    const id = toast.loading("Registering...");
    try {
      const response = await RegisterAPI(data);
      dispatch(authSuccess(response.user));
      navigate("/chat");
      toast.update(id, {
        render: "Registration Successful",
        type: "success",
        isLoading: false,
        ...toastSettings,
      });
    } catch (error: unknown) {
      if (isERROR(error)) {
        dispatch(authFailure(error!?.response!?.data.message!));
        toast.update(id, {
          render: error!?.response!?.data.message || "",
          type: "error",
          isLoading: false,
          ...toastSettings,
        });
      }
    }
  };
  const LogoutHandler = async () => {
    dispatch(authStart());
    const id = toast.loading("Logging out...");
    try {
      await LogoutAPI();
      toast.update(id, {
        render: "Logout Successful",
        type: "success",
        isLoading: false,
        ...toastSettings,
      });
      navigate("/login")
    } catch (error: unknown) {
      if (isERROR(error)) {
        dispatch(authFailure(error!?.response!?.data.message!));
        toast.update(id, {
          render: error!?.response!?.data.message || "",
          type: "error",
          isLoading: false,
          ...toastSettings,
        });
      }
    }
  };
  const GetMeHandler = async () => {
    dispatch(authStart());
    try {
      const response = await GetUserAPI();
      console.log(response);
    } catch (error) {}
  };
  return {
    loginHandler,
    RegisterHandler,
    LogoutHandler,
    GetMeHandler,
  };
};
