import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { GiHadesSymbol } from "react-icons/gi";


function Login(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if(loggedIn){
      navigate("/personalPage");
    }
  }, [navigate]);

  const handleLogin = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => 
      user.username === username && user.password === password
    )

    if(foundUser){
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/personalPage");
    }else{
      setError(true);
    }
  }

  return(
    <div 
    className="min-h-screen flex flex-col justify-center items-center
    bg-gradient-to-b from-blue-300 to-gray-800 relative">
      {/*Web Symbol */}
      <GiHadesSymbol
      className="absolute text-[37rem] z-1
      text-blue-50 opacity-20"/>

      <motion.form
      onSubmit={handleLogin}
      className="p-6 w-80 rounded-lg space-y-4 relative border border-white
      bg-gradient-to-b from-blue-300 to-gray-900 login-shadow z-100
      hover:to-gray-400 group"
      initial={{opacity:0, y:210}}
      animate={{opacity:1, y:0}}
      transition={{duration: 1}}
      >
        <motion.h1
        className="text-center group-hover:text-blue-100 pb-2 text-2xl 
        font-mono md:text-blue-900 text-blue-500" 
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
        transition={{duration: 0.5, delay: 0.5}}
        >
          Login
        </motion.h1>

        {error && 
        <p className="text-sm text-center text-red-500">
        Invalid username or password
        </p>}

        <input
        type="text"
        placeholder="Username"
        className={`border rounded p-2 w-full text-blue-100 md:text-gray-700 group-hover:text-blue-50
        ${error ? 'border-red-500':'group-hover:border-blue-100 border-blue-100 md:border-gray-600'}`}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        />

        <div className="relative group">
          <input
          type={showPassword ? "text":"password"}
          placeholder="Password"
          className={`border rounded p-2 w-full text-blue-100 md:text-gray-700 group-hover:text-blue-50
          ${error ? 'border-red-500':'group-hover:border-blue-100 border-blue-100 md:border-gray-600'}`}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          />
          <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-blue-100 md:text-gray-700 group-hover:text-blue-50 
          -translate-y-1/2 top-1/2 right-2 select-none cursor-pointer">
            {showPassword ? <FaEye /> : <LuEyeClosed/>}
          </span>
        </div>

        <button
        type="submit"
        className="button-shadow bg-gradient-to-b from-gray-500 
      to-gray-700 button-saber-outer active:bg-gradient-to-tl
        hover:text-blue-400 transition-all duration-300 border-1
        cursor-pointer text-white rounded-xl text-center w-full p-2
        border-blue-100 login-pulse mt-2 hover:to-sky-200
        hover:from-gray-400"
        >
          Log In
        </button>

        <p className="text-sm text-center pt-2 md:text-gray-700 
        group-hover:text-gray-200 text-gray-100">
          Don't have an account? {" "}
          <span
          onClick={() => navigate("/register")} 
          className="text-green-600 hover:text-green-400 active:text-blue-300
          cursor-pointer select-none hover:underline">
            Register
          </span>
        </p>
      </motion.form>
    </div>
  )
}

export default Login
