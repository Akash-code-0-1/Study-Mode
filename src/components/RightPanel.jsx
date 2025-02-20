import { useState, useEffect } from "react";

const RightPanel = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stopwatchRunning, setStopwatchRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [alarmTime, setAlarmTime] = useState("");
    const [eyeOn, setEyeOn] = useState(["Item 1", "Item 2", "Item 3"]); // Example eyeOn items
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [toDoList, setToDoList] = useState([]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date()); // Update the time every second
        }, 1000);

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, []);

    useEffect(() => {
        let stopwatchInterval;
        if (stopwatchRunning) {
            stopwatchInterval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1); // Increment timer every second
            }, 1000);
        } else {
            clearInterval(stopwatchInterval); // Stop stopwatch when not running
        }
        return () => clearInterval(stopwatchInterval); // Clean up the stopwatch interval
    }, [stopwatchRunning]);

    const handleAlarmCheck = () => {
        const alarmTimeDate = new Date();
        const [hours, minutes] = alarmTime.split(":");
        alarmTimeDate.setHours(hours, minutes, 0);

        if (currentTime.getHours() === alarmTimeDate.getHours() && currentTime.getMinutes() === alarmTimeDate.getMinutes()) {
            alert("Alarm ringing! Time to wake up!"); // Alarm notification
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChatMessages([...chatMessages, newMessage]);
            setNewMessage("");
        }
    };

    useEffect(() => {
        handleAlarmCheck(); // Check alarm every time the time updates
    }, [currentTime, alarmTime]);


    const handleAddToDo = () => {
        const task = prompt("Enter your task for today:");
        if (task) {
            setToDoList((prev) => [...prev, task]);
        }
    };

    return (
        <aside className="w-64 bg-gradient-to-b from-blue-500 to-blue-800 text-white p-4 flex flex-col">
            {/* Clock Section */}
            <div className="mb-4 border-b pb-2 text-center">
                <h3 className="text-lg font-bold">Clock</h3>
                <p className="text-lg">{currentTime.toLocaleTimeString()}</p>
                <div className="flex justify-between mt-2">
                    <button onClick={() => setStopwatchRunning(!stopwatchRunning)} className="bg-green-500 px-2 py-1 rounded">
                        {stopwatchRunning ? "Stop" : "Start"} Stopwatch
                    </button>
                    <button onClick={() => setTimer(0)} className="bg-red-500 px-2 py-1 rounded">Reset</button>
                </div>
                <p>Stopwatch: {timer}s</p>
                <input
                    type="time"
                    onChange={(e) => setAlarmTime(e.target.value)}
                    className="text-black mt-2 p-1 w-full rounded"
                />
                <p>Alarm set for: {alarmTime}</p>
            </div>

            <div className="">
                <h3 className="text-lg font-bold">To Do</h3>
                <button className="bg-yellow-500 p-2 w-full rounded" onClick={handleAddToDo}>+ Add Task</button>
                <ul>
                    {toDoList.map((task, index) => <li key={index}>✅ {task}</li>)}
                </ul>
            </div>

            {/* Eye On Section */}
            <div className="mb-4 border-b pb-2">
                <h3 className="text-lg font-bold">Eye On</h3>
                <ul>
                    {eyeOn.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>

            {/* Chat Section */}
            <div>
                <h3 className="text-lg font-bold">Chat</h3>
                <div className="bg-white text-black p-2 rounded-md h-40 overflow-y-auto">
                    {chatMessages.map((msg, index) => <p key={index}>{msg}</p>)}
                </div>
                <input className="w-full p-2 mt-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <button className="w-full bg-blue-700 p-2 mt-2 rounded" onClick={handleSendMessage}>Send</button>
            </div>
        </aside>
    );
};

export default RightPanel;
