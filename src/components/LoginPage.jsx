/* eslint-disable react/prop-types */
import { useState } from "react";

import "../styles/login-page.css";

import webLogo from "../Icons/qom-icon.png";
import allowedUsers from "../database/allowedUsers";

export default function LoginPage ({handleLogin}){
    const [inputs, setInputs] = useState ({username:null,password:null});
    const user =allowedUsers;

    function handleChange(event) {
        const {value, name} = event.target;
        var temp = inputs;
        temp = {...temp, [name]: value};
        setInputs(temp);
    }

    function handleValidate () {
        var check = false;
        user.forEach(item => {
            if ((inputs.username === item.username)
                &&
                (inputs.password === item.password)) {
                alert("alright");
                check =true;
                return;
            }
        })
        if (check) {
            handleLogin();
        }
        else if (!check)
            alert("wrong user");
    }

    return (
        <div className="login-semi-body">
            <div className="container">
                <img src={webLogo} alt="web logo" className="web-logo"/>

                <div className="titles">
                    <p className="db-title">پایگاه داده</p>
                    <p className="uni-title">دانشگاه قم</p>
                </div>

                <div className="inputs">
                    <p className="input-text">نام کاربری :</p>
                    <input type="text" className="login-input" value={inputs.username}
                    name="username" onChange={handleChange}></input>

                    <p className="input-text">رمز عبور‌ :</p>
                    <input type="password" className="login-input" value={inputs.password}
                        name="password" onChange={handleChange}></input>
                </div>

                <button className="login-button" onClick={handleValidate}>ورورد</button>
            </div>
        </div>
    )
}