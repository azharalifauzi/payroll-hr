import { LogoEduCBT } from '@/assets'
import { useUser } from '@/hooks/user'
import { cn, navigate } from '@/utils'
import { client } from '@/utils/fetcher'
import { Banknote, Folder, Home, LogOut, Users } from 'lucide-react'
import React from 'react'
import Link from './link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const sidebarList = [
  {
    text: 'Overview',
    to: '/',
    permissions: [],
    Icon: Home,
    end: true,
  },
  {
    text: 'Staff',
    to: '/staff',
    permissions: [],
    Icon: Users,
  },
  {
    text: 'Payroll',
    to: '/payroll',
    permissions: [],
    Icon: Banknote,
  },
  {
    text: 'Administration',
    to: '/administration',
    permissions: [],
    Icon: Folder,
  },
]

const Layout: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { user, getDefaultOrgPermission } = useUser()

  return (
    <main>
      <header className="fixed top-0 left-[270px] right-0 h-[92px] border-b border-gray-100 flex items-center justify-end px-5">
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-gray-400">Howdy</div>
            <div className="font-semibold text-sm">{user?.name}</div>
          </div>
          <Avatar>
            <AvatarImage
              className="object-cover object-center"
              src={user?.image ?? undefined}
            />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="fixed top-0 left-0 bottom-0 w-[270px] bg-gray-100">
        <div className="h-[92px] flex items-center font-extrabold px-6 text-xl justify-center">
          <LogoEduCBT className="h-8 w-8 mr-1 text-purple-700" />
          Payroll HR
        </div>
        <div className="mt-1 px-6">
          <div className="font-bold mb-3 text-xs text-gray-400">DAILY USE</div>
          <div className="grid gap-3">
            {sidebarList.map(({ Icon, permissions, text, to, end }) => {
              if (
                permissions.length > 0 &&
                !getDefaultOrgPermission(permissions)
              ) {
                return null
              }

              return (
                <Link
                  key={to}
                  className={(isActive) =>
                    cn(
                      'flex items-center gap-3.5 px-4 py-2.5 font-semibold text-sm hover:text-blue-500',
                      {
                        'bg-blue-500 text-white rounded-full hover:text-white':
                          isActive,
                      }
                    )
                  }
                  to={to}
                  end={end}
                >
                  <Icon className="h-4 w-4" />
                  {text}
                </Link>
              )
            })}
          </div>
          <div className="font-bold mb-3 text-xs text-gray-400 mt-8">
            OTHERS
          </div>
          <button
            className="w-full text-left text-sm flex items-center gap-3.5 px-4 py-2.5 font-semibold hover:text-blue-500"
            onClick={async () => {
              await client.api.v1.user.logout.$post()
              navigate('/login')
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
      <div
        className={cn(
          'fixed bottom-0 right-0 top-[92px] left-[270px] overflow-y-auto p-5',
          className
        )}
      >
        {children}
      </div>
    </main>
  )
}

export default Layout
