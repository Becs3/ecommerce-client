import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import "./adminList.css"

export const Login = () => {

    const {user, login, isLoading} = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    if (!isLoading && user) {
        return <Navigate to="/admin" />
    }

    const handleLogin = () => {
        login(username, password);
    }

    return(
        <>
        <div className="list-container">
        <input type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
        <input type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
        
        <button onClick={handleLogin}>Log In</button>
        </div>
        </>
    )
}