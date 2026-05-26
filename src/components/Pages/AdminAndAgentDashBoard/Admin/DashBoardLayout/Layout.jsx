import SidebarItem from "../../../Shared/SidebarItem";
import logo from '../../../../../assets/images/logo.jpeg'
import {
  LayoutDashboard,



  Settings,
  LogOut,
  Menu,
  X,

  Users2,

  Bell,
  User,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      section: "OVERVIEW",
      items: [
        { path: "/", label: "Dashboard", icon: LayoutDashboard },
        // { path: "/analytics", label: "Analytics", icon: Shield },
      ],
    },
    {
      section: "USER MANAGE",
      items: [
        {
          path: "/all-users",
          label: "All Users",
          icon: Users2,
          // badge: "12",
        },
        { path: "/all-transaction", label: "All Transaction", icon: DollarSign },
        // { path: "/hotels", label: "Hotels", icon: Hotel },
        // { path: "/cars", label: "Car Rentals", icon: Car },
      ],
    },
    // {
    //   section: "Supplier",
    //   items: [
    //     {
    //       path: "/manual-hotel-booking",
    //       label: "Add Hotel",
    //       icon: LayoutDashboard,
    //     },
    //     { path: "/manual-flights", label: "Add Flights", icon: Plane },
    //     { path: "/manual-car", label: "Add Car", icon: Car },
    //   ],
    // },
    // {
    //   section: "AI PART",
    //   items: [
    //     {
    //       path: "/manual-AI-Package",
    //       label: "Add AI Package",
    //       icon: Package,
    //     },
    //     { path: "/manual-ai-model", label: "Add AI Agent", icon: LucideMoveDiagonal2 },
    //   ],
    // },
    // {
    //   section: "CATALOG",
    //   items: [
    //     {
    //       path: "/experiences",
    //       label: "Experiences",
    //       icon: TestTubeDiagonal,
    //       badge: "12",
    //     },
    //     { path: "/reviews", label: "Reviews", icon: Stars },
    //   ],
    // },
    // {
    //   section: "USERS",
    //   items: [
    //     {
    //       path: "/all-users",
    //       label: "All-Users",
    //       icon: Users2,
    //       badge: "12",
    //     },
    //     { path: "/admin-team", label: "Admin-Team", icon: UserLock },
    //   ],
    // },
    // {
    //   section: "SYSTEM",
    //   items: [
    //     {
    //       path: "/promo-codes",
    //       label: "Promo Codes",
    //       icon: Tags,
    //     },
    //     { path: "/settings", label: "Settings", icon: Settings2 },
    //   ],
    // },
  ];
  const [porfileopen, setporfileopen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setporfileopen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-[#fdfafb]">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="py-2 px-3 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-bold text-red-600 tracking-tight">
            <img src={logo} className="size-12" alt="" /> 
            {/* Pura <span className="text-rose-500">VidaX</span> */}
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-red-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6">
          {menuItems.map((group, idx) => (
            <div key={idx}>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2 px-4">
                {group.section}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {({ isActive }) => (
                      <SidebarItem
                        icon={item.icon}
                        label={item.label}
                        badge={item.badge}
                        active={isActive}
                      />
                    )}
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <button className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-4 py-2.5 rounded-lg transition-colors text-sm font-medium">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 relative">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-600 lg:hidden hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>

          <div
            className="flex items-center gap-4 md:justify-end w-full"
            ref={dropdownRef}
          >
            <div className="flex items-center gap-3 pr-4 border-r border-red-100">
              <button className="relative p-1 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <Bell size={20} fill="currentColor" className="text-gray-700 hover:text-red-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full"></span>
              </button>

              <button className="p-1 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <Settings
                  size={20}
                  fill="currentColor"
                  className="text-gray-700 hover:text-red-600"
                />
              </button>
            </div>

            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setporfileopen(!porfileopen);
                }}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="relative w-10 h-10">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop"
                    alt="Admin User"
                    className="w-full h-full rounded-full object-cover border-2 border-red-100 group-hover:border-red-400 transition-colors"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                    Admin User
                  </span>
                  <span className="text-xs text-gray-400">Super Admin</span>
                </div>

                <ChevronDown
                  size={16}
                  className={`text-gray-400 group-hover:text-red-600 transition-transform duration-200 ${porfileopen ? "rotate-180" : ""}`}
                />
              </div>

              {porfileopen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-red-100 rounded-xl shadow-lg py-2 z-50">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <User size={16} className="text-gray-500" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Settings size={16} className="text-gray-500" />
                    Account Settings
                  </button>
                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#fffbfb]">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
