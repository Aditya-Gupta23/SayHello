import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthUser from '../hooks/useAuthUser.jsx'
import completeOnboarding from '../lib/api.js'

const OnboardingPage = () => {

  const {authUser}=useAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  const {mutate:onboardingMutation,isPending}=useMutation({
    mutationFn:completeOnboardingd,
    onSuccess=()=>{
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  })

  return (
    <div>
      
    </div>
  )
}

export default OnboardingPage
