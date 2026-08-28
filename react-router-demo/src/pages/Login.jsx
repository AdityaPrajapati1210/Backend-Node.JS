function Login() {
    return (
        <div>
            <h1>Login Page</h1>

            <form>
                <input
                    type="email"
                    placeholder="Enter email"
                />

                <input
                    type="password"
                    placeholder="Enter password"
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;