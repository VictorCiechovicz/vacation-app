'use client'
import React from 'react'

import { useGlobalState } from '@/app/context/globalProvider'
import Image from 'next/image'

import menu from '@/app/utils/menu'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Button from '../Button'
import { arrowLeft, bars, logout } from '@/app/utils/Icons'
import { UserButton, useClerk, useUser } from '@clerk/nextjs'
import { SidebarStyled } from './styles'

function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState()
  const { signOut } = useClerk()

  const { user } = useUser()

  const { firstName, lastName, imageUrl } = user || {
    firstName: '',
    lastName: '',
    imageUrl: ''
  }

  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (link: string) => {
    router.push(link)
  }

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt="profile" />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          {firstName} {lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map(item => {
          const link = item.link
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? 'active' : ''}`}
              onClick={() => {
                handleClick(link)
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name={'Sign Out'}
          type={'submit'}
          padding={'0.4rem 0.8rem'}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1.2rem'}
          icon={logout}
          click={() => {
            signOut(() => router.push('/signin'))
          }}
        />
      </div>
    </SidebarStyled>
  )
}

export default Sidebar
