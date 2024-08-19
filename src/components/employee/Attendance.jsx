import axios from "axios";
import React, { useEffect, useState } from "react";
import AddEmployeeAttendance from "./AddEmployeeAttendance";

export default function Attendance({ currentEmployee }) {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 8) + "01"
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [attendanceRecords, setAttendanceRecords] = useState(null);

  const getAttendanceRecordsByDate = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-attendance/getEmployeeAttendanceBetweenDates/${currentEmployee.empId}/${startDate}/${endDate}`
      )
      .then((response) => {
        if (response.data) {
          setAttendanceRecords(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/employee-attendance/deleteEmployeeAttendance/${id}`
      )
      .then((response) => {
        if (response) {
          getAttendanceRecordsByDate();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(
    () => getAttendanceRecordsByDate(),
    [startDate, endDate, currentEmployee]
  );

  return (
    <div className="container-fluid mt-0">
      <div className="row mb-2">
        <div className="col-sm-3">
          <label className="small">Start Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-3">
          <label className="small">End Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-6 text-right">
          <button
            type="button"
            className="btn btn-sm btn-green btn-rounded mt-3 mb-0 mr-2 mr-3"
            data-toggle="modal"
            data-target="#addEmployeeAttendance"
          >
            Attendance
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="table-responsive mt-3">
            {attendanceRecords && attendanceRecords.length !== 0 ? (
              <>
                <table className="table table-sm mb-0" id="child_table_id">
                  <thead className="table-dark">
                    <tr>
                      <th>Attend Date</th>
                      <th>Checked In</th>
                      <th>Checked Out</th>
                      <th>Hours</th>
                      <th>Note</th>
                      <th>Status</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((row) => (
                      <tr key={row.attendanceId}>
                        <td>{row.attendDate}</td>
                        <td>{row.checkedIn ? row.checkedIn : "-"}</td>
                        <td>{row.checkedOut ? row.checkedOut : "-"}</td>
                        <td>{row.hours ? `${row.hours} hrs` : "-"}</td>
                        <td>{row.note || "-"}</td>
                        <td>{row.status}</td>
                        <td className="text-center">
                          <i
                            className="fas fa-trash fa-1/2x text-danger pr-3 pl-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(row.attendanceId)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr className="mt-0" />
              </>
            ) : (
              <h4 className="text-danger mt-3">No records found...</h4>
            )}
          </div>
        </div>
      </div>
      {currentEmployee && (
        <AddEmployeeAttendance
          currentEmployee={currentEmployee}
          getAttendanceRecordsByDate={getAttendanceRecordsByDate}
        />
      )}
    </div>
  );
}
