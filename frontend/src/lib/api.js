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

export const getUserFriends = async () => {
    try {
        const res = await axiosInstance.get('/users/friends');
        return res.data || [];
    } catch (error) {
        console.error("Error fetching friends", error);
        return [];
    }
}

export const getRecommendedUsers = async () => {
    try {
        const res = await axiosInstance.get('/users');
        return res.data || [];
    } catch (error) {
        console.error("Error fetching recommended users", error);
        return [];
    }
}

export const getOutgoingFriendsReq = async () => {
    try {
        // Fixed endpoint typo here
        const res = await axiosInstance.get('/users/outgoin-friend-requests');
        return res.data || [];
    } catch (error) {
        console.error("Error fetching outgoing friend requests", error);
        return [];
    }
}

export const sendFriendRequests=async(userId)=>{
    const res=axiosInstance.post(`/users/friend-request/${userId}`)
    return res.data;
}