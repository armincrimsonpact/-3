"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface NavigationItemProps {
  href: string
  icon: LucideIcon
  label: string
}

export function NavigationItem({ href, icon: Icon, label }: NavigationItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <motion.div
        className={`
          relative flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group cursor-pointer
          ${
            isActive
              ? "bg-gradient-to-r from-teal-500/20 to-teal-600/10 text-teal-400 border border-teal-500/30 shadow-[0_0_15px_rgba(0,194,176,0.3)]"
              : "text-gray-400 hover:bg-teal-500/10 hover:text-teal-400 hover:shadow-[0_0_15px_rgba(0,194,176,0.2)]"
          }
        `}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-teal-400 to-teal-600 rounded-r-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateY(-50%)" }}
          />
        )}

        <Icon
          size={20}
          className={`
            transition-all duration-300 
            ${isActive ? "scale-110 text-teal-400" : "group-hover:scale-110 group-hover:text-teal-400"}
          `}
        />
        <span className="font-medium">{label}</span>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent rounded-lg -z-10"
          animate={{
            opacity: isActive ? [0.3, 0.5, 0.3] : 0,
          }}
          transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
        />
      </motion.div>
    </Link>
  )
}
