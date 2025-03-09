'use client'
import { usePathname } from 'next/navigation'
import { HomeIcon, Settings, CreditCard, BookText, LogOut } from 'lucide-react'
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMain, SidebarNav, SidebarNavHeader, SidebarNavHeaderTitle, SidebarNavLink, SidebarNavMain } from '@/components/Sidebar/SidebarModel'
import { BottomNavigation } from './bottom-navigation'
import { useContext } from 'react'
import { ApplicationContext } from '../_context/app.context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { SmartStudyIcon } from './SmartStudyIcon'

export function MainSidebar() {
  const pathname = usePathname()
  const { session } = useContext(ApplicationContext)

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <div className='h-full'>
      <Sidebar className='h-full bg-sidebar'>
      <SidebarHeader>
        <SmartStudyIcon />
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>

            <SidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="w-4 h-4 mr-3" />
              Home
            </SidebarNavLink>

            <SidebarNavLink
              href="/settings"
              active={isActive('/settings')}
            >
              <Settings className="w-4 h-4 mr-3" />
              Configurações
            </SidebarNavLink>

            <SidebarNavLink
              href="/billing"
              active={isActive('/billing')}
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Gerenciar Assinatura
            </SidebarNavLink>

            <SidebarNavLink
              href="/quiz"
              active={isActive('/quiz')}
            >
              <BookText className="w-4 h-4 mr-3"/>
              Questionários
            </SidebarNavLink>

          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto">
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>
              Links extras
            </SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavMain>
            <SidebarNavLink href="/">
              Precisa de ajuda?
            </SidebarNavLink>
            <SidebarNavLink href="/">Site</SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>

      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={session?.user?.image || undefined} />
            <AvatarFallback>{session?.user?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
    <BottomNavigation/>
    </div>
  )
}
