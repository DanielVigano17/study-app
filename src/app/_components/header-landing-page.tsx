import { Header, HeaderActionsButton, HeaderContent, HeaderNavigation, HeaderNavigationItem, HeaderTitle } from "@/components/header/Header";
import Link from "next/link";
import { SmartStudyIcon } from "./SmartStudyIcon";

export function HeaderLandingPage()
{
    return(
        <Header className="z-50">
            <HeaderContent>
                <HeaderTitle>
                    <SmartStudyIcon />
                    <HeaderNavigation className="ml-4">
                        <HeaderNavigationItem href="#hero" label="Início"></HeaderNavigationItem>
                        <HeaderNavigationItem href="#app-print" label="Como funciona"></HeaderNavigationItem>
                        <HeaderNavigationItem href="#testimonials" label="Depoimentos"></HeaderNavigationItem>
                        <HeaderNavigationItem href="#pricing" label="Planos"></HeaderNavigationItem>
                        <HeaderNavigationItem href="/blog" label="Blog"></HeaderNavigationItem>
                    </HeaderNavigation>
                </HeaderTitle>
                <HeaderActionsButton>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        <Link href="/login">
                            Login
                        </Link>
                    </button>
                </HeaderActionsButton>
            </HeaderContent>
        </Header>
    )
}