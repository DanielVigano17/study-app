'use client'
import { usePathname } from 'next/navigation'
import { HomeIcon, Settings, CreditCard } from 'lucide-react'
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMain, SidebarNav, SidebarNavHeader, SidebarNavHeaderTitle, SidebarNavLink, SidebarNavMain } from '@/components/Sidebar/SidebarModel'

export function MainSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader>
        StudyApp
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="w-3 h-3 mr-3" />
              Home
            </SidebarNavLink>
            <SidebarNavLink
              href="/settings"
              active={isActive('/settings')}
            >
              <Settings className="w-3 h-3 mr-3" />
              Configurações
            </SidebarNavLink>
            <SidebarNavLink
              href="/billing"
              active={isActive('/billing')}
            >
              <CreditCard className="w-3 h-3 mr-3" />
              Gerenciar Assinatura
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
        <span>TesteFooter</span>
      </SidebarFooter>
    </Sidebar>
  )
}
