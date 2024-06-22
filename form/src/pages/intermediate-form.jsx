import React from "react";
import Background2 from "../component/backgrond-2";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function IntermediateForm() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [mobile, setMobile] = useState("");
    const [position, setPosition] = useState("none");
    const [show, setShow] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState(new Map());
    const [submit, setSubmit] = useState(false);
    const [experience, setExperience] = useState(0)
    const [url, setUrl] = useState("")
    const [managerexp, setManagerexp] = useState("")
    const [interviewdate, setInterviewdate] = useState(new Date())
    const [errors, setErrors] = useState({
        name: "",
        mail: "",
        number: "",
        exp: "",
        url: "",
        magexp: "",
        skill: "",
        position: "",
        date: "",
    });
    const skills = [
        "JavaScript", "CSS", "HTML", "Python", "Java", "C++", "React", "Angular", "Node.js", "SQL", "NoSQL", "Git", "Docker", "TypeScript"
    ];
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


    const validate = (d) => {
        const newErrors = {
            name: "",
            mail: "",
            number: "",
            exp: "",
            url: "",
            magexp: "",
            skill: "",
            position: "",
            date: "",
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
        if ((d === "mobile" || d === "all") && (mobile.length < 10 || mobile.length > 10)) {
            newErrors.number = "Invalid Mobile Number"
        }
        if ((position === "developer" || position === "designer") && (d === "exp" || d === "all") && experience < 0) {
            newErrors.exp = "invalid number";
        }
        if (position === "designer" && (d === "url" || d === "all") && !isurlcorrect(url)) {
            newErrors.url = "invalid url";
        }
        if (position === "manager" && (d === "magexp" || d === "all") && managerexp.length === 0) {
            newErrors.magexp = "Experience Required";
        }
        // console.log(selectedSkills.size)
        if ((d === "all") && selectedSkills.size === 0) {
            newErrors.skill = "No skills selected"
        }
        if ((d === "all") && (position === "none" || position === "")) {
            newErrors.position = "Required field";
        }
        const currdate = new Date();
        const newdate = new Date(interviewdate); 
        const timeDiff = newdate.getTime() - currdate.getTime();

        if (d === "all" && (timeDiff<0)) {
            newErrors.date = "invalid date";
        }



        setErrors(newErrors)
    }
    const ismailcorrect = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const isurlcorrect = (url) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };
    const toggleSkill = (skill) => {
        setSelectedSkills((pre) => {
            const latest = new Map(pre);
            if (latest.has(skill)) {
                latest.delete(skill);
            } else {
                latest.set(skill, true);
            }
            return latest;
        });
    };
    return (
        <div className="w-[100vw] bg-[#6BB77B] bg-opacity-70 flex flex-row h-screen  ">
            <Background2 />
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
                            <label className="text-[#D76F30] text-xl capitalize">phone number : </label>
                            {mobile}
                            <br />
                            <label className="text-[#D76F30] text-xl capitalize" >position : </label>
                            {position}
                            <br />
                            {
                                (position === "developer" || position === "designer") && (
                                    <>
                                        <label className="text-[#D76F30] text-xl capitalize">experience years</label>
                                        {experience}
                                        <br />
                                    </>
                                )
                            }
                            {
                                (position === "designer") && (
                                    <>
                                        <label className="text-[#D76F30] text-xl capitalize">Portfolio url</label>
                                        {url}
                                        <br />
                                    </>
                                )
                            }
                            {
                                (position === "manager") && (
                                    <>
                                        <label className="text-[#D76F30] text-xl capitalize">Management experience :</label>
                                        {managerexp}
                                        <br />
                                    </>
                                )
                            }
                            <label className="text-[#D76F30] text-xl capitalize" >skills : </label>
                            <ul>
                                {Array.from(selectedSkills.entries()).map(([key, value]) => (
                                    <li key={key}>{skills[key]}</li>
                                ))}
                            </ul>

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
                                        <label>Phone Number <span className="text-red-500">*</span></label><br />
                                        <input
                                            onChange={(e) => setMobile(e.target.value)}
                                            onBlur={() => validate("mobile")}
                                            placeholder="Enter Your Mobile Number"
                                            type="number" className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border" />
                                        {errors.number && (<div className="text-red-500">*{errors.number}</div>)}

                                    </div>
                                    <div className="h-24">
                                        <label>Position <span className="text-red-500">*</span></label><br />
                                        <select onBlur={() => validate("pos")}
                                            onChange={(e) => setPosition(e.target.value)}
                                            value={position} className="rounded-lg  p-4 text-semibold text-black w-[80%] outline-none border" id="">
                                            <option disabled hidden value="none">Choose your Position</option>
                                            <option value="developer">Developer</option>
                                            <option value="designer">Designer</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                        {errors.position && (<div className="text-red-500">*{errors.position}</div>)}
                                    </div>
                                    <AnimatePresence>
                                        {
                                            (position === "developer" || position === "designer") &&
                                            (
                                                <motion.div initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: .5 }}
                                                    exit={{ opacity: 0 }}
                                                    className="transition-all duration-700">
                                                    <label>Experience <span className="text-red-500">*</span></label><br />
                                                    <input placeholder="Enter your years of experience" value={experience}
                                                        onChange={(e) => setExperience(e.target.value)}
                                                        onBlur={() => validate("exp")}
                                                        type="Number" className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border" />
                                                    {errors.exp && (<div className="text-red-500">*{errors.exp}</div>)}

                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {
                                            (position === "designer") &&
                                            (
                                                <motion.div initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: .5 }}
                                                    exit={{ opacity: 0 }}
                                                    className="transition-all duration-700">
                                                    <label>Portfolio URL <span className="text-red-500">*</span></label><br />
                                                    <input
                                                        onChange={(e) => setUrl(e.target.value)}
                                                        onBlur={() => validate("url")}
                                                        placeholder="Enter a valid URL"
                                                        type="text" className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border" />
                                                    {errors.url && (<div className="text-red-500">*{errors.url}</div>)}
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        {
                                            (position === "manager") &&
                                            (
                                                <motion.div initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: .5 }}
                                                    exit={{ opacity: 0 }}
                                                    className="transition-all duration-700">
                                                    <label>Management Experience <span className="text-red-500">*</span></label><br />
                                                    <input onChange={(e) => setManagerexp(e.target.value)}
                                                        onBlur={() => validate("magexp")}
                                                        placeholder="Share Your Experience!"
                                                        type="text" className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border" />
                                                    {errors.magexp && (<div className="text-red-500">*{errors.magexp}</div>)}

                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                    <motion.div
                                        transition={{ duration: 0.3 }}
                                    >
                                        <label>Skills <span className="text-red-500">*</span></label><br />
                                        <div className="grid grid-cols-6 gap-2 w-[100%]">
                                            {skills.map((skill, index) => (
                                                <div onClick={() => toggleSkill(index)} className={`bg-[#172D13] p-3 ${selectedSkills.has(index) ? "border-2 border-blue-600" : ""} rounded-lg text-center ${index == 0 || index == (skills.length - 1) ? "col-span-2" : "col-span-1"} overflow-hidden`} key={index}>{skill}</div>
                                            ))}

                                        </div>
                                        {errors.skill && (<div className="text-red-500">*{errors.skill}</div>)}
                                    </motion.div>
                                    <div className="h-20 w-full ">
                                        <DatePicker className="rounded-lg w-full p-3 text-semibold text-black outline-none border" selected={interviewdate} onChange={(date) => setInterviewdate(date)} />
                                        {errors.date && (<div className="text-red-500">*{errors.date}</div>)}
                                    </div>
                                    <motion.button onClick={() => handlesubmit()} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="w-[40%] outline-none rounded-3xl bg-[#D76F30] p-4">
                                        Register
                                    </motion.button>
                                </div>
                            </div>
                            <div className="w-[40%]  flex flex-row gap-8 pb-60">
                                <div className="w-[10%] flex flex-col justify-center gap-4 items-center">
                                    <div className="h-[30%] w-0.5 rounded-xl bg-white"></div>
                                    <p>or</p>
                                    <div className="h-[30%] w-0.5 rounded-xl bg-white"></div>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center pt-20 gap-5">
                                    <p className="text-center text-whttp://localhost:3000/interhite font-semibold text-2xl ">Continue with : </p>
                                    <button onClick={() => alert("Can Be implemented using Firebase API")} className="bg-white w-[60%] outline-none p-2 text-black rounded-3xl hover:bg-[#D76F30] transition-all duration-200 hover:text-white">Google</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}