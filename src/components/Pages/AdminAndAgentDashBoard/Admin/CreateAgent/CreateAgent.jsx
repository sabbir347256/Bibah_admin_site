import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../../utilies/envCongig";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../../AuthProvider/CreateContext";

const CreateAgent = () => {
    const {token} = useContext(AuthProvider);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);

    const { data: agents = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["agents"],
        queryFn: async () => {
            const response = await axios.get(`${config.backendUrl}/user/all-agents`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                return response.data.data.filter(user => user.role === "AGENT");
            }
            return [];
        }
    });

    const onSubmit = async (data) => {
        setSubmitting(true);

        const defaultData = {
            fullName: data.name,
            email: data.email,
            password: data.password,
            contactNo: data.contactNo,
            nidNo: data.nidNo,
            role: "AGENT",
            religion: "Default",
            birth: "Default",
            gender: "Default",
            profession: "Agent",
        };

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${config.backendUrl}/user/register`,
                defaultData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message || "Agent created successfully!");
                reset();
                refetch();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="px-6 min-h-screen space-y-8">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-700">+</span>
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Add Agent</h2>
                </div>

                <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Agent Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                                placeholder="Write agent name"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Agent Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                                type="email"
                                className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                                placeholder="Write agent email"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Password</label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" }
                                })}
                                type="password"
                                className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Contact No</label>
                            <input
                                {...register("contactNo", { required: "Contact number is required" })}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                                placeholder="01XXXXXXXXX"
                            />
                            {errors.contactNo && <p className="mt-1 text-xs text-red-600">{errors.contactNo.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">NID Number</label>
                            <input
                                {...register("nidNo", { required: "NID number is required" })}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                                placeholder="Write NID number"
                            />
                            {errors.nidNo && <p className="mt-1 text-xs text-red-600">{errors.nidNo.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2.5 font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-gray-400 text-sm w-full md:w-auto"
                        >
                            {submitting ? "Adding..." : "Add Agent"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-700">☰</span>
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Agent List</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50/50">
                                <th className="px-6 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Referral ID</th>
                                <th className="px-6 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                                        Loading agents...
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-red-500">
                                        Failed to load agents.
                                    </td>
                                </tr>
                            ) : agents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                                        No agents available.
                                    </td>
                                </tr>
                            ) : (
                                agents.map((agent) => (
                                    <tr key={agent._id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">{agent.userID || "N/A"}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.fullName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{agent.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">{agent.ownRefarelID || "N/A"}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${agent.isActive === "ACTIVE" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                                                {agent.isActive}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateAgent;