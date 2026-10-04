import { FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useBackendStatus } from "../../hooks/useBackendStatus";

const Navbar = ({ darkMode, setDarkMode, }) => {
    const { isOnline, checking } = useBackendStatus();
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
            <div>
                <h1 className=" text-xl font-bold text-indigo-600">
                    TaskFlow
                </h1>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs">
                <span
                    className={`h-2 w-2 rounded-full ${checking
                        ? "bg-yellow-400"
                        : isOnline
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                />
                <span className="text-slate-600">
                    {checking ? "Checking..." : isOnline ? "API Online" : "API Offline"}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    className="rounded-lg p-2 hover:bg-slate-100">
                    <FiBell size={20} />
                </button>
                <button
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                    className="rounded-lg p-2 hover:bg-slate-100"
                >
                    {darkMode
                        ? <FiSun size={20} />
                        : <FiMoon size={20} />
                    }
                </button>
                <div className=" flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                    NK
                </div>
            </div>
        </header>
    );
};

export default Navbar;