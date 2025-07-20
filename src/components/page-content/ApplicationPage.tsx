import { AnimatedPage } from "../ui/animated-page";
import { cn } from "@/lib/utils";

interface ApplicationPageProps {
    children: React.ReactNode;
    pageKey: string;
    className?: string;
}

export function ApplicationPage({ children, pageKey, className }: ApplicationPageProps){
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
        <div className={cn("container mx-auto py-8 px-8 h-screen overflow-y-visible", className)}>
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
