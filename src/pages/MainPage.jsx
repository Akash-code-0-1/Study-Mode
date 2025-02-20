import { useState } from "react";
import RightPanel from '../components/RightPanel';
import profileImage from '../assets/profile.jpeg';

const MainPage = () => {

    const [folders, setFolders] = useState({
        Python_Practice: ["ListPractice.py", "String_practice.py", "set_practice.py"],
        DIU: ["report.docx", "thesis.pdf"],
        Software_Project: ["app.tsx", "config.json"],
        Problem_Solving: ["solution.cpp", "algorithm.java"],
        CPlusPlus: ["main.cpp", "library.hpp"],
        React_Notes: ["notes.md", "components.tsx"]
    });
    
    const [activeFolder, setActiveFolder] = useState(null);
    const [openFiles, setOpenFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [fileContents, setFileContents] = useState({});

    const handleOpenFolder = (folder) => {
        setActiveFolder(folder);
    };

    const handleOpenFile = (file) => {
        if (!openFiles.includes(file)) {
            setOpenFiles([...openFiles, file]);
        }
        setActiveFile(file);
        setFileContents((prev) => ({ ...prev, [file]: prev[file] || "" }));
    };

    const handleCreateFolder = () => {
        const folderName = prompt("Enter folder name:");
        if (folderName && !folders[folderName]) {
            setFolders((prev) => ({ ...prev, [folderName]: [] }));
        }
    };

    const handleCreateFile = () => {
        if (!activeFolder) {
            alert("Select a folder first.");
            return;
        }
        const fileName = prompt("Enter file name with extension:");
        if (fileName) {
            setFolders((prev) => ({
                ...prev,
                [activeFolder]: [...prev[activeFolder], fileName]
            }));
        }
    };

    const handleSaveFile = () => {
        if (activeFile) {
            alert(`${activeFile} saved successfully!`);
        }
    };



    return (

        
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white p-4 flex flex-col">
                <div className="flex items-center space-x-3 flex-col">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="rounded-full"
                    />
                    <div>
                        <h2 className="text-lg font-bold">Tanvir Ahmed</h2>
                        <button className="text-xs bg-gray-700 px-2 py-1 rounded mt-1">
                            Switch to JuNNo
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <button className="bg-green-500 p-2 rounded w-full mb-2" onClick={handleCreateFolder}>📁 New Folder</button>
                    <button className="bg-blue-500 p-2 rounded w-full" onClick={handleCreateFile}>📄 New File</button>
                </div>

                <nav className="mt-6">
                    <h3 className="text-sm font-semibold">Your files and folders</h3>
                    {Object.keys(folders).map((folder) => (
                        <div key={folder}>
                            <button className="text-sm font-bold mt-2" onClick={() => handleOpenFolder(folder)}>📂 {folder}</button>
                            {activeFolder === folder && (
                                <ul className="ml-4">
                                    {folders[folder].map((file) => (
                                        <li key={file} className="text-sm cursor-pointer" onClick={() => handleOpenFile(file)}>
                                            📄 {file}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>


            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 flex flex-col">
                <div className="bg-blue-800 text-white p-2 flex space-x-4 rounded-md overflow-x-auto">
                    {openFiles.map((file, index) => (
                        <div key={file} className="flex items-center space-x-2">
                            <span
                                className={`text-sm font-bold cursor-pointer ${activeFile === file ? 'text-yellow-400' : 'text-white'}`}
                                onClick={() => setActiveFile(file)}
                            >
                                {file}
                            </span>
                            <button
                                className="text-white bg-transparent border-0 p-1 hover:text-red-500"
                                onClick={() => {
                                    const newOpenFiles = openFiles.filter(f => f !== file);
                                    setOpenFiles(newOpenFiles);

                                    // If the closed file was the active one, set the previous one as active
                                    if (activeFile === file) {
                                        const newActiveFile = newOpenFiles[newOpenFiles.length - 1] || null; // Get last file or null if no files left
                                        setActiveFile(newActiveFile);
                                    }
                                }}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>


                <div className="mt-4 bg-white flex-1 rounded-md shadow-md p-4">
                    {activeFile ? (
                        <div>
                            <h3 className="text-lg font-semibold">{activeFile}</h3>
                            <textarea
                                className="w-full h-64 p-2 border"
                                value={fileContents[activeFile] || ""}
                                onChange={(e) => setFileContents({ ...fileContents, [activeFile]: e.target.value })}
                            />
                            <button className="mt-2 bg-blue-500 p-2 rounded text-white" onClick={handleSaveFile}>
                                Save {activeFile}
                            </button>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Open a file to view and edit.</p>
                    )}
                </div>
            </main>

            {/* Right Panel */}

            <RightPanel />


            {/* <aside className="w-64 bg-gradient-to-b from-blue-500 to-blue-800 text-white p-4 flex flex-col">

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

                <div className="mb-4 border-b pb-2">
                    <h3 className="text-lg font-bold">Eye On</h3>
                    <ul>
                        {eyeOn.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Chat</h3>
                    <div className="bg-white text-black p-2 rounded-md h-40 overflow-y-auto">
                        {chatMessages.map((msg, index) => <p key={index}>{msg}</p>)}
                    </div>
                    <input className="w-full p-2 mt-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                    <button className="w-full bg-blue-700 p-2 mt-2 rounded" onClick={() => setChatMessages([...chatMessages, newMessage])}>Send</button>
                </div>
            </aside> */}
        </div>
    );
};

export default MainPage;
