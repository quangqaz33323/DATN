'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"
import Loading from "../base/Loading"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchIsAdmin = async () => {
      // ⚙️ TODO: replace with actual API check (e.g. /api/admin/me)
      await new Promise((r) => setTimeout(r, 600))
      setIsAdmin(true)
      setLoading(false)
    }

    fetchIsAdmin()
  }, [])

  if (loading) return <Loading />

  if (!isAdmin)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-slate-50">
        <h1 className="text-2xl sm:text-4xl font-semibold text-slate-500 mb-6">
          You are not authorized to access this page
        </h1>
        <Link
          href="/"
          className="bg-slate-800 hover:bg-slate-900 text-white flex items-center gap-2 mt-4 p-2 px-6 text-sm sm:text-base rounded-full transition-all duration-150 active:scale-95"
        >
          Go to Home <ArrowRightIcon size={18} />
        </Link>
      </div>
    )

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-5 lg:pl-12 lg:pt-12">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
