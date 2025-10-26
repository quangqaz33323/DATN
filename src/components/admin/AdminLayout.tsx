"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Loading from "../base/Loading";
import { useAuth, useUser } from "@clerk/nextjs";
import { ca } from "date-fns/locale";
import axios from "axios";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/admin/is-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(data.isAdmin);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchIsAdmin();
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!isAdmin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h1 className="mb-6 text-2xl font-semibold text-slate-500 sm:text-4xl">
          You are not authorized to access this page
        </h1>
        <Link
          href="/"
          className="mt-4 flex items-center gap-2 rounded-full bg-slate-800 p-2 px-6 text-sm text-white transition-all duration-150 hover:bg-slate-900 active:scale-95 sm:text-base"
        >
          Go to Home <ArrowRightIcon size={18} />
        </Link>
      </div>
    );

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-5 lg:pt-12 lg:pl-12">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
