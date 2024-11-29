import React, { useState } from 'react';

const Leave = () => {
  const [leaveData, setLeaveData] = useState([
    {
      id: 1,
      profile: 'https://via.placeholder.com/150',
      name: 'John Doe',
      designation: 'Software Engineer',
      department: 'Engineering',
      leaveStatus: 'Pending',
    },
    {
      id: 2,
      profile: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      designation: 'UI/UX Designer',
      department: 'Design',
      leaveStatus: 'Accepted',
    },
  ]);

  const [newLeave, setNewLeave] = useState({
    profile: '',
    name: '',
    designation: '',
    department: '',
    leaveStatus: 'Pending',
  });

  const [message, setMessage] = useState("");

  const updateLeaveStatus = (id, newStatus) => {
    setLeaveData((prevData) =>
      prevData.map((leave) =>
        leave.id === id ? { ...leave, leaveStatus: newStatus } : leave
      )
    );
  };

  const addLeave = () => {
    if (
      newLeave.name &&
      newLeave.designation &&
      newLeave.department &&
      newLeave.profile
    ) {
      setLeaveData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1, // Unique ID
          ...newLeave,
        },
      ]);
      setMessage("Leave request added successfully!");
      setNewLeave({
        profile: '',
        name: '',
        designation: '',
        department: '',
        leaveStatus: 'Pending',
      }); // Reset form
    } else {
      setMessage("Please fill all fields!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leave Management</h1>
      <table className="w-full border-collapse border border-gray-300 text-left mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Profile</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Leave Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((leave) => (
            <tr key={leave.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <img
                  src={leave.profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{leave.name}</td>
              <td className="border px-4 py-2">{leave.designation}</td>
              <td className="border px-4 py-2">{leave.department}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full ${
                    leave.leaveStatus === 'Pending'
                      ? 'bg-yellow-500 text-white'
                      : leave.leaveStatus === 'Accepted'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {leave.leaveStatus}
                </span>
              </td>
              <td className="border px-4 py-2">
                <select
                  value={leave.leaveStatus}
                  onChange={(e) =>
                    updateLeaveStatus(leave.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-bold mb-2">Add New Leave Request</h2>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Profile URL"
          value={newLeave.profile}
          onChange={(e) =>
            setNewLeave({ ...newLeave, profile: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Name"
          value={newLeave.name}
          onChange={(e) => setNewLeave({ ...newLeave, name: e.target.value })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Designation"
          value={newLeave.designation}
          onChange={(e) =>
            setNewLeave({ ...newLeave, designation: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Department"
          value={newLeave.department}
          onChange={(e) =>
            setNewLeave({ ...newLeave, department: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={addLeave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Leave
        </button>
      </div>

      {message && <p className="text-center text-sm text-green-500">{message}</p>}
    </div>
  );
};

export default Leave;
