
import { useState } from "react";
import "./styles.css";
import TodoList from "./Todo";
import { TodoProvider } from './TodoContext';

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [error, setError] = useState('');

    const login = (userEmail) => {
        if (!name.trim() && !password.trim() && !isEmailValid(email) ) {
            setError('Wrong Input. Please check again!');
          } else {
            const userData = {
                name,
                email,
                password,
            };
            localStorage.setItem(
                "token-info",
                JSON.stringify(userData)
            );
            setIsLoggedin(true);
            setName("");
            setEmail("");
            setPassword("");
            setEmail(userEmail);
          }
    };
    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      };
    const logout = () => {
        localStorage.removeItem("token-info");
        setEmail(null);
        setIsLoggedin(false);
    };

    return (
        <>
            <div class="todo-cntr">
                <h1 className="todo-login-hdr">HI! PLEASE LOG IN TO MANAGE YOUR TASKS </h1>
                {!isLoggedin ? (
                    <>
                        <form action="" className="login-form flex-col">
                            <input
                                className="inpt-frm-entry"
                                type="text"
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                value={name}
                                placeholder="Name"
                            />
                            <input
                                className="inpt-frm-entry"
                                type="email"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                value={email}
                                placeholder="Email"
                            />
                            <input
                                className="inpt-frm-entry"
                                type="password"
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                value={password}
                                placeholder="Password"
                            />
                            <div className="error-login-form">{error && <p>{error}</p>}</div>
                            <button
                                className="flex-col"
                                type="submit"
                                onClick={login}
                            >
                                GO
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                       <TodoProvider userEmail={email}>
      <TodoList />
    </TodoProvider> 
                        <div className="flex-col">
                            <button onClickCapture={logout}>
                                logout user
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default App;