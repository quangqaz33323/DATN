import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"
import { Store } from "@/types"

interface StoreInfoProps {
  store: Store
}

const StoreInfo: React.FC<StoreInfoProps> = ({ store }) => {
  const getStatusStyle = () => {
    switch (store.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="flex-1 space-y-3 text-sm text-slate-600">
 
      <div className="flex justify-center sm:justify-start">
        <Image
          width={100}
          height={100}
          src={store.logo}
          alt={store.name}
          className="size-20 object-cover rounded-full shadow-sm border border-slate-200"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <h3 className="text-xl font-semibold text-slate-800">{store.name}</h3>
        <span className="text-sm text-slate-500">@{store.username}</span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle()}`}>
          {store.status}
        </span>
      </div>

    
      {store.description && (
        <p className="my-3 leading-relaxed max-w-2xl">{store.description}</p>
      )}


      <div className="space-y-1.5">
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-slate-400" /> {store.address}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} className="text-slate-400" /> {store.contact}
        </p>
        <p className="flex items-center gap-2">
          <Mail size={16} className="text-slate-400" /> {store.email}
        </p>
      </div>


      <div className="pt-4 border-t border-slate-100">
        <p className="text-slate-700 mb-2">
          Applied on{" "}
          <span className="text-xs text-slate-500">
            {new Date(store.createdAt).toLocaleDateString()}
          </span>{" "}
          by
        </p>

        <div className="flex items-center gap-3">
          <Image
            width={36}
            height={36}
            src={store.user.image}
            alt={store.user.name}
            className="size-9 rounded-full border border-slate-200"
          />
          <div>
            <p className="text-slate-700 font-medium">{store.user.name}</p>
            <p className="text-slate-500 text-xs">{store.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreInfo
