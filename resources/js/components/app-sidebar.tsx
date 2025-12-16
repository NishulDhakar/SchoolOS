import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from "@/routes";
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid, GraduationCap, BookOpen, UserRound, FileText } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Teachers',
    href: '/teachers',
    icon: GraduationCap,
  },
  {
    title: 'Students',
    href: '/students',
    icon: UserRound,
  },
  {
    title: 'Courses',
    href: '/courses',
    icon: BookOpen,
  },
  {
    title: 'Enrollments',
    href: '/enrollments',
    icon: FileText,
  },
  {
    title: 'Classes',
    href: '/classes',
    icon: LayoutGrid,
  },
  {
    title: 'Staff',
    href: '/staff',
    icon: GraduationCap,
  },
  {
    title: 'Fees',
    href: '/fees',
    icon: UserRound,
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: BookOpen,
  },
  {
    title: 'Notices',
    href: '/notices',
    icon: FileText,
  },
  {
    title: 'Buses',
    href: '/buses',
    icon: BookOpen,
  },
  {
    title: 'Exams',
    href: '/exams',
    icon: FileText,
  },
  {
    title: 'Library',
    href: '/library',
    icon: FileText,
  },

];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard.url()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
