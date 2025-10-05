import { create } from "zustand";

type  TestStore = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const initialState: TestStore = {
    loading: false,
    setLoading: () => {},
};

const useStore = create<TestStore>((set) => ({
  ...initialState,
    setLoading: (loading: boolean) => set({ loading }),
}));

export const useTestStore = () => {
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    return { loading, setLoading };
};
