import { Guitar, ListMusic, Target } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar'

const NAV_ITEMS = [
  { to: '/scales', label: 'Scales', icon: ListMusic },
  { to: '/practice', label: 'Practice', icon: Target },
  { to: '/fretboard', label: 'Fretboard', icon: Guitar },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent"
        >
          <div className="flex size-7 shrink-0 items-center justify-center bg-text text-sm font-bold text-bg">
            G
          </div>
          <span className="truncate text-base font-semibold group-data-[collapsible=icon]:hidden">
            Guitar Theory
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.to)
            return (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className="h-10 text-base [&_svg]:size-5"
                >
                  <Link to={item.to}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
