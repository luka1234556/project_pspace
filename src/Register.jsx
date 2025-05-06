import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { GiHadesSymbol } from "react-icons/gi";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedPhone = phone.trim();

    const containsEmoji = (str) => {
      const emojiRegex = /[\p{Emoji_Presentation}\uFE0F]/gu;
      return emojiRegex.test(str);
    };

    if (!trimmedUsername || !trimmedPassword || !trimmedPhone) {
      return setError("All fields are required!");
    }

    if (/^\d+$/.test(trimmedUsername)) {
      return setError("Username can't contain only numbers!");
    } else if (containsEmoji(trimmedUsername)) {
      return setError("Emojis aren't allowed!");
    } else if (trimmedUsername.length < 3 || trimmedUsername.length > 12) {
      return setError("Username must be 3 to 12 characters long!");
    }

    if (trimmedPassword.length < 6 || trimmedPassword.length > 20) {
      return setError("Password must be 6 to 20 characters long!");
    } else if (containsEmoji(trimmedUsername)) {
      return setError("Emojis aren't allowed!");
    }

    if (!/^\d+$/.test(trimmedPhone)) {
      return setError("Phone number must be only numbers!");
    }

    setError("");

    const newUser = {
      username: trimmedUsername,
      password: trimmedPassword,
      phone: trimmedPhone,
    };

    let existingUser = [];
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      try {
        existingUser = JSON.parse(storedUsers);
      } catch (err) {
        console.error("Failed to parse users from localStorage:", err);
        // Optional: reset bad data
        localStorage.removeItem("users");
      }
    }
    existingUser.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUser));
    window.alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div 
    className="min-h-screen flex justify-center items-center bg-gradient-to-b 
    from-green-200 to-green-900 relative">
      {/*Web Symbol */}
      <GiHadesSymbol
      className="absolute text-[37rem] z-1 text-green-200 opacity-20"
      />

      <motion.form
      initial={{ opacity: 0, y: 190 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-6 w-80 rounded-lg space-y-4 relative border
      border-white bg-gradient-to-b from-green-300 to-gray-900
      register-shadow z-100 register-shadow group hover:to-gray-400"
      onSubmit={handleRegister}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center group-hover:text-green-100 pb-2 text-2xl
          font-mono text-green-300 md:text-green-900"
        >
          Register
        </motion.h2>
        {error && (
          <p className="text-sm text-center text-red-500">{error}</p>
        )}

        <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        value={username}
        className={`border rounded p-2 w-full md:text-gray-700 
      group-hover:text-green-50 ${
        error ? "border-red-500" : "group-hover:border-green-100 md:border-green-800 border-green-100"
        } text-green-50`}
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 pr-10 border text-green-100 md:text-gray-700 group-hover:text-green-50 rounded
            ${error ? "border-red-500" : "group-hover:border-green-100 md:border-green-800 border-green-100"}`}
          />
          <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 
          cursor-pointer select-none group-hover:text-green-100 text-green-100 md:text-green-800"
          >
            {showPassword ? <FaEye /> : <LuEyeClosed />}
          </span>
        </div>

        <input
          type="text"
          placeholder="Phone Number"
          maxLength={9}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`w-full p-2 border text-green-100 md:text-gray-700 group-hover:text-green-50
          ${error ? "border-red-500" : "group-hover:border-green-100 md:border-green-800 border-green-100"}
          rounded-sm`}
        />

        <button
          type="submit"
          className="button-shadow bg-gradient-to-b from-gray-500 
      to-gray-700 button-saber-outer active:bg-gradient-to-tl
        hover:text-green-300 transition-all duration-300 border-1
        cursor-pointer text-white rounded-lg text-center w-full p-2
        border-green-100 register-pulse hover:from-gray-500
        hover:to-green-200"
        >
          Register
        </button>

        <p className="text-sm text-center md:text-gray-700 
        group-hover:text-gray-200 text-green-50">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-400 active:text-blue-300 cursor-pointer select-none hover:underline"
          >
            Login
          </span>
        </p>
      </motion.form>
    </div>
  );
}

export default Register;