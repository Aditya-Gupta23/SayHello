import { axiosInstance } from "./axios"

export const getAuthUser=async ()=>{
    const res=await axiosInstance("/auth/me")
    return res.data
}