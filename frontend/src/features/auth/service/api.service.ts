import api from "../../../app/axios"

export const LoginAPI = async (data:{email:string,password:string}) => {
    const response = await api.post("/api/auth/login", data)
    return response.data
}

export const RegisterAPI = async (data:{email:string,password:string,username:string}) => {
    const response = await api.post("/api/auth/register", data)
    return response.data
}

export const LogoutAPI = async () => {
    const response = await api.post("/api/auth/logout")
    return response.data
}

export const GetUserAPI = async () => {
    const response = await api.get("/api/auth/get-me")
    return response.data
}