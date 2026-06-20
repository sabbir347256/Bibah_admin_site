import { Trash2 } from "lucide-react";
import DynamicHeader from "../../../DynamicComponent/DynamicHeader";
import {  useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import config from "../../../utilies/envCongig";
import { useCustomQuery } from "../../../utilies/useCustomQuery";

const AllUser = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("accessToken");

    // const { data: usersResponse, isLoading } = useQuery({
    //     queryKey: ["users"],
    //     queryFn: async () => {
    //         const response = await axios.get(`${config.backendUrl}/user`);
    //         return response.data;
    //     },
    // });

    const { data: usersResponse, isLoading } = useCustomQuery({
        queryKey: ["users"],
        url: `${config.backendUrl}/user`,
    });


    const handleStatusChange = async (userId, newStatus) => {
        try {
            await axios.patch(
                `${config.backendUrl}/user/status/${userId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            queryClient.invalidateQueries(["users"]);
            toast.success(`Status updated to ${newStatus} successfully!`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status.");
        }
    };

    const handleDelete = async (userId) => {
        console.log(userId);
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${config.backendUrl}/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                queryClient.invalidateQueries(["users"]);
                toast.success("User deleted successfully!");
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete user.");
            }
        }
    };

    const tableData = usersResponse?.data || usersResponse || [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="flex justify-between md:items-center flex-col md:flex-row">
                <DynamicHeader
                    mainHeader={"All Users"}
                    subHeaderName={`${tableData.length} total users`}
                />
            </div>
            <div className="bg-[#fffbfb] min-h-screen mt-4 overflow-x-auto w-full px-6">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((user, index) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user?.userID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.contactNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select
                                        value={user.isActive || "active"}
                                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                        className={`px-2 py-1 rounded border text-xs font-semibold uppercase outline-none bg-white ${user.isActive === "ACTIVE"
                                            ? "text-emerald-800 border-emerald-300"
                                            : user.isActive === "INACTIVE" || user.isActive === "INACTIVE"
                                                ? "text-gray-800 border-gray-300"
                                                : "text-amber-800 border-amber-300"
                                            }`}
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                        <option value="BLOCKED">Blocked</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-600 hover:text-red-900 p-1 transition-colors inline-flex items-center"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;