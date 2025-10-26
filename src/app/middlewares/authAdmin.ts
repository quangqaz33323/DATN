import { clerkClient } from "@clerk/nextjs/server";

const authAdmin = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) {
      return false;
    }

    const client = await clerkClient();

    const user = await client.users.getUser(userId);

    return process.env.ADMIN_EMAILS?.split(",").includes(user.emailAddresses[0].emailAddress)
      ? true
      : false;
  } catch {
    return false;
  }
};

export default authAdmin;
