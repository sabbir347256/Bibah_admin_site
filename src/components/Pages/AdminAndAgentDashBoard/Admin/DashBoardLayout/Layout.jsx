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
  VerifiedIcon,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../AuthProvider/CreateContext";
import config from "../../../utilies/envCongig";
import axios from "axios";
import { useForm } from "react-hook-form";
const Layout = () => {
  const { user, data } = useContext(AuthProvider);
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);

  const walletRef = useRef(null);
  const mobileWalletRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideButton = menuButtonRef.current && menuButtonRef.current.contains(event.target);
      const clickedInsideMenu = mobileMenuRef.current && mobileMenuRef.current.contains(event.target);
      if (!clickedInsideButton && !clickedInsideMenu) {
        setIsOpen(false);
      }

      const clickedInsideDesktopWallet = walletRef.current && walletRef.current.contains(event.target);
      const clickedInsideMobileWallet = mobileWalletRef.current && mobileWalletRef.current.contains(event.target);
      if (!clickedInsideDesktopWallet && !clickedInsideMobileWallet) {
        setIsWalletOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    ...(user?.role === "ADMIN" ? [
      {
        section: "OVERVIEW",
        items: [
          { path: "/", label: "Dashboard", icon: LayoutDashboard },
        ],
      }
    ] : []),
    {
      section: "USER MANAGE",
      items: [
        {
          path: "/all-users",
          label: "All Users",
          icon: Users2,
        },
        ...(user?.role === "ADMIN" ? [
          { path: "/all-transaction", label: "All Transaction", icon: DollarSign }
        ] : []),
      ],
    },
    ...(user?.role === "ADMIN" ? [
      {
        section: "Agent Function",
        items: [
          {
            path: "/agent-registration",
            label: "Agent Registration",
            icon: LayoutDashboard, 
          },
          {
            path: "/field-verification",
            label: "Add Field Verification",
            icon: VerifiedIcon, 
          },
        ],
      }
    ] : []),
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

  const { register, handleSubmit, reset, formState: { errors } } = useForm();



  const onSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `${config?.backendUrl}/transaction`,
        {
          userObjectId: user?.userId,
          userId: user?.userProfileId,
          transactionId: data.transactionId,
          phoneNumber: data.phoneNumber,
          amount: data.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Recharge request submitted successfully!");
      reset();
      setIsRechargeOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit request");
    }
  };



  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");

    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate('/admin-login');
    }, 1500);
  };


  const mainAmount = data?.data?.mainWalletBalance || 0;
  // const bonusAmount = data?.data?.isActive === 'INACTIVE' ? 0 : data?.data?.bonusWalletPoints;
  const referralAmount = data?.data?.agentReferWalletPoints || 0;
  const totalAmount = user
    ? (mainAmount || 0)  + (referralAmount || 0)
    : 0;



  return (
    <div className="h-screen flex overflow-hidden bg-[#fdfafb]">
      <Toaster position="top-right" reverseOrder={false} />
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
          <button onClick={handleLogOut} className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-4 py-2.5 rounded-lg transition-colors text-sm font-medium">
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

            <div className="relative" ref={walletRef}>
              {
                user?.role !== 'ADMIN' && <button
                  onClick={() => setIsWalletOpen(!isWalletOpen)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-md shadow-amber-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] uppercase tracking-wider opacity-90">Wallet</span>
                    <span className="text-xs font-bold">৳ {totalAmount}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform duration-200 ${isWalletOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              }

              {user && isWalletOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-4 z-50">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Balance Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-sm text-gray-600">Main Balance</span>
                      <span className="font-semibold text-gray-900">৳ {mainAmount}</span>
                    </div>
                    {/* <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-sm text-gray-600">Bonus Balance</span>
                      <span className="font-semibold text-emerald-600">৳ {bonusAmount}</span>
                    </div> */}
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-sm text-gray-600">Referral Earn</span>
                      <span className="font-semibold text-indigo-600">৳ {referralAmount}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRechargeOpen(true)}
                    className="bg-red-600 text-white hover:bg-red-800 duration-100 p-2 rounded-xl w-full mt-2"
                  >
                    Recharge
                  </button>
                </div>
              )}
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
                  <NavLink to='/profile' className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <User size={16} className="text-gray-500" />
                    My Profile
                  </NavLink>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Settings size={16} className="text-gray-500" />
                    Account Settings
                  </button>
                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                  <button onClick={handleLogOut} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>


        {isRechargeOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
              <button
                onClick={() => setIsRechargeOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-lg font-bold text-gray-990 mb-2">Recharge Account</h3>
              <p className="text-sm text-gray-600 bg-red-50 text-red-800 p-3 rounded-xl mb-4 font-medium">
                Please Payment to <span className="font-bold text-red-600">01711651471</span> via bKash, then submit your Transaction ID and Mobile Number below.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="01XXXXXXXXX"
                    {...register("phoneNumber", { required: "Mobile number is required" })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Transaction ID</label>
                  <input
                    type="text"
                    placeholder="TxnID"
                    {...register("transactionId", { required: "Transaction ID is required" })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm"
                  />
                  {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    {...register("amount", { required: "Amount is required" })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm"
                  />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRechargeOpen(false)}
                    className="w-1/2 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-red-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#fffbfb]">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
