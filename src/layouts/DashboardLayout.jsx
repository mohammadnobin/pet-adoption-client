// Dashboard Layout Component
// --------------------------


import { ScrollRestoration, useLocation, useNavigation } from "react-router";
import { AppSidebar } from "@/components/app-sidebar"; // Custom Sidebar component
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Breadcrumb UI components
import { Separator } from "@/components/ui/separator"; // Simple line separator
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // Sidebar layout utilities
import { Outlet } from "react-router"; // To render nested routes inside the layout
import LoadingSpinner from "../components/Shared/Loading/LoadingSpinner"; // Loading spinner for pending state

export default function Page() {
  // Get the current location path
  const location = useLocation();

  // Track the current navigation state (idle, loading, submitting)
  const { state } = useNavigation();

  // Extract the last part of the path as the current page name
  const currentPath =
    location.pathname.split("/").filter(Boolean).pop() || "Home";

  // Format the path for breadcrumb (replace "-" with space and capitalize)
  const formattedPath = currentPath
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="dark:bg-black dark:text-white">
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        <SidebarInset>
          {/* Header section with breadcrumb */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              {/* Sidebar toggle button */}
              <SidebarTrigger className="-ml-1" />

              {/* Vertical separator */}
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />

              {/* Breadcrumb Navigation */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink>Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Scroll to top on route change */}
          <ScrollRestoration />

          {/* Show spinner while loading, otherwise render nested route */}
          {state === "loading" ? <LoadingSpinner /> : <Outlet />}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
