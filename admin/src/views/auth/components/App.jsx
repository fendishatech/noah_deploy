import React, { useState } from "react";
import {
  MenuIcon,
  XIcon,
  UserIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Disclosure, Transition } from "@headlessui/react";

const navLinks = [
  { name: "Dashboard", icon: <HomeIcon />, href: "#" },
  // Add more links here
];

const userMenu = [
  { name: "Profile settings", icon: <CogIcon />, href: "#" },
  { name: "Logout", icon: <LogoutIcon />, href: "#" },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Disclosure as="nav" className="md:hidden">
        {({ open }) => (
          <>
            <div className="fixed inset-0 flex z-40">
              <Transition
                show={open}
                as={React.Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0" aria-hidden="true">
                  <div
                    className="absolute inset-0 bg-gray-600 opacity-75"
                    onClick={() => setSidebarOpen(false)}
                  ></div>
                </div>
              </Transition>

              <Transition
                show={open}
                as={React.Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      className="-ml-24 rounded-md text-gray-400 focus:outline-none focus:text-white focus:bg-gray-600"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <nav className="mt-5 px-2 space-y-1">
                      {navLinks.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                        >
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                          <span className="ml-4">{item.name}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </Transition>
            </div>
          </>
        )}
      </Disclosure>

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                    <span className="ml-4">{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <Disclosure as="div" className="relative">
                {({ open }) => (
                  <>
                    <button
                      className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/150"
                        alt=""
                      />
                    </button>
                    <Transition
                      show={open}
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        {userMenu.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Add card components here */}
              </div>

              {/* Table */}
              <div className="my-8">{/* Add table component here */}</div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Your Company
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
