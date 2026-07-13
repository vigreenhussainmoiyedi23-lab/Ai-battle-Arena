import { useAppDispatch } from "../../../app/redux/hook";
import { authFailure, authStart } from "../authSlice";
import {
  LoginAPI,
  LogoutAPI,
  RegisterAPI,
  GetUserAPI,
} from "../service/api.service.js";
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

  const loginHandler = async (data: { email: string; password: string }) => {
    dispatch(authStart());
    try {
      const response = await LoginAPI(data);
      console.log(response);
    } catch (error: unknown) {
      if (isERROR(error)) {
        dispatch(authFailure(error!?.response!?.data.message!));
      }
    }
  };
  const RegisterHandler = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    dispatch(authStart());
    try {
      const response = await RegisterAPI(data);
      console.log(response);
    } catch (error: unknown) {
      if (isERROR(error)) {
        dispatch(authFailure(error!?.response!?.data.message!));
      }
    }
  };
  const LogoutHandler = async () => {
    dispatch(authStart());
    try {
      const response = await LogoutAPI();
      console.log(response);
    } catch (error: unknown) {}
  };
  const GetMeHandler = async () => {
    dispatch(authStart());
    try {
      const response = await GetUserAPI();
      console.log(response);
    } catch (error) {
    
    }
  };
  return {
    loginHandler,
    RegisterHandler,
    LogoutHandler,
    GetMeHandler,
  };
};
