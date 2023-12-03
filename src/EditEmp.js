import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmp() {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = localStorage.getItem("user") ? true : false;

  useEffect(() => {
    const loadEmployee = async () => {
      const result = await axios.get(
        `https://101370217-comp3123-assignment2-reactjs.vercel.app/api/emp/employees/${id}`
      );
      setEmployee(result.data);
    };

    const fetchData = async () => {
      await loadEmployee();
    };

    fetchData();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const emp = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      salary: employee.salary,
    };
    await axios.put(
      `https://101370217-comp3123-assignment2-reactjs.vercel.app/api/emp/employees/${id}`,
      emp
    );
    alert("Employee updated!");
    navigate("/list");
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
          <h2 className="m-0">Update Employee</h2>
          <button className="btn btn-info" onClick={(e) => onLogout(e)}>
            Log Out
          </button>
        </div>
        <hr />
        <div className="border p-3 w-50">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-floating mb-3">
              {/* ... rest of your code */}
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
}
