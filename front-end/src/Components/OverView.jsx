import { useEffect, useState } from "react";
import axios from "axios";

function OverView() {
    const [user, setUser] = useState('');
    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        if (isLoggedIn) {
            showUser();
        }
    }, [isLoggedIn]);

    async function showUser() {
        try {
            const res = await axios.get("http://localhost:3000/overview", { withCredentials: true });
            const newUser = res.data.msg;
            setUser(newUser);
        } catch (error) {
            setUser('failed');
            console.log(error);
        }
    }

    async function clearCookies() {
        const res = await axios.get("http://localhost:3000/logout", { withCredentials: true });
        setUser('failed');
        setIsLoggedIn(false);
        alert("Logged Out");
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handlePass(e) {
        setPass(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/login', { username, password }, { withCredentials: true });
            const log = res.data;
            if (log) {
                setIsLoggedIn(true);
                setName('');
                setPass('');
            } else {
                alert('Invalid Password');
                setPass('');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    }

    return (
        <div className="w-full text-center mx-auto">
            {user === 'failed' ? (
                <div>
                    <form onSubmit={handleClick}>
                        <input 
                            type="text" 
                            name="username" 
                            value={username} 
                            onChange={handleName} 
                            placeholder="enter your username" 
                            className="mx-4 border border-gray-500"
                        />
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={handlePass} 
                            placeholder="enter admin as password" 
                            className="mx-4 border border-gray-500" 
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-800 py-2 px-4 rounded-xl text-white"
                        >
                            Login
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-mono">Welcome To The Profile {user}!</h1>
                    <h1 className="text-2xl font-mono">Now You Have Access to The Data</h1>
                    {/* <button 
                        onClick={clearCookies} 
                        className="bg-red-500 text-white px-4 py-2 rounded-xl my-4"
                    >
                        Log Out
                    </button> */}
                </div>
            )}
        </div>
    );
}

export default OverView;
