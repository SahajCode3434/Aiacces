"use client"

import type React from "react"

import { useState } from "react"
import { Menu, User, Settings, LogOut, CreditCard } from "lucide-react"

interface HeaderProps {
  isLoggedIn: boolean
  userName: string
  onLogin: () => void
  onLogout: () => void
}

export default function Header({ isLoggedIn, userName, onLogin, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="flex justify-between items-center">
        {/* User Menu (Left) */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 text-white hover:bg-gray-800/80 transition-all duration-300"
            >
              <Menu className="w-4 h-4" />
              <span className="text-sm font-medium">{userName}</span>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-gray-700/50">
                  <p className="text-sm text-gray-300">godgamer7897@gmail.com</p>
                  <div className="mt-2">
                    <div className="text-xs text-gray-400 mb-1">Messages Left</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-full"></div>
                      </div>
                      <span className="text-xs text-white">3/3</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Usage resets in 1 day</p>
                  </div>
                </div>

                <div className="p-2">
                  <MenuItem icon={<User className="w-4 h-4" />} text="Profile" />
                  <MenuItem icon={<Settings className="w-4 h-4" />} text="Settings" />
                  <MenuItem icon={<CreditCard className="w-4 h-4" />} text="Pricing" />
                  <div className="border-t border-gray-700/50 my-2"></div>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>

                <div className="p-3 border-t border-gray-700/50">
                  <button className="w-full bg-white text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}

        {/* Auth Buttons (Right) */}
        {!isLoggedIn && (
          <div className="flex gap-3">
            <button
              onClick={onLogin}
              className="px-6 py-2 text-sm font-medium text-white bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-700/80 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={onLogin}
              className="px-6 py-2 text-sm font-medium text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" onClick={() => setIsMenuOpen(false)} />
      )}
    </header>
  )
}

function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 rounded-md transition-colors">
      {icon}
      {text}
    </button>
  )
}
