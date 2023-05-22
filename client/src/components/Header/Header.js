import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include"
    }).then((res) => {
      res.json().then((data) => {
        setUsername(data.username);
      }
    )});
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: 'POST'
    }).then((res) => {
      res.json().then((data) => {
        setUsername(null);
      }
    )});
  }

    return (
        <header>
        <Link to='/' className='logo'>My MernBlog</Link>
        <nav>
          {username && (
            <>
              <Link to='/create'>Create Post</Link>
              <Link to='/profile'>Profile</Link>
              <Link onClick={logout}>Logout</Link>
            </>
          )}
          {!username && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </nav>
      </header>
    )
}
