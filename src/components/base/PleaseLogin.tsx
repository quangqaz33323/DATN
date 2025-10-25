import { useRouter } from "@/i18n/routing";
import { useClerk } from "@clerk/nextjs";

const PleaseLogin = ({ user }: { user: any }) => {
  const router = useRouter();
  const { openSignIn, openSignUp } = useClerk();

  if (!user) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#FDFBF7] px-6 text-center text-[#5C4033]">
        <div className="max-w-xl rounded-2xl border border-[#E6D2B5] bg-white/60 p-10 shadow-lg backdrop-blur-sm">
          <h1 className="mb-4 text-4xl font-bold text-[#8B5E3C]">
            Chào mừng đến với <span className="text-[#A47148]">Quang Woodcraft</span>
          </h1>
          <p className="mb-8 text-lg text-[#6B4F3A]">
            Bạn cần đăng nhập để tiếp tục truy cập khu vực dành cho người bán. Hãy đăng nhập để quản
            lý cửa hàng của bạn dễ dàng hơn.
          </p>

          <button
            onClick={() => openSignIn()}
            className="rounded-lg bg-[#8B5E3C] px-8 py-3 font-medium text-white shadow-md transition-all hover:bg-[#704125] active:scale-95"
          >
            Đăng nhập ngay
          </button>

          <div className="mt-6 text-sm text-[#8B5E3C]/80">
            Chưa có tài khoản?{" "}
            <button
              onClick={() => openSignUp()}
              className="font-semibold text-[#A47148] hover:underline"
            >
              Đăng ký tại đây
            </button>
          </div>
        </div>

        <div className="mt-12 opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#C19A6B"
            className="mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M7 7a5 5 0 1110 0 5 5 0 01-10 0z"
            />
          </svg>
          <p className="mt-2 font-medium text-[#A47148]">Không gian dành riêng cho nghệ nhân gỗ</p>
        </div>
      </div>
    );
  }
};

export default PleaseLogin;
