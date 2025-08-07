import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeaderProps {
  className?: string;  
  children: ReactNode;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header className={cn("fixed top-0 w-full z-50 glass-card border-b border-border/20 shadow-sm", className)}>
      {children}
    </header>
  );
}

interface HeaderContentProps {
  className?: string;  
  children: ReactNode;
}

export function HeaderContent({ children, className }: HeaderContentProps) {
  return (
    <header className={cn("container flex justify-between w-full p-5", className)}>
      {children}
    </header>
  );
}

interface HeaderTitleProps {
    children : ReactNode
}

export function HeaderTitle({children} : HeaderTitleProps){
    return(
        children
    )
}

interface HeaderNavigationProps {
  children: ReactNode;
}

export function HeaderNavigation({ children }: HeaderNavigationProps) {
  return (
    <div className="flex space-x-6 items-center">
      {children}
    </div>
  );
}

export function HeaderNavigationItem({ href, label }: { href: string, label: string }) {
  return (
    <a
      href={href}
      className="text-black hover:text-blue-500 transition-colors duration-300"
    >
      {label}
    </a>
  );
}
