import { Header, HeaderActionsButton, HeaderContent, HeaderNavigation, HeaderNavigationItem, HeaderTitle } from "@/components/header/Header";
import Link from "next/link";
import { SmartStudyIcon } from "./SmartStudyIcon";

export function HeaderBlog() {
  return (
    <Header className="z-50">
      <HeaderContent>
        <HeaderTitle>
          <Link href="/">
            <SmartStudyIcon />
          </Link>
        </HeaderTitle>
        <HeaderActionsButton>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            <Link href="/login">
              Iniciar teste grátis
            </Link>
          </button>
        </HeaderActionsButton>
      </HeaderContent>
    </Header>
  );
}
