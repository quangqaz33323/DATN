import Link from "next/link"

const StoreNavbar = () => {

    return (
        <div className="flex items-center justify-between px-12 py-4 border-b border-amber-200 bg-amber-50 transition-all shadow-sm">
     
            <Link href="/" className="relative text-4xl font-bold text-amber-900 tracking-tight">
                <span className="text-amber-700">Quang</span>Wood
                <span className="text-amber-700 text-5xl leading-none">.</span>
                <p className="absolute text-xs font-semibold -top-1 -right-14 px-3 py-0.5 rounded-full flex items-center gap-2 text-white bg-amber-700 shadow">
                    Store
                </p>
            </Link>

            <div className="flex items-center gap-3 text-amber-900 font-medium">
                <p>Xin chào, <span className="font-semibold">Người bán</span></p>
            </div>
        </div>
    )
}

export default StoreNavbar
