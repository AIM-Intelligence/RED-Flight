import { redirect } from "next/navigation";

import { isLoggedIn } from "@/server/auth/auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }
  return (
    <main className="flex h-screen items-center justify-center bg-black">
      {/* <Image
        src="/background/zaion_city.jpg"
        className="absolute inset-0 h-full w-full"
        width={1920}
        height={1080}
        alt="zaion city"
      /> */}
      <div>{children}</div>
    </main>
  );
};

export default layout;
