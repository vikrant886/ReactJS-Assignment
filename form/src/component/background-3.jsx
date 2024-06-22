import React from "react";
import { motion } from "framer-motion";
import boy from "../component/boy.png"
import "./style.css"
export default function Background3() {
    return (
        <div className="w-[40%] bg-[#172D13] pl-12 flex flex-col gap-6 items-start justify-center">
            <motion.p
                initial={{
                    opacity: 0,
                    x: -100
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{
                    duration: 0.5
                }}
                className="text-6xl font-light">
                It's ,
            </motion.p>
            <motion.p
                initial={{
                    opacity: 0,
                    x: +100
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{
                    duration: 0.5, delay: 0.2
                }}
                className="text-6xl font-light">
                Time For A
            </motion.p>
            <motion.p
                initial={{
                    opacity: 0,
                    x: -100
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{
                    duration: 0.5, delay: 0.4
                }}
                className="text-7xl text-[#D76F30] font-light">
                Survey !
            </motion.p>
        </div>
    )
}