import { SecureHeader } from '@/components/secure-header'
import { HTMLAttributes } from 'react'

export default function PageBase({children, hasSecureHeader = true}: {children: React.ReactNode, hasSecureHeader?: boolean} & HTMLAttributes<HTMLDivElement>) {
  return (
    <main className="min-h-svh pb-16">
      {hasSecureHeader && <SecureHeader />}
      {children}
    </main>
  )
}
