import React, { useState } from 'react';
import { AlignLeft, ScrollText, Github, ChevronRight} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onProjectClick: (query: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onProjectClick, isDark,}) => {
  const [mobileOpen, setMobileOpen] = useState(false);


  const projects = [
    {
      name: 'Streamverse',
      description: 'Decentralized Streaming Platform',
      tech: ['Hedera', 'React', 'NodeJS'],
      query: "Tellme about streaming website",
    },
    {
      name: 'Kasirku ERP',
      description: 'Operational System',
      tech: ['Springboot', 'NextJS', 'JSP'],
      query: "Tell me about your ERP website",
    },
    {
      name: 'NLP Model Comparison',
      description: 'IEEE Research on NLP',
      tech: ['BERT-CNN', 'BLSTM', 'BERT-LSTM'],
      query: "Tell me about your research NLP",
    },
  ];

  const navigation = [
    { name: 'Resume', icon: ScrollText, target: '_blank', href: 'https://drive.google.com/file/d/12pnplyUpjn-DUyZiklToR84FioPE1wla/view?usp=sharing' },
    { name: 'Github', icon: Github, target: '_blank', href: 'https://github.com/ferdinandnatnl' },
  ];

  const handleProjectClick = (query : string) => {
    onProjectClick(query);
    setMobileOpen(false);
  };

  return (
    <div>
      {/* Mobile Burger Icon */}
      <div className="fixed top-0 left-4 z-[50] md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          <AlignLeft className="w-6 h-6 mt-10"/>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full border-r transition-all duration-300 ease-in-out z-10 border-black
          ${isOpen ? 'w-[85%] sm:w-64 md:w-52' : 'w-16'}
          ${isOpen ? 'shadow-lg md:shadow-none' : ''}
          hidden md:block
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-16 w-6 h-6 border rounded-full flex items-center justify-center border-black"
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-white' : 'text-gray-600'}`}
          />
        </button>

        <div className="flex flex-col h-full mt-10">
          <div className="p-3 border-b border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isOpen && (
                  <div className="ml-2">
                    <h2 className={`font-semibold text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Marco Davincent</h2>
                    <p className={`text-xs md:text-sm ${isDark ? 'text-[#A1A1A1]' : 'text-gray-500'}`}>Software & AI</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="p-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target || '_self'}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className={`
                  flex items-center rounded-lg mb-1
                  ${isOpen ? 'px-3 py-1.5 space-x-3' : 'justify-center p-1.5'}
                  text-sm md:text-base
                  ${isDark ? 'hover:bg-[#252525] text-white' : 'hover:bg-gray-100 text-gray-700'}
                `}
              >
                <item.icon className="w-5 h-5" />
                {isOpen && <span>{item.name}</span>}
              </a>
            ))}
          </nav>

          {isOpen && (
            <div className="px-3 pt-2 overflow-y-auto">
              <h3 className={`text-xs md:text-sm font-medium mb-2 ${isDark ? 'text-[#A1A1A1]' : 'text-gray-500'}`}>
                Recent Projects
              </h3>
              <div className="divide-y">
                {projects.map((project) => (
                  <div key={project.name} className="py-2 first:pt-0 last:pb-0">
                    <button
                      onClick={() => handleProjectClick(project.query)}
                      className={`w-full text-left p-2 rounded-md transition-colors duration-200
                        ${isDark ? 'hover:bg-[#252525]' : 'hover:bg-gray-100'}`}
                    >
                      <p className="text-xs md:text-sm font-medium mb-1 text-black">
                        {project.name}
                      </p>
                      <p className="text-xs mb-1.5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 ">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-full border-black border-[1px] b"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out z-[50]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDark ? 'bg-black' : 'bg-white'}
          w-[55%] sm:w-60`}
      >
        <div className={`p-3 border-b flex items-center justify-between ${isDark ? 'border-[#252525]' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <img src="/9edcdf8d-d69d-402d-9c0b-e43646659ea6.jpg" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            <div className="ml-3">
              <h2 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Marco Davincent</h2>
              <p className={`text-xs ${isDark ? 'text-[#A1A1A1]' : 'text-gray-500'}`}>Software & AI</p>
            </div>
          </div>
        </div>

        <nav className="p-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.target || '_self'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={`flex items-center rounded-lg mb-1 px-3 py-2 text-sm space-x-3
                ${isDark ? 'text-white hover:bg-[#252525]' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="px-3 pt-2">
          <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-[#A1A1A1]' : 'text-gray-500'}`}>Recent Projects</h3>
          <div className={`divide-y ${isDark ? 'divide-[#252525]' : 'divide-gray-100'}`}>
            {projects.map((project) => (
              <div key={project.name} className="py-2 first:pt-0 last:pb-0">
                <button
                  onClick={() => handleProjectClick(project.query)}
                  className={`w-full text-left p-2 rounded-md 
                    ${isDark ? 'hover:bg-[#252525]' : 'hover:bg-gray-100'}`}
                >
                  <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.name}</p>
                  <p className={`text-xs ${isDark ? 'text-[#A1A1A1]' : 'text-gray-500'}`}>{project.description}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;