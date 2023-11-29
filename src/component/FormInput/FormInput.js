import { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./FormInput.css";

const FormInput = forwardRef(function FormInput(props, ref) {
    const { label, hint, obscured = false, isValid = false, onChange } = props;

    const [masked, setMasked] = useState(true);

    function toggleMask() {
        setMasked(!masked);
    }

    return (
        <div className="FormInput">
            <div className="FormInput-body">
                <label className="FormInput-label">{label}</label>
                {isValid ? (
                   <FontAwesomeIcon icon={faCheck} className="FormInput-validation success"/>
                ) : (
                   <FontAwesomeIcon icon={faXmark} className="FormInput-validation error"/>
                )}
                <div className="FormInput-inputWrapper">
                    <input className="FormInput-input"
                           type={obscured && masked ? 'password' : 'text'}
                           onChange={onChange} ref={ref} />
                    {obscured ? (
                        <button onClick={toggleMask}
                                className="FormInput-maskToggle">
                           <FontAwesomeIcon icon={masked ? faEye : faEyeSlash}/>
                        </button>
                    ) : ""}
                </div>
            </div>
            <p className={'FormInput-hint' + (!isValid && isValid !== null ? ' visible' : '')}>
                <FontAwesomeIcon icon={faXmark}/> {hint}</p>
        </div>
    );
})

export default FormInput;
