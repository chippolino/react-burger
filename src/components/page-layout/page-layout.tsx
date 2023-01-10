import type { ReactNode } from 'react'
import AppHeader from '../app-header/app-header'

type Props = {
  children?: ReactNode
}

export const PageLayout = ({ children }: Props) => {
  return (
    <div className="app">
      <AppHeader />
      <main>{children}</main>
    </div>
  )
}
