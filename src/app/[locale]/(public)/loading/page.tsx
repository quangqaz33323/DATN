'use client'


import Loading from "@/components/base/Loading"
import { useRouter } from "@/i18n/routing"
import { useEffect } from "react"

export default function LoadingPage() {
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const url = params.get('nextUrl')

        if (url) {
            setTimeout(() => {
                router.push(url)
            }, 4000)
        }
    }, [router])

    return <Loading />
}
