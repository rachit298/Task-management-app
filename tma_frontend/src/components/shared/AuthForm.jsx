import { useState } from "react";
import { Link } from "react-router-dom";
import { validate, isFormButtonDisabled } from "../../utils/AuthFormValidation";

function AuthForm({ type, onSubmit }) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: [],
        password: []
    });
    function submit(event) {
        onSubmit(event);
        setForm({ email: '', password: '' });
        setError({ email: [], password: [] });
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto dark:hidden"
                />
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto not-dark:hidden"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                    {type === "signup" ? "Sign up for new" : "Login to your"} account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={submit} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-left text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                value={form.email}
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                onChange={(e) => validate(e, setForm, setError)}
                            />
                        </div>
                        <div className="text-left text-red-500">
                            {error.email && error.email.map(
                                (error, index) => <ul key={index}>{error}</ul>
                            )}
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="password" className="block text-left text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                value={form.password}
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                onChange={(e) => validate(e, setForm, setError)}
                            />
                        </div>
                        <div className="text-left text-red-500">
                            {error.password && error.password.map(
                                (error, index) => <ul key={index}>{error}</ul>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                            disabled={isFormButtonDisabled(form, error)} // not working as of now
                        >
                            {type === "signup" ? "Sign up" : "Login"}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                    {type === "signup" ? `Already a member? ` : `Not a member? `}
                    <Link to={type === "signup" ? "/login" : "/signup"}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        {type === "signup" ? "Login" : "Sign up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm;