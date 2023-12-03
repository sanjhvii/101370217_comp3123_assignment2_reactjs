import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ViewEmp() {
  const auth = localStorage.getItem("user") ? true : false;
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const loadEmployee = async () => {
    const res = await axios.get(
      `https://101370217-comp3123-assignment2-reactjs.vercel.app/api/emp/employees/${id}`
    );
    setEmployee(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadEmployee();
    };
    fetchData();
  }, [loadEmployee]); // Include loadEmployee in the dependency array

  function onLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }

  if (auth) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="m-0">View Employee</h2>
          <button className="btn btn-info" onClick={(e) => onLogout(e)}>
            Log Out
          </button>
        </div>
        <hr />
        <div className="border p-3 w-50">
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <span className="fw-bold">First Name : </span>
              <span>{employee.first_name}</span>
            </li>
            {/* ... (other list items) */}
          </ul>
          <div className="d-flex">
            <Link
              className="btn btn-primary me-3"
              to={`/editemp/${employee._id}`}
            >
              Edit
            </Link>
            <Link className="btn btn-secondary" to={"/list"}>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
}
