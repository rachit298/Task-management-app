function validateEmail(input, setForm, setError) {
    setError(o => ({ ...o, email: [] }));
    if (!input) {
        setError((oldVal) => ({ ...oldVal, email: [...oldVal.email, "Email is required."] }));
    }
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]+)$/;
    if (reg.test(input) == false) {
        setError((oldVal) => ({ ...oldVal, email: [...oldVal.email, "Email is not valid."] }));
    }
    if (input.length > 40) {
        setError((oldVal) => ({ ...oldVal, email: [...oldVal.email, "Length should be less than 40 characters."] }));
    }
    setForm(oldVal => ({ ...oldVal, email: input }));
}

function validatePassword(input, setForm, setError) {
    setError(o => ({ ...o, password: [] }));
    const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
    if (!input || input.trim().length === 0 || !alphanumericRegex.test(input)) {
        setError((oldVal) => ({ ...oldVal, password: [...oldVal.password, "Password should only contain from a-z, A-Z or 0-9."] }));
    }   
    if (input.length > 30) {
        setError((oldVal) => ({ ...oldVal, password: [...oldVal.password, "Length should be less than 30 characters."] }));
    }
    setForm(oldVal => ({ ...oldVal, password: input }));
}

function validate(e, setForm, setError) {
    switch (e.target.name) {
        case "email":
            validateEmail(e.target.value, setForm, setError);
            break;
        case "password":
            validatePassword(e.target.value, setForm, setError);
            break;
    }
}

function isFormButtonDisabled(form, error) {
    return (
        error.email.length > 0 ||
        error.password.length > 0 ||
        form.email.trim().length === 0 ||
        form.password.trim().length === 0
    );
}

export { validate, isFormButtonDisabled };