import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h2 className="text-[30px] font-bold mb-6">Welcome to Dashboard</h2>
            <button
                onClick={() => navigate("/main")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Go to Main Page
            </button>
        </div>
    );
};

export default Dashboard;
