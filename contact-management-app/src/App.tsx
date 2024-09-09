// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactPage from './pages/ContactPage';
import ChartsPage from './pages/ChartsPage';
import EditContact from './components/EditContact';
import { FaBars } from 'react-icons/fa';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<ContactPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/edit/:id" element={<EditContact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

// Sidebar Component with Responsive Breakpoints and Auto-Close Functionality
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    // Close the sidebar after clicking a link on small screens
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <div className="lg:hidden p-4">
        <button onClick={toggleSidebar} className="text-gray-800">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block bg-gray-800 text-white flex flex-col p-4 h-screen lg:h-auto lg:min-h-screen transition duration-300 ease-in-out lg:relative absolute z-10 w-64`}
      >
        <h2 className="text-2xl font-bold mb-6">Navigation</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="text-lg hover:bg-gray-700 p-2 rounded transition duration-300"
            onClick={handleLinkClick}
          >
            Contact Page
          </Link>
          <Link
            to="/charts"
            className="text-lg hover:bg-gray-700 p-2 rounded transition duration-300"
            onClick={handleLinkClick}
          >
            Charts & Maps
          </Link>
        </nav>
      </div>
    </>
  );
};

export default App;
