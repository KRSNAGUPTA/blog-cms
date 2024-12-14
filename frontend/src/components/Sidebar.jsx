import { motion } from 'framer-motion'
import { X } from 'lucide-react'



export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 w-64 bg-indigo-700 text-white p-6 shadow-lg z-20"
    >
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-white hover:text-indigo-200 focus:outline-none"
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <nav>
        <ul className="space-y-4">
          <li><a href="#" className="block py-2 hover:text-indigo-200">Home</a></li>
          <li><a href="#" className="block py-2 hover:text-indigo-200">Categories</a></li>
          <li><a href="#" className="block py-2 hover:text-indigo-200">Popular Posts</a></li>
          <li><a href="#" className="block py-2 hover:text-indigo-200">About Us</a></li>
          <li><a href="#" className="block py-2 hover:text-indigo-200">Contact</a></li>
        </ul>
      </nav>
    </motion.div>
  )
}

