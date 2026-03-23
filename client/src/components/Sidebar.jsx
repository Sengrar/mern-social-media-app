import logo from "../assets/logo.png";
import {
    Home,
    Search,
    Compass,
    Heart,
    PlusSquare,
    MessageCircle,
    User,
    Menu
} from "lucide-react";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-black text-white border-r border-gray-800 flex flex-col justify-between p-4">

            {/* Top */}
            <div>
                {/* <h1 className="text-white text-xl font-bold mb-8 hidden md:block">
                    SocialApp
                </h1> */}

                <div className="mb-8 flex items-center justify-center md:justify-start">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-10 h-10 object-contain"
                    />
                    <span className="hidden md:block ml-2 font-bold text-lg">
                        Devgram
                    </span>
                </div>

                <nav className="flex flex-col gap-6">
                    <SidebarItem icon={<Home />} label="Home" active />
                    <SidebarItem icon={<Search />} label="Search" />
                    <SidebarItem icon={<Compass />} label="Explore" />
                    <SidebarItem icon={<MessageCircle />} label="Messages" badge={3} />
                    <SidebarItem icon={<Heart />} label="Notifications" badge={5} />
                    <SidebarItem icon={<PlusSquare />} label="Create" />
                    <SidebarItem icon={<User />} label="Profile" />
                </nav>
            </div>

            {/* Bottom */}

            <div>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden md:block">Himanshu</span>
                </div>

                <div className="mt-3">
                    <SidebarItem icon={<Menu />} label="More" />
                </div>
            </div>


        </div>
    );
};

const SidebarItem = ({ icon, label, active, badge }) => {
    return (
        <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition
      ${active ? "bg-gray-800 font-semibold border-l-4 border-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
        >
            <div className="flex items-center gap-4">

                {/* Icon with badge */}
                <div className="group relative w-6 h-6">
                    {icon}
                    {/* <span className="absolute left-12 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                        {label}
                    </span> */}

                    {badge > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                            {badge}
                        </span>
                    )}
                </div>

                <span className="hidden md:block text-sm font-medium">{label}</span>
            </div>
        </div>
    );
};

export default Sidebar;