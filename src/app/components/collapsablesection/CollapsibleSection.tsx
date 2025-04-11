import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<Props> = ({ id, title, isOpen, onToggle, children }) => {
  return (
    <div className="border rounded-xl bg-[var(--background-color)] shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 font-semibold text-left hover:bg-[var(--hover-bg)] transition"
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-4 pb-4 text-sm text-[var(--text-color)]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
