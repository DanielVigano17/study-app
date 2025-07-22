import { ApplicationPage } from "@/components/page-content/ApplicationPage";
import { auth } from "../../../../../auth/auth";
import UpdateUserForm from "./_components/UpdateUserForm";

const OnBoardingPage = async () => {
  const session = await auth();
  
  return (
    <ApplicationPage pageKey="onboarding-page" authPage>
      <UpdateUserForm id={session?.user?.id}/>
    </ApplicationPage>
  )
}

export default OnBoardingPage;
