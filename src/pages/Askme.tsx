import { useState, useRef } from "react";
// import Search from "../components/Search";
import Search from "../components/Chat/Search";
import Sidebar from "../components/Sidebar";
import { Analytics } from "@vercel/analytics/react";

const Askme = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  // Explicitly type the searchRef to avoid TypeScript errors
  const searchRef = useRef<{ handleSubmit: (query: string) => void } | null>(null);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prev;
    });
  };

  const handleProjectClick = (query: string) => {
    if (searchRef.current?.handleSubmit) {
      searchRef.current.handleSubmit(query);
    }
  };

  return (
    <div className="flex overflow-hidden font-relative bg-white bg-opacity-50">
      <Analytics />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onProjectClick={handleProjectClick}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-40" : "md:ml-20"
        } ml-0`}
      >
        <main className="flex-1 flex items-center justify-center px-4 md:px-5">
          <div className="w-full max-w-3xl">
            <Search ref={searchRef}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Askme;
