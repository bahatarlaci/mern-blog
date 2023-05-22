import {useState} from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        if (response.ok) {
            alert('Registration successful.');
        } else {
            alert('Registration failed');
        }
    }

    return (
        <div>
            <form className='register' onSubmit={register}>
                <h1>Register</h1>
                <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}