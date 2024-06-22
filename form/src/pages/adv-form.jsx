import React from "react";
import Background3 from "../component/background-3";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../component/style.css"
import { Displaydata } from "../component/displaydata";
import { Advcontext } from "../context/advcontext"
export default function Advform() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [topic, setTopic] = useState("none");
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([])

    const [errors, setErrors] = useState({
        name: "",
        mail: "",
        feedback: "",

    });
    useEffect(() => {
        const hasErrors = Object.values(errors).some(error => error !== "");

        if (!hasErrors && show) {
            setSubmit(true);
            console.log("Form submitted successfully!");
        } else {
            console.log("Fix required fields to submit");
            setShow(false)
        }
    }, [errors, show]);
    const handlesubmit = () => {
        validate("all");
        setShow(true);
    };
    useEffect(() => {
        if (topic === "education") {
            setLoading(true);
            axios.get("https://6676c281145714a1bd72b376.mockapi.io/education")
                .then((response) => {
                    console.log(response)
                    setData(response.data);
                })
                .then(() => {
                    setLoading(false)
                })
        }
        else if (topic == "technology" || topic == "health") {
            setLoading(true);
            axios.get(`https://6676bb70145714a1bd729d21.mockapi.io/${topic}`)
                .then((response) => {
                    console.log(response)
                    setData(response.data);
                })
                .then(() => {
                    setLoading(false)
                })
        }
    }, [topic])
    const validate = (d) => {
        const newErrors = {
            name: "",
            mail: "",
            feedback: "",
        };
        if ((d === "name" || d === "all") && name.length == 0) {
            newErrors.name = "Name Required"
        }
        if ((d === "mail" || d === "all") && mail.length == 0) {
            newErrors.mail = "Mail Required"
        }
        else if ((d === "mail" || d === "all") && !ismailcorrect(mail)) {
            newErrors.mail = "Invalid Mail"
        }
        if ((d === "feedback" && feedback.length < 50)) {
            newErrors.feedback = "Must be at least 50 characters"
        }



        setErrors(newErrors)
    }
    const ismailcorrect = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    return (
        <div className="w-[100vw] bg-[#6BB77B] bg-opacity-70 flex flex-row h-screen  ">
            <Advcontext.Provider
                value={{
                    valid, setValid,
                    answers, setAnswers
                }}
            >
                <Background3 />
                <div className="w-[60%] pl-20 pt-8 pb-4 overflow-y-scroll ">
                    {
                        submit ? (
                            <div className="pl-20">
                                <label className="text-[#D76F30] text-xl capitalize">Name : </label>
                                {name}
                                <br />
                                <label className="text-[#D76F30] text-xl capitalize">email : </label>
                                {mail}
                                <br />
                                {
                                    data.map((data, index) => (
                                        <>
                                            <div className="text-[#D76F30]">{data.question}</div>
                                            <div>{answers[data.question]}</div>
                                        </>

                                    ))
                                }
                                <label className="text-[#D76F30] text-xl capitalize">Feedback</label>
                                {feedback}

                            </div>
                        ) : (
                            <div className="flex flex-row w-full">
                                <div className="w-[60%] ">
                                    <div className="flex flex-col gap-6 pb-12" >
                                        <div className="h-24">
                                            <label>Full Name <span className="text-red-500">*</span></label><br />
                                            <input placeholder="What is your name ?"
                                                onBlur={() => { validate("name") }}
                                                onChange={(e) => setName(e.target.value)}
                                                type="text" className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border" />
                                            {errors.name && (<div className="text-red-500">*{errors.name}</div>)}
                                        </div>
                                        <div className="h-24">
                                            <label>Emai Id <span className="text-red-500">*</span></label><br />
                                            <input onChange={(e) => setMail(e.target.value)}
                                                onBlur={() => { validate("mail") }}
                                                placeholder="Tell us your Email Id"
                                                type="mail" className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border" />
                                            {errors.mail && (<div className="text-red-500">*{errors.mail}</div>)}
                                        </div>
                                        <div className="h-24">
                                            <label>Survey Topic <span className="text-red-500">*</span></label><br />
                                            <select onBlur={() => validate("pos")}
                                                onChange={(e) => setTopic(e.target.value)}
                                                value={topic} className="rounded-lg  p-4 text-semibold text-black w-[80%] outline-none border" id="">
                                                <option disabled hidden value="none">Which topic interests you?</option>
                                                <option value="technology">Technology</option>
                                                <option value="health">health</option>
                                                <option value="education">Education</option>
                                            </select>
                                            {errors.position && (<div className="text-red-500">*{errors.position}</div>)}
                                        </div>
                                        {
                                            loading ? (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center" >
                                                    <div className="loader">
                                                        <div className="loader-square"></div>
                                                        <div className="loader-square"></div>
                                                        <div className="loader-square"></div>
                                                        <div className="loader-square"></div>
                                                        <div className="loader-square"></div>
                                                        <div className="loader-square"></div>
                                                        <div className="loader-square"></div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                data ? (
                                                    <div>
                                                        <Displaydata data={data} topic={topic} />
                                                    </div>
                                                ) :
                                                    (
                                                        <div>

                                                        </div>
                                                    )
                                            )
                                        }
                                        <div className="h-36">
                                            <label>Feedback<span className="text-red-500">*</span></label><br />
                                            <input onChange={(e) => setFeedback(e.target.value)}
                                                onBlur={() => { validate("feedback") }}
                                                placeholder="Tell us what more we can do?"
                                                type="textarea" className="rounded-lg p-3 text-semibold text-black w-[80%] h-24 outline-none border" />
                                            {errors.feedback && (<div className="text-red-500">*{errors.feedback}</div>)}
                                        </div>

                                        <motion.button onClick={() => handlesubmit()} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="w-[40%] outline-none rounded-3xl bg-[#D76F30] p-4">
                                            Submit
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Advcontext.Provider>
        </div>
    )
}