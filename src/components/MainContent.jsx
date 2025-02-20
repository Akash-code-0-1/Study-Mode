

const MainContent = ({ openFiles, activeFile, fileContents, setFileContents, setActiveFile, handleSaveFile }) => {
  return (
    <main className="flex-1 p-4">
      <div className="bg-gray-200 p-2 flex space-x-2">
        {openFiles.map((file) => (
          <span key={file} className={`cursor-pointer ${activeFile === file ? 'underline' : ''}`} onClick={() => setActiveFile(file)}>
            {file}
          </span>
        ))}
      </div>
      <div className="mt-4 bg-white p-4 shadow rounded">
        {activeFile ? (
          <>
            <textarea className="w-full h-64 p-2 border" value={fileContents[activeFile] || ""} onChange={(e) => setFileContents({ ...fileContents, [activeFile]: e.target.value })} />
            <button className="mt-2 bg-blue-500 p-2 rounded text-white" onClick={handleSaveFile}>Save</button>
          </>
        ) : (
          <p>Open a file to edit</p>
        )}
      </div>
    </main>
  );
};

export default MainContent;
