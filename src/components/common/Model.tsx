import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './customize.css';

export default function Model({ visible, onClose, item }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (visible) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [visible]);

    if (!item) {
        return null;
    }

    return (
        <AnimatePresence>
            {visible && (
                <dialog ref={dialogRef} className="modal">
                    <motion.div 
                        className="modal-box w-5xl hiddenScrollbar"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ type: "spring", duration: 0.2 }}
                    >
                        <img 
                            src={item.coverImage} 
                            alt={item.title} 
                            className="max-w-full object-cover aspect-[4/3] rounded-md mb-4" 
                        />
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p>{item.author || "No author available"}</p>
                        <p>{item.content || "No description available"}</p>

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={onClose}>Close</button>
                        </div>
                    </motion.div>
                </dialog>
            )}
        </AnimatePresence>
    );
}
