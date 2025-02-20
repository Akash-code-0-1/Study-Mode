import React from "react";

const Sidebar = ({ folders, setFolders, activeFolder, setActiveFolder, openFiles, setOpenFiles, setActiveFile }) => {
  const handleOpenFolder = (folder) => {
    setActiveFolder(folder);
  };

  const handleOpenFile = (file) => {
    if (!openFiles.includes(file)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file);
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

  return (
    <aside className="w-64 bg-blue-900 text-white p-4 flex flex-col">
      <button className="bg-green-500 p-2 rounded w-full mb-2" onClick={handleCreateFolder}>
        📁 New Folder
      </button>
      <button className="bg-blue-500 p-2 rounded w-full" onClick={handleCreateFile}>
        📄 New File
      </button>

      <nav className="mt-6">
        {Object.keys(folders).map((folder) => (
          <div key={folder}>
            <button className="text-sm font-bold mt-2" onClick={() => handleOpenFolder(folder)}>
              📂 {folder}
            </button>
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
  );
};

export default Sidebar;
