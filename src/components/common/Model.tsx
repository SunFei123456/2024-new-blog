import React, { useEffect, useRef } from 'react';
import './customize.css'

import { X } from 'react-feather';

export default function Model({ visible, onClose, item }) {
    const dialogRef = useRef(null);
    console.log("visible",visible);
    
    useEffect(() => {
        if (dialogRef.current) {
            if (visible) {
                console.log("显示");
                
                dialogRef.current.showModal();
            } else {
                console.log("关闭");
                dialogRef.current.close();
            }
        }
    }, [visible]);

    if (!item) {
        return null;
    }

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box  w-5xl hiddenScrollbar">
                <div className='absolute top-2 right-2 '>
                    <X onClick={onClose} size={20}></X>
                </div>
                <img src={item.coverImage} alt={item.title} className="max-w-full  object-cover aspect-[4/3] rounded-md  mb-4" />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p>{item.author || "No author available"}</p>
                <p>{item.content || "No description available"}</p>

                <div className="modal-action">
                    <button type="button" className="btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
}
