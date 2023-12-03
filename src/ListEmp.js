import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListEmp() {
  const auth = localStorage.getItem("user") ? true : false;

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loademployees();
  }, []);

  const loademployees = async (e) => {
    const result = await axios.get(
      "https://101370217-comp3123-assignment2-reactjs.vercel.app/api/emp/employees"
    );
    setEmployees(result.data);
  };

  const deleteEmployee = async (_id) => {
    let userInput = prompt(
      'Do you want to delete this employee? (type : "yes" to confirm)'
    );
    if (
      userInput === "yes" ||
      userInput === "y" ||
      userInput === "YES" ||
      userInput === "Y" ||
      userInput === "Yes"
    ) {
      await axios.delete(
        `https://101370217-comp3123-assignment2-reactjs.vercel.app/api/emp/employees?eid=${_id}`
      );
      loademployees();
    } else if (userInput == null) {
      loademployees();
    } else {
      loademployees();
    }
  };

  function onLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }

  if (auth) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="m-0">List Of Employee</h2>
          <button className="btn btn-info" onClick={(e) => onLogout(e)}>
            Log Out
          </button>
        </div>
        <hr />
        <Link className="btn btn-primary mb-4" to="/addemp">
          Create New Employee
        </Link>
        <table class="table">
          <thead class="table-danger">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Address</th>
              <th scope="col">Gender</th>
              <th scope="col">Salary</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.gender}</td>
                <td>{emp.salary}</td>
                <td>
                  <Link
                    className="btn btn-primary me-3"
                    to={`/viewemp/${emp._id}`}
                  >
                    View
                  </Link>

                  <Link
                    className="btn btn-dark me-3"
                    to={`/editemp/${emp._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger me-3"
                    onClick={() => deleteEmployee(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    navigate("/");
  }
}