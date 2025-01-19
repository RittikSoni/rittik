import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const OpenSourceItem = ({ OpenSourceItem }) => {
  return (
    <motion.div
      key={OpenSourceItem.id}
      className="mx-4 relative bg-white shadow-lg shadow-cyan-500 hover:shadow-cyan-600 rounded-lg p-6 hover:shadow-xl transition group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: OpenSourceItem.id * 0.1 }}
    >
      {/* Glassy Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-500 opacity-0 group-hover:opacity-20 transition duration-300 pointer-events-none cursor-progress" />

      {/* Content */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {OpenSourceItem.name}
      </h2>
      <p className="text-gray-600 mb-4">{OpenSourceItem.description}</p>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        {OpenSourceItem.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>

      <div className="flex space-x-4">
        <Link
          href={OpenSourceItem.links.pub}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="px-4 py-2 bg-cyan-500 text-white rounded-md shadow hover:bg-teal-500 transition">
            View on Pub.dev
          </p>
        </Link>
        <Link
          href={OpenSourceItem.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300 transition">
            View on GitHub
          </p>
        </Link>
      </div>

      {/* Glassy Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500 rounded-lg transition duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default OpenSourceItem;
