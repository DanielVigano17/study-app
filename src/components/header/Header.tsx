import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeaderProps {
  className?: string;  
  children: ReactNode;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header className={cn("fixed flex items-center justify-center top-0 w-full z-50 glass-card border-b border-border/20 shadow-sm", className)}>
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
    <header className={cn("container flex items-center justify-between w-full p-5", className)}>
      {children}
    </header>
  );
}

interface HeaderTitleProps {
    children : ReactNode
}

export function HeaderTitle({children} : HeaderTitleProps){
    return(
        <h1 className="text-2xl font-bold h-full flex items-center">{children}</h1>
    )
}

interface HeaderNavigationProps {
  children: ReactNode;
  className?: string;
}

export function HeaderNavigation({ children, className }: HeaderNavigationProps) {
  return (
    <div className={cn("hidden md:flex space-x-6 items-center", className)}>
      {children}
    </div>
  );
}

interface HeaderNavigationItemProps {
  href: string;
  label: string;
}

export function HeaderNavigationItem({ href, label }: HeaderNavigationItemProps) {
  return (
    <a
      href={href}
      className="text-black hover:text-blue-500 transition-colors duration-300 text-[16px]"
    >
      {label}
    </a>
  );
}

interface HeaderActionsButtonProps {
  children: ReactNode;
}

export function HeaderActionsButton({ children }: HeaderActionsButtonProps) {
  return (
    <div className="flex space-x-6 items-center">
      {children}
    </div>
  );
}