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
                </HeaderTitle>
                <HeaderNavigation>
                    <HeaderNavigationItem href="/" label="Link Teste"></HeaderNavigationItem>
                    <HeaderNavigationItem href="/" label="Link Teste"></HeaderNavigationItem>
                </HeaderNavigation>
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