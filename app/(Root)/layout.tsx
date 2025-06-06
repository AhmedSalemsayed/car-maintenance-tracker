import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";
import MobileHeader from "@/components/MobileHeader";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider
      className="flex flex-col md:flex-row"
      defaultOpen={defaultOpen}
    >
      <AppSidebar />
      <MobileHeader />
      <main className="bg-[#fafbfd] relative w-full h-screen flex flex-col justify-center gap-1 items-center p-2 md:pt-12 font-Roboto overflow-auto">
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
        </Suspense>
        <Toaster richColors />
      </main>
    </SidebarProvider>
  );
}
