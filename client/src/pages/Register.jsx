import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/users/register", form);
            alert("Registered successfully");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black text-white">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg w-80 space-y-4">
                <h2 className="text-xl font-bold text-center">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 bg-gray-800 rounded"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 bg-gray-800 rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 bg-gray-800 rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="w-full bg-blue-500 py-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;