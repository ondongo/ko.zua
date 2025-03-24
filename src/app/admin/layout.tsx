import "./admin.css";
import { SidebarProvider } from "@/context/SidebarContext";
import ContainerAdmin from "@/components/container/ContainerAdmin";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-visible">
        <SidebarProvider>
          <ContainerAdmin> {children} </ContainerAdmin>
        </SidebarProvider>
      </body>
    </html>
  );
}
