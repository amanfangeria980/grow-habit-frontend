import { FaHome, FaUser, FaCog } from "react-icons/fa";

const VerticalNavbar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-gray-800 flex flex-col items-center py-4 space-y-6">
      {/* Icon 1: Home */}
      <button
        className="text-gray-400 hover:text-blue-400 focus:text-blue-500"
        aria-label="Home"
      >
        Form Reflections 
      </button>

      {/* Icon 2: User */}
      <button
        className="text-gray-400 hover:text-blue-400 focus:text-blue-500"
        aria-label="User"
      >
        Habit Dashboard 
      </button>

      {/* Icon 3: Settings */}
      <button
        className="text-gray-400 hover:text-blue-400 focus:text-blue-500"
        aria-label="Settings"
      >
        Two pointer status 
      </button>
    </div>
  );
};

export default VerticalNavbar;
