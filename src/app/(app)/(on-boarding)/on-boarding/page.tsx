import { auth } from "@/auth";
import UpdateUserForm from "./_components/UpdateUserForm";
import { AnimatedPage } from "@/components/ui/animated-page";

const OnBoardingPage = async () => {
  const session = await auth();
  
  return (
    <AnimatedPage pageKey="onboarding-page">
      <UpdateUserForm id={session?.user?.id}/>
    </AnimatedPage>
  )
}

export default OnBoardingPage;
