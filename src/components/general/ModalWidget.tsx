
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modal = {
    hidden: { opacity: 0, y: "-50%" },
    visible: { opacity: 1, y: "0%" },
};

const ModalWidget = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
                    >
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-black"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


export default ModalWidget;