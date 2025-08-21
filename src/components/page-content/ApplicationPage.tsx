import { checkUserAuth } from "../../../auth/check-user-auth";
import { checkSubscription } from "@/middleware/checkSubscription";
import { AnimatedPage } from "../ui/animated-page";
import { cn } from "@/lib/utils";

interface ApplicationPageProps {
    children: React.ReactNode;
    pageKey: string;
    className?: string;
    authPage?: boolean;
    subscriptionRequired?: boolean;
}

export async function ApplicationPage({ children, pageKey, className, authPage = false, subscriptionRequired = false }: ApplicationPageProps){
    if (authPage) await checkUserAuth();
    if (subscriptionRequired) await checkSubscription();

    return (
        <AnimatedPage pageKey={pageKey}>
            <div className={cn("w-full overflow-y-auto", className)}>
                <ApplicationPageContent>
                    {children}
                </ApplicationPageContent>
            </div>
        </AnimatedPage>
    )
}

interface ApplicationPageContentProps {
    children: React.ReactNode;
    className?: string;
}

export function ApplicationPageContent({ children, className }: ApplicationPageContentProps){
    return (
        <div className={cn("container mx-auto py-8 px-4 h-screen overflow-y-visible md:px-8", className)}>
            {children}
        </div>
    )
}

interface ApplicationPageTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function ApplicationPageTitle({ children, className }: ApplicationPageTitleProps){
    return (
        <h1 className={cn("text-3xl font-bold mb-8 text-foreground", className)}>
            {children}
        </h1>
    )
}
