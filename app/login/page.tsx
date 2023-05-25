"use client";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await fetch("http://localhost:10000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        });
        if (response.ok) {
            console.log("success");
            const responseData = await response.json();
            console.log(responseData);
            localStorage.setItem("token", responseData.token); // Save token to localStorage
            localStorage.setItem("role", responseData.role); // Save role to localStorage
            router.push('/main');
        } else {
            console.log("failed!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
