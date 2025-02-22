import { useState } from "react";

export default function CustomForm() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        
        if (!formData.name || !formData.email || !formData.phone) {
            setMessage("❌ Please fill in all fields.");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:5050/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage("✅ Form submitted successfully!");
                setFormData({ name: "", email: "", phone: "" });
            } else {
                setMessage("❌ Submission failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ Error connecting to server.");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Custom Form</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
}
