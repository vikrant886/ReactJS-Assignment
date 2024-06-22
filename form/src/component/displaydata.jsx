import React, { useContext, useState } from "react";
import { Advcontext } from "../context/advcontext";

export function Displaydata({ data }) {
    const [ans, setAns] = useState({});
    const { valid, answer, setAnswers } = useContext(Advcontext);
    const [errors,setErrors] = useState({})

    const handleInputChange = (question, answer, type) => {
        if (type === "text" && answer.trim() === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                [question]: "This field is required."
            }));
            return;
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [question]: ""
            }));
        }

        if (type === "number" && answer<0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [question]: "Invalid input"
            }));
            return;
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [question]: ""
            }));
        }

        setAns(prevAnswers => ({
            ...prevAnswers,
            [question]: answer
        }));
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: answer
        }));
    };

    const handleDropdownChange = (question, selectedOption) => {
        if (selectedOption==="") {
            setErrors(prevErrors => ({
                ...prevErrors,
                [question]: "This field is required."
            }));
            return;
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [question]: ""
            }));
        }
        setAns(prevAnswers => ({
            ...prevAnswers,
            [question]: selectedOption
        }));
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: selectedOption
        }));
    };

    return (
        <div className="flex flex-col gap-8">
            {data.map((val, index) => (
                <div key={index}>
                    {val.type === "text" || val.type === "number" ? (
                        <>
                            <label>{val.question} <span className="text-red-500">*</span></label><br />
                            <input
                                placeholder="Your Answer ....."
                                type={val.type}
                                className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border"
                                onChange={(e) => handleInputChange(val.question, e.target.value, val.type)}
                            />
                            {errors[val.question]!="" && <div className="text-red-400">{errors[val.question]}</div>}
                        </>
                    ) : val.type === "dropdown" ? (
                        <>
                            <label>{val.question} <span className="text-red-500">*</span></label><br />
                            <select
                                className="rounded-lg p-3 text-semibold text-black w-[80%] outline-none border"
                                onChange={(e) => handleDropdownChange(val.question, e.target.value)}
                            >
                                <option value="">Select an option</option>
                                {val.options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>{option}</option>
                                ))}
                            </select>
                            {errors[val.question]!="" && <div className="text-red-400">{errors[val.question]}</div>}

                        </>
                    ) : (
                        <div key={index}>Unsupported question type: {val.type}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
