import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { FaPaw } from "react-icons/fa";
import {
  Inbox,
  Users,
  HandCoins,
  Gift,
  HeartHandshake,
  User,
  LogOut,
  PawPrint,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useUserRole from "../hooks/useUserRole";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function AppSidebar() {
  const { logOut } = useAuth();
  const { role, roleLoading } = useUserRole();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        title: "Good job!",
        text: "SignOut Successful",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message,
      });
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-secondary font-bold text-3xl"
          >
            <FaPaw />
            <span>PetAdopt</span>
          </NavLink>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleLoading ? (
                <>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={40} />
                  </div>
                </>
              ) : (
                <>
                  {/* ✅ Add a Pet */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="/dashboard/add-pet"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                      >
                        <PawPrint className="w-5 h-5" />
                        <span>Add a Pet</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* My Added Pets */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="/dashboard/my-pets"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                      >
                        <Inbox className="w-5 h-5" />
                        <span>My Added Pets</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Adoption Request */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="/dashboard/adoption-requests"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                      >
                        <Users className="w-5 h-5" />
                        <span>Adoption Request</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Create Donation Campaign */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="/dashboard/create-campaign"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                      >
                        <HandCoins className="w-5 h-5" />
                        <span>Create Donation Campaign</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* My Donation Campaigns */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="/dashboard/my-campaigns"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                      >
                        <Gift className="w-5 h-5" />
                        <span>My Donation Campaigns</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                      {/* My Donations */}
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to="/dashboard/my-donations"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                          >
                            <HeartHandshake className="w-5 h-5" />
                            <span>My Donations</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                  {role === "admin" && (
                    <>

                      {/* All Donations */}
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to="/dashboard/all-donations"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                          >
                            <Gift className="w-5 h-5" />
                            <span>All Donations</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* All Pets */}
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to="/dashboard/all-pets"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                          >
                            <PawPrint className="w-5 h-5" />
                            <span>All Pets</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Users */}
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to="/dashboard/users"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
                          >
                            <Users className="w-5 h-5" />
                            <span>Users</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {/* 👤 Profile */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* 🚪 Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#5046e5] hover:translate-y-[-2px] transition-all mb-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
