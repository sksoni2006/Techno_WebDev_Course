import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginpage = () => {
  const redirectUrl = process.env.NODE_ENV === "production"
    ? "https://technothlon.techniche.org.in/leaderboard"
    : "http://localhost:3000/leaderboard";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState([]);
  const navigate = useNavigate();

  // Fetch credentials.json dynamically
  useEffect(() => {
    fetch('/credentials.json')
      .then((res) => res.json())
      .then((data) => setCredentials(data))
      .catch((err) => console.error('Error loading credentials:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    // Check credentials
    const user = credentials.find(user => user.username === username && user.password === password);

    if (user) {
      toast.success(`Welcome, ${user.name}!`);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } else {
      setError("Wrong Username or Password");
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Login</button>
      </form>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Loginpage;






// import React, { useState } from 'react';
// import './login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Loginpage = () => {
//   const baseURL = process.env.NODE_ENV === "production"
//     ? "https://technothlon.techniche.org.in/api/"
//     : "http://localhost:3001/api/";

//   const redirectUrl = process.env.NODE_ENV === "production"
//     ? "https://technothlon.techniche.org.in/leaderboard"
//     : "http://localhost:3000/leaderboard";

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username.trim()) {
//       setError('Please enter username');
//       return;
//     }

//     if (!password.trim()) {
//       setError('Please enter Password');
//       return;
//     }

//   //   try {
//   //     const res = await axios.post(`${baseURL}user/login`, { username, password });
//   //     if (res.data.status) {
//   //       window.location.href = redirectUrl;
//   //     } else {
//   //       setError("Wrong Roll or Password");
//   //       setUsername('');
//   //       setPassword('');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error during login:', err);
//   //     setError("Wrong Roll or Password");
//   //     setUsername('');
//   //     setPassword('');
//   //   }
//   // };

//     // Proceed with login
//     axios.post(`${baseURL}user/login`, { username, password}) // Ensure credentials are included
//       .then(res => {
//         if (res.data.status) {
//           window.location.href = redirectUrl;
//         } else {
//           setError("Wrong Username or Password");
//           setUsername('');
//         setPassword('');
//         }
//       })
//       .catch((err) => {
//         console.log('Error during login:', err);
//         setError("Wrong username or Password");
//         setUsername('');
//         setPassword('');
//       });
//   };


//   return (
//     <div className="login-container">
//       <h2>Log In</h2>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your Username"
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter your Password"
//           required
//         />

//         {error && <p className="error-message">{error}</p>}
//         {message && <p className="success-message">{message}</p>}

//         <button type="submit" className="login-button">Login</button>
//       </form>

//       <ToastContainer autoClose={5000} />
//     </div>
//   );
// };

// export default Loginpage;
