"use client";

import { useAddressStore } from "@/zustand/useAddressStore";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const AddressModal = ({
  setShowAddressModal,
}: {
  setShowAddressModal: (show: boolean) => void;
}) => {
  const { getToken } = useAuth();
  const t = useTranslations("common");
  const addAddress = useAddressStore((s) => s.addAddress);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/address",
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addAddress(data.newAddress);
      toast.success("Address added successfully");

      setShowAddressModal(false);
    } catch (error) {
      toast.error("Error adding address");
    }
  };

  return (
    <form
      onSubmit={(e) => toast.promise(handleSubmit(e), { loading: t("addAddress") })}
      className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-white/60 backdrop-blur"
    >
      <div className="mx-6 flex w-full max-w-sm flex-col gap-5 text-slate-700">
        <h2 className="text-3xl">
          {t("addNew")}
          <span className="font-semibold">{t("address")}</span>
        </h2>
        <input
          name="name"
          onChange={handleAddressChange}
          value={address.name}
          className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
          type="text"
          placeholder="Enter your name"
          required
        />
        <input
          name="email"
          onChange={handleAddressChange}
          value={address.email}
          className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={handleAddressChange}
          value={address.street}
          className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-4">
          <input
            name="city"
            onChange={handleAddressChange}
            value={address.city}
            className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={handleAddressChange}
            value={address.state}
            className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-4">
          <input
            name="zip"
            onChange={handleAddressChange}
            value={address.zip}
            className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
            type="number"
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            onChange={handleAddressChange}
            value={address.country}
            className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={handleAddressChange}
          value={address.phone}
          className="w-full rounded border border-slate-200 p-2 px-4 outline-none"
          type="text"
          placeholder="Phone"
          required
        />
        <button className="rounded-md bg-slate-800 py-2.5 text-sm font-medium text-white uppercase transition-all hover:bg-slate-900 active:scale-95">
          {t("saveAddress")}
        </button>
      </div>
      <XIcon
        size={30}
        className="absolute top-5 right-5 cursor-pointer text-slate-500 hover:text-slate-700"
        onClick={() => setShowAddressModal(false)}
      />
    </form>
  );
};

export default AddressModal;
