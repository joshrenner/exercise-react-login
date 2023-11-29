import { useState, useRef } from "react";
import "./LoginForm.css";
import FormInput from "../FormInput/FormInput";

function LoginForm() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameIsValid, setUsernameIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const [confirmationIsValid, setConfirmationIsValid] = useState(null);

    const confirmationInputRef = useRef(null);

    function validateUsername(e) {
        const value = e.target.value;
        const isValid = /([a-z0-9_]).{4,}/.test(value);
        setUsernameIsValid(isValid);
        if (isValid) {
            setUsername(value);
        }
    }
    
    function validatePassword(e) {
        const value = e.target.value;
        const isValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/.test(value);
        setPasswordIsValid(isValid);
        if (isValid) {
            setPassword(value);
        }
        confirmationInputRef.current.value = "";
        setConfirmationIsValid(null);
    }
    
    function validateConfirmation(e) {
        const value = e.target.value;
        const pattern = new RegExp(password);
        const isValid = pattern.test(value);
        setConfirmationIsValid(isValid);
    }

    function submitForm() {
        alert("Form submitted with: " + JSON.stringify({ username, password }));
    }

    return (
        <div className="LoginForm">
            <div className="LoginForm-body">
                <FormInput label="Username"
                           hint="Username can only use letters, numbers, and underscores, and at least 5 character"
                           onChange={validateUsername} 
                           isValid={usernameIsValid} />
                <FormInput label="Password"
                           hint="Password must contain at least one number and one uppercase and lowercase letter, and at least 8 characters"
                           onChange={validatePassword} 
                           isValid={passwordIsValid} 
                           obscured />
                <FormInput label="Confirm Password"
                           hint="Passwords must match"
                           onChange={validateConfirmation}
                           isValid={confirmationIsValid}
                           ref={confirmationInputRef}
                           obscured />
            </div>
            <div className="LoginForm-action">
                <button onClick={submitForm}
                        disabled={!(usernameIsValid && passwordIsValid && confirmationIsValid)}>Submit</button>
            </div>
        </div>
    );
}

export default LoginForm;
