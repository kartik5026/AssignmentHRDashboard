import React, { useState } from 'react';

const Attendance = () => {
  // Dummy data for demonstration purposes
  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      profile: 'https://via.placeholder.com/150',
      name: 'John Doe',
      designation: 'Software Engineer',
      department: 'Engineering',
      attendanceStatus: 'Present',
    },
    {
      id: 2,
      profile: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      designation: 'UI/UX Designer',
      department: 'Design',
      attendanceStatus: 'Absent',
    },
    // Add more employee data as needed
  ]);

  // Function to update attendance status
  const updateAttendance = (id, newStatus) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === id
          ? { ...employee, attendanceStatus: newStatus }
          : employee
      )
    );
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Employee Attendance</h1>
      <table className="min-w-full table-auto border-separate border-spacing-0 shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="border px-4 py-2 text-left">Profile</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Designation</th>
            <th className="border px-4 py-2 text-left">Department</th>
            <th className="border px-4 py-2 text-left">Attendance Status</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">
                <img
                  src={employee.profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="border px-4 py-2 text-gray-700">{employee.name}</td>
              <td className="border px-4 py-2 text-gray-700">{employee.designation}</td>
              <td className="border px-4 py-2 text-gray-700">{employee.department}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full ${
                    employee.attendanceStatus === 'Present'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {employee.attendanceStatus}
                </span>
              </td>
              <td className="border px-4 py-2">
                <select
                  value={employee.attendanceStatus}
                  onChange={(e) => updateAttendance(employee.id, e.target.value)}
                  className="border px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
