import AuthForm from "../components/shared/AuthForm";
import { useNavigate } from "react-router";

function Signup() {
    let navigate = useNavigate();
    function submit(event) {
        event.preventDefault();
        const payload = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        fetch("http://localhost:3034/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => navigate('/login'))
            .catch(error => navigate('/singup'));
    }
    return (
        <>
            <AuthForm type="signup" onSubmit={(e) => submit(e)} />
        </>
    )
}

export default Signup;