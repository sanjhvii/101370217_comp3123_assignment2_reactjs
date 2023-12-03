import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: null,
        password: null,
    });

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };

    async function onLogin(e) {
        e.preventDefault();
        try {
            await axios.post("https://101370217-comp3123-assignment2-reactjs.vercel.app/api/user/login", user);
            localStorage.setItem("user", user);
            navigate("/list", { replace: true });
        } catch (error) {
            if (error.response.status === 404) {
                alert("Incorrect Username or Password");
            }
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="mb-4">Login Here !</h2>
            <div className="border p-3 w-50">
                <form onSubmit={(e) => onLogin(e)}>
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="Username"
                            required={true}
                            onChange={(e) => onInputChange(e)}
                        />
                        <label for="username">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Password"
                            required={true}
                            onChange={(e) => onInputChange(e)}
                        />
                        <label for="password">Password</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary me-3">
                            Login
                        </button>
                        <Link className="btn btn-secondary" to={"/signup"}>
                            Register Here !
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
