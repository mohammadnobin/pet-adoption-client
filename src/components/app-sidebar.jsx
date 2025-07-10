// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter,
// } from "@/components/ui/sidebar";
// import { FaPaw } from "react-icons/fa";
// import { Link } from "react-router";

// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>

//         {/* 🔰 লোগো */}
//         <div className="p-4">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-lime-600 font-bold text-3xl"
//           >
//             <FaPaw />
//             <span>PetAdopt</span>
//           </Link>
//         </div>

//         {/* ✅ মেনু শুরু */}
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-gray-500 uppercase text-xs px-4">
//             Menu
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url} className="flex items-center gap-2">
//                       <item.icon className="w-4 h-4" />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>Footer</SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }



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
  User, LogOut,
  PawPrint, // ✅ নতুন icon
} from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lime-600 font-bold text-3xl"
          >
            <FaPaw />
            <span>PetAdopt</span>
          </NavLink>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              {/* ✅ Add a Pet */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/add-pet"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
                  >
                    <HeartHandshake className="w-5 h-5" />
                    <span>My Donations</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

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
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
          onClick={() => console.log("Logout triggered")} // এখানে তোমার logout ফাংশন বসবে
           className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 bg-white shadow-[0_4px_0_#a3e635] hover:translate-y-[-2px] transition-all mb-4 "
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
