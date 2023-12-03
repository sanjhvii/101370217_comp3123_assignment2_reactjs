import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddEmp() {
  const auth = localStorage.getItem("user") ? true : false;

  const [employee, setEmployee] = useState({
    first_name: null,
    last_name: null,
    email: null,
    gender: null,
    salary: null,
  });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const emp = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      salary: employee.salary,
    };

    try {
      // Update the API endpoint with your own
      await axios.post(
        "https://101370217-comp3123-assignment2-reactjs.vercel.app/api/emp/employees",
        emp
      );
      alert("Employee created!");
      navigate("/list");
    } catch (error) {
      console.error("Error creating employee:", error);
      // Handle the error (display an error message, log it, etc.)
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
          <h2 className="m-0">Add New Employee</h2>
          <button className="btn btn-info" onClick={(e) => onLogout(e)}>
            Log Out
          </button>
        </div>
        <hr />
        <div className="border p-3 w-50">
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="first_name"
                placeholder="First Name"
                required={true}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="last_name"
                placeholder="Last Name"
                required={true}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email Address"
                required={true}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="gender"
                aria-label="Floating label select example"
                required={true}
                onChange={(e) => onInputChange(e)}
              >
                <option selected disabled value="">
                  Select Gender...
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="gender">Gender</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="salary"
                placeholder="Salary"
                required={true}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="salary">Salary</label>
            </div>
            <div className="d-flex">
              <button type="submit" className="btn btn-primary me-3">
                Add
              </button>
              <Link className="btn btn-secondary" to={"/list"}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
}
