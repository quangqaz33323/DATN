import prisma from "@/lib/prisma";

const authSeller = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        store: true,
      },
    });

    if (!user || !user.store) {
      return false;
    }

    if (user.store.status !== "APPROVED".toLowerCase()) {
      return false;
    }

    return user.store.id;
  } catch {
    return false;
  }
};

export default authSeller;
