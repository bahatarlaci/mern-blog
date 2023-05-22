export default function RegisterPage() {
    return (
        <div>
            <form className="register">
                <h1>Register</h1>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}