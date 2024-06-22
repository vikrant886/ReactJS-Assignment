import React from "react";
import { motion } from "framer-motion";
import boy from "../component/boy.png"
export default function Background2() {
    return (
        <div className="w-[40%] bg-[#172D13] pl-12 flex flex-col gap-6 items-start justify-center">
            <img src={boy} alt="" />
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
                Become ,
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
                    duration: 0.5, delay: 0.2
                }}
                className="text-6xl font-light">
                A part of our
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
                ADVENTURE !
            </motion.p>
        </div>
    )
}