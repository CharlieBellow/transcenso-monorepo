"use client"
import PageBase from "@/components/PageBase"
import ProfilePage from "@/presentation/pages/ProfilePages"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

export default function userPage() {
  return <PageBase hasHeader={true}>
<Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
    >
      
  <ProfilePage />
      </Suspense>
  </PageBase>
}
