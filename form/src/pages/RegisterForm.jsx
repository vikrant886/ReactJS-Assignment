import React, { useEffect, useState } from "react";
import FirstBg from "../component/background1";
import tv from "../component/tv.png";
import { Check, X } from "lucide-react";
export default function Register() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [age, setAge] = useState("");
    const [gueststatus, setGueststatus] = useState("guest");
    const [guestname, setGuestname] = useState("");
    const [show, setShow] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        mail: "",
        age: "",
        guestname: ""
    });

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 2300);
    }, []);


    const handleSubmit = (d) => {
        let valid = true;
        const newErrors = {
            name: "",
            mail: "",
            age: "",
            guestname: ""
        };

        if (name.trim() === "") {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (mail.trim() === "") {
            newErrors.mail = "Email is required";
            valid = false;
        } else if (!isValidEmail(mail)) {
            newErrors.mail = "Email is not valid";
            valid = false;
        }

        if (age.trim() === "" || isNaN(Number(age)) || Number(age) <= 0) {
            newErrors.age = "Age must be a number greater than 0";
            valid = false;
        }

        if (gueststatus === "true" && guestname.trim() === "") {
            newErrors.guestname = "Guest Name is required";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            setSubmit(true);
        } else {
            console.log("Form has errors.");
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <>
            <FirstBg>

                {
                    submit ? (
                        <div className={`w-[35%] ${show ? "opacity-1" : "opacity-0"} rounded-xl z-50 ${gueststatus === "true" ? "h-[75%]" : "h-[70%]"} transition-all duration-400 bg-[#000000] bg-opacity-50 flex pl-20 flex-col gap-12 pt-12`}>
                            <p>
                                <span className="text-[#5AFE73]">Name : </span>
                                <span>{name}</span>
                            </p>
                            <p>
                                <span className="text-[#5AFE73]">Mail : </span>
                                <span>{mail}</span>
                            </p>
                            <p>
                                <span className="text-[#5AFE73]">age : </span>
                                <span>{age}</span>
                            </p>
                            <p>
                                <span className="text-[#5AFE73]">Attending with guest : </span>
                                <span>{gueststatus}</span>
                            </p>
                            {
                                guestname.length > 0 ? (
                                    <p>
                                        <span className="text-[#5AFE73]">Name : </span>
                                        <span>{name}</span>
                                    </p>
                                ) : null
                            }
                            <button
                            onClick={()=>{setSubmit(false)}}
                             className="p-4 w-[90%] hover:shadow-blue-800 hover:shadow-md rounded-md outline-none bg-black text-[#F8F8F8] text-xl">
                                RE-REGISTER
                            </button>
                        </div>
                    ) : (
                        <div className={`w-[35%] ${show ? "opacity-1" : "opacity-0"} rounded-xl z-50 ${gueststatus === "true" ? "h-[80%]" : "h-[75%]"} transition-all duration-400 bg-[#000000] bg-opacity-50 flex items-center flex-col gap-8 pt-4`}>
                            <p className="flex justify-center text-4xl text-[#5AFE73]">REGISTER</p>
                            <div className="w-[90%] flex flex-col gap-6">
                                <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter your Name"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        className="p-4 w-full rounded-md outline-none bg-black text-gray-400 font-semibold"
                                    />
                                    <div className="w-[5%] flex justify-end">
                                        {errors.name ? (
                                            <div>
                                                <X className="text-red-500" />
                                            </div>
                                        ) : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your Email"
                                        value={mail}
                                        onChange={(e) => { setMail(e.target.value) }}
                                        className="p-4 w-full rounded-md outline-none bg-black text-gray-400 font-semibold"
                                    />
                                    <div className="w-[5%] flex justify-end">
                                        {errors.mail ? (
                                            <div>
                                                <X className="text-red-500" />
                                            </div>
                                        ) : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                    <input
                                        type="number"
                                        placeholder="Enter your Age"
                                        value={age}
                                        onChange={(e) => { setAge(e.target.value) }}
                                        className="p-4 w-full rounded-md outline-none bg-black text-gray-400 font-semibold"
                                    />
                                    <div className="w-[5%] flex justify-end">
                                        {errors.age ? (
                                            <div>
                                                <X className="text-red-500" />
                                            </div>
                                        ) : null
                                        }
                                    </div>
                                </div>
                                <select
                                    value={gueststatus}
                                    onChange={(e) => setGueststatus(e.target.value)}
                                    className="p-4 w-[95%] rounded-md pr-4 outline-none bg-black text-gray-400 font-semibold"
                                >
                                    <option disabled value="guest">Attending with guest?</option>
                                    <option value="true">YES</option>
                                    <option value="false">NO</option>
                                </select>
                                {gueststatus === "true" && (
                                    <>
                                        <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter Guest Name"
                                                value={guestname}
                                                onChange={(e) => setGuestname(e.target.value)}
                                                className="p-4 w-full rounded-md outline-none bg-black text-gray-400 font-semibold"
                                            />
                                            <div className="w-[5%] flex justify-end">
                                                {errors.guestname ? (
                                                    <div>
                                                        <X className="text-red-500" />
                                                    </div>
                                                ) : null
                                                }
                                            </div>
                                        </div>
                                    </>
                                )}
                                <button onClick={handleSubmit} className="p-4 hover:shadow-blue-800 hover:shadow-md rounded-md outline-none bg-black text-[#F8F8F8] text-xl">
                                    Register
                                </button>
                            </div>
                        </div>
                    )
                }
            </FirstBg>
        </>
    );
}
