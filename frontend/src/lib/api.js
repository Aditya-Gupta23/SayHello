import { axiosInstance } from "./axios"

export const getAuthUser=async ()=>{
    try {
        const res=await axiosInstance("/auth/me")
        return res.data
    } catch (error) {
        console.error("error authenticating user ",error)
        return null;
    }
}

export const login=async (loginData)=>{
    const response=await axiosInstance.post('/auth/login',loginData);
    return response.data;
}

export const completeOnboarding=async(userData)=>{
    const response=await axiosInstance.post('/auth/onboarding',userData)
    return response.data;
}

export const logout=async()=>{
    const res=axiosInstance.post('/auth/logout')
    return res.data;
}