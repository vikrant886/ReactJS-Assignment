import React, { useEffect, useRef } from "react";
import './style.css'

export default function FirstBg({children}){
    const ref = useRef(null);

    return (
        <div ref={ref} className="w-full h-full bg-red-50 fixed flex items-center justify-center">
                {children}
            <div className="noise">
            </div>
        </div>
    )
}
