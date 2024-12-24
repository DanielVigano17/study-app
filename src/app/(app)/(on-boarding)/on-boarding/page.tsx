import { auth } from "@/auth";
import UpdateUserForm from "./_components/UpdateUserForm";


const OnBoardingPage = async () => {
  const session = await auth();
  
  return (
   <>
   <UpdateUserForm id={session?.user?.id}/>
   </> 
  )
}

export default OnBoardingPage;
