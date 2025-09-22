import AuthForm from "../components/shared/AuthForm";

function Login() {
    function submit(event) {
        event.preventDefault();
        const payload = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        fetch("http://localhost:3034/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => navigate('/dashboard'))
            .catch(error => navigate('/singup'));
    }
    return (
        <>
            <AuthForm type="login" onSubmit={submit()} />
        </>
    )
}

export default Login;