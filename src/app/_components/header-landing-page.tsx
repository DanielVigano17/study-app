import { Header, HeaderContent, HeaderNavigation, HeaderNavigationItem, HeaderTitle } from "@/components/header/Header";

export function HeaderLandingPage()
{
    return(
        <Header>
            <HeaderContent>
                <HeaderTitle>Título de Teste</HeaderTitle>
                <HeaderNavigation>
                    <HeaderNavigationItem href="/" label="Link Teste"></HeaderNavigationItem>
                    <HeaderNavigationItem href="/" label="Link Teste"></HeaderNavigationItem>
                </HeaderNavigation>
            </HeaderContent>
        </Header>
    )
}