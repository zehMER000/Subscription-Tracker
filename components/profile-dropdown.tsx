"use client"

import React, { useState } from "react"
import { User, Settings, LogOut, HelpCircle, Moon, Sun } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function ProfileDropdown() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    alert("Logout functionality would be implemented here")
    setOpen(false)
  }

  const handleSettings = () => {
    // In a real app, you would open settings modal here
    alert("Settings would be implemented here")
    setOpen(false)
  }

  const handleHelp = () => {
    // In a real app, you would open help center here
    alert("Help center would be implemented here")
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 border border-border cursor-pointer hover:border-primary/50 transition-colors">
          <AvatarImage src="" alt="User profile" />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
            JD
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 border-glass-border bg-card"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-foreground font-medium">John Doe</span>
          <span className="text-muted-foreground text-xs font-normal">
            john.doe@example.com
          </span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={handleSettings}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark")
              setOpen(false)
            }}
            className="cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={handleHelp}
            className="cursor-pointer"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}