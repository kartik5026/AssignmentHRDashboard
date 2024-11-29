import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Pagination from "./Pagination";

function People() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const items = users.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    function paginate(number) {
        setCurrentPage(number);
    }

    useEffect(() => {
        fetchDataFromBackend();
    }, []);

    async function fetchDataFromBackend() {
        try {
            const res = await axios.get("https://assignmenthrdashboard.onrender.com/getData", {
                withCredentials: true,
            });
            const userData = res.data;
            if (userData.message === "failed") {
                setUsers([]);
            } else {
                setTotalUsers(userData.length);
                setUsers(userData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setUsers([]);
        }
    }

    async function deleteUser(username) {
        try {
            await axios.post("https://assignmenthrdashboard.onrender.com/delete", { username });
            setUsers((prevUsers) => prevUsers.filter(user => user.first_name !== username)); // Remove the deleted user from the state
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    async function handleChange(e) {
        const val = e.target.value;
        const res = await axios.post("https://assignmenthrdashboard.onrender.com/search", { val });
        const foundUsers = await res.data;
        if (foundUsers.length > 0) {
            setUsers(foundUsers);
        } else {
            setUsers([]);
        }
    }

    if (users.length === 0) {
        return (
            <>
                <h1 className="text-red-600 font-thin text-3xl">
                    Access Denied. You need admin access to log in.
                </h1>
            </>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-lg font-semibold">Team Members</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Search"
                        className="p-2 mr-3 border border-gray-300 w-full sm:w-64 mb-2 sm:mb-0"
                    />
                    <Link to={"/addNewMember"}>
                        <button className="bg-blue-800 text-white p-2 px-6 rounded-lg">
                            + Add Member
                        </button>
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto max-h-[60vh]">
                <table className="text-center mx-auto min-w-full sm:min-w-[80vw] table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Profile</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Contact</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((user, id) => (
                            <tr key={id} className="bg-gray-200">
                                <td className="px-4 py-2">
                                    <img
                                        src={user.userImage}
                                        className="w-16 h-16 rounded-full mx-auto"
                                        alt="Not Found"
                                    />
                                </td>
                                <td className="px-4 py-2">{user.first_name}</td>
                                <td className="px-4 py-2">{user.job}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.contact}</td>
                                <td className="px-4 py-2 flex justify-center gap-4">
                                    <Link to={"/update"}>
                                        <CiEdit className="text-xl" />
                                    </Link>
                                    <button
                                        className="text-red-600"
                                        onClick={() => deleteUser(user.first_name)}
                                    >
                                        <MdDelete className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
        </div>
    );
}

export default People;
