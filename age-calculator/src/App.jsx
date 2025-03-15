import { useState } from "react";
import "./index.css";
import calculate from "../src/assets/calculate.png";

function App() {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");
    const [calculatedYears, setCalculatedYears] = useState("--");
    const [calculatedMonths, setCalculatedMonths] = useState("--");
    const [calculatedDays, setCalculatedDays] = useState("--");
    const [error, setError] = useState({
        day: "",
        month: "",
        year: "",
    });

    const currentYear = new Date().getFullYear();

    const daysInMonth = {
        January: 31,
        February: 29,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31,
    };

    const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const validDate = () => {
        if (!year.trim()) {
            setError({ ...error, year: "Must be in the past" });
        } else if (!month.trim()) {
            setError({ ...error, month: "Must be a valid month" });
        } else if (!date.trim()) {
            setError({ ...error, day: "Must be a valid day" });
        } else {
            setError({ ...error });
        }

        // Check if month and day are within valid ranges
        const dayNum = parseInt(date, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (dayNum > daysInMonth[monthNames[monthNum]]) {
            setError({
                day: `Must be a valid day`,
            });
            return false;
        }

        if (monthNum < 1 || monthNum > 12) {
            setError({
                ...error,
                month: "Must be a valid month",
            });
            return false;
        }

        if (yearNum > currentYear) {
            setError({
                ...error,
                year: `Year must be in the past.`,
            });
            return false;
        }
        setError({ day: "", month: "", year: "" });
        return true;
    };

    const calculateAge = () => {
        if (!validDate()) return;

        const birthDateObj = new Date(`${year}-${month}-${date}`);
        if (isNaN(birthDateObj.getTime())) {
            setError({
                ...error,
                year: "Must be in the past",
                month: "Must be a valid month",
                day: "Must be a valid day",
            });
            return;
        }

        setError({ day: "", month: "", year: "" });

        const today = new Date();
        let years = today.getFullYear() - birthDateObj.getFullYear();
        let months = today.getMonth() - birthDateObj.getMonth();
        let days = today.getDate() - birthDateObj.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setCalculatedDays(days);
        setCalculatedMonths(months);
        setCalculatedYears(years);

        // Clear inputs after calculation
        setYear("");
        setMonth("");
        setDate("");
    };

    return (
        <div className="bg-[#aaa] w-full h-[100vh] flex justify-center items-center max-md:p-8">
            <div className="max-w-[450px] bg-white text-black py-8 px-6 rounded-t-3xl rounded-bl-3xl rounded-br-[10em] max-md:min-w-[150px] max-md:rounded-br-[7em] ">
                <div className="flex gap-4 w-[80%] mb-8 max-md:w-full ">
                    <div className="w-[30%]">
                        <h2
                            className={`font-semibold text-[1rem] mb-1  ${
                                error.day ? "text-red-500" : "text-gray-700"
                            }`}
                        >
                            DAY
                        </h2>
                        <input
                            type="number"
                            className={`border-1 border-gray-400 w-full py-1 pl-1 rounded-sm focus:outline-gray-500 ${
                                error.day
                                    ? "border-red-500 text-red-500 focus:outline-red-500"
                                    : ""
                            }`}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        {error.day && (
                            <p className="text-red-500 text-sm mt-1">
                                {error.day}
                            </p>
                        )}
                    </div>
                    <div className="w-[30%]">
                        <h2
                            className={`font-semibold text-[1rem] mb-1  ${
                                error.month ? "text-red-500" : "text-gray-700"
                            }`}
                        >
                            MONTH
                        </h2>
                        <input
                            type="number"
                            className={`border-1 border-gray-400 w-full py-1 pl-1 rounded-sm focus:outline-gray-500 ${
                                error.month
                                    ? "border-red-500 text-red-500 focus:outline-red-500"
                                    : ""
                            }`}
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        {error.month && (
                            <p className="text-red-500 text-sm mt-1">
                                {error.month}
                            </p>
                        )}
                    </div>
                    <div className="w-[30%]">
                        <h2
                            className={`font-semibold text-[1rem] mb-1  ${
                                error.year ? "text-red-500" : "text-gray-700"
                            }`}
                        >
                            YEAR
                        </h2>
                        <input
                            type="number"
                            className={`border-1 border-gray-400 w-full py-1 pl-1 rounded-sm focus:outline-gray-500 ${
                                error.year
                                    ? "border-red-500 text-red-500 focus:outline-red-500"
                                    : ""
                            }`}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        {error.year && (
                            <p className="text-red-500 text-sm mt-1">
                                {error.year}
                            </p>
                        )}
                    </div>
                </div>

                <div className="border-b-1 border-gray-400 mt-4 relative">
                    <div className="bg-purple-500 p-2 rounded-full absolute top-[-15%] right-0 cursor-pointer max-md:right-[40%] ">
                        <img
                            src={calculate}
                            alt="arrow"
                            onClick={calculateAge}
                            className="w-[2rem]"
                        />
                    </div>
                    <h2 className="text-white">Move Down</h2>
                </div>

                <div className="mt-8">
                    <span className="flex">
                        <h1 className="text-[3rem] font-bold leading-[3.5rem] m-[.5rem] text-purple-700">
                            {calculatedYears}
                        </h1>
                        <h1 className="text-[3rem] font-bold leading-[3.7rem] m-[.5rem]">
                            years
                        </h1>
                    </span>
                    <span className="flex">
                        <h1 className="text-[3rem] font-bold leading-[3.5rem] m-[.5rem] text-purple-700">
                            {calculatedMonths}
                        </h1>
                        <h1 className="text-[3rem] font-bold leading-[3.7rem] m-[.5rem]">
                            months
                        </h1>
                    </span>
                    <span className="flex">
                        <h1 className="text-[3rem] font-bold leading-[3.5rem] m-[.5rem] text-purple-700">
                            {calculatedDays}
                        </h1>
                        <h1 className="text-[3rem] font-bold leading-[3.7rem] m-[.5rem]">
                            days
                        </h1>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default App;
