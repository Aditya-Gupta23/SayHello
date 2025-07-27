import { useParams } from "react-router"
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const ChatPage = () => {
  
  const {id:targetUserId}=useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(()=>{
    const initChat=async ()=>{
      console.log("loading1")
      if(!tokenData?.token || !authUser) return;
      console.log("loading2")

      try {
        console.log("Initializing stream chat data");

        const client=StreamChat.getInstance(STREAM_API_KEY)
        await client.connectUser({
          id:authUser._id,
          name:authUser.fullName,
          image:authUser.profilePic
        },tokenData.token)

        const channelId=[authUser._id,targetUserId].sort().join("-");
        const currChannel=client.channel("messaging",channelId,{
          members:[authUser._id,targetUserId]
        });
        setChatClient(client)
        setChannel(currChannel)
      } catch (error) {
        console.log("Error in Initializing stream chat",error)
      }finally {
        setLoading(false);
      }

    }
    initChat()
  },[tokenData?.token, authUser, targetUserId])

  const handleVideoCall=()=>{
    if(channel){
      const callUrl=`${window.location.origin}/call/${channel.id}`
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      })
      toast.success("Video call link sent successfully!");
    }
  }

  console.log(targetUserId)
  return (
   <div className="h-[93vh]">
    {loading ? (
      <ChatLoader/>
    ) : chatClient && channel ? (
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    ) : (
      <p className="text-center pt-10 text-red-500">Failed to load chat.</p>
    )}
  </div>
  )
}

export default ChatPage
