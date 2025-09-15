// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';

const Sidebar = () => (
  // Sidebar with navigation links
  <div className="w-64 h-screen bg-gray-800 p-4 text-gray-200">
    <h2 className="text-2xl font-bold mb-8">Contracts AI</h2>
    <nav className="space-y-2">
      <a href="#" className="block px-4 py-2 rounded-md bg-gray-700">Contracts</a>
      <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-700">Insights</a>
      <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-700">Reports</a>
      <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-700">Settings</a>
    </nav>
  </div>
);

const Topbar = () => (
  // Topbar with user profile
  <header className="flex items-center justify-end h-16 bg-gray-800/50 backdrop-blur-sm px-8">
    <div className="w-10 h-10 bg-gray-600 rounded-full cursor-pointer">
      {/* User profile icon or image */}
    </div>
  </header>
);

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-8">
          <Outlet /> {/* Child pages will render here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;