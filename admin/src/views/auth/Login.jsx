import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/AuthContext";
import InputField from "./components/InputField";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const { login } = useContext(UserAuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        phone_no: phoneNumber,
        password,
      });
      if (res.data.success == true) {
        setErrors({});
        navigate(`/otp/`, { state: { phoneNo: res.data.payload.phone_no } });
      } else {
        alert("There was an error logging in to system");
      }
    } catch (error) {
      setErrors(error.response.data);
      setSuccess("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const newErrors = { ...errors };
    let newSuccess = "";
    if (value === "") {
      newErrors.phoneNumber = "Phone number cannot be empty";
    } else if (isNaN(value)) {
      newErrors.phoneNumber = "Phone number must be a number";
    } else {
      delete newErrors.phoneNumber;
      newSuccess = "Phone number format is valid";
    }
    setErrors(newErrors);
    setSuccess(newSuccess);
    setPhoneNumber(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const newErrors = { ...errors };
    let newSuccess = "";

    if (value === "") {
      newErrors.password = "Password cannot be empty";
    } else {
      delete newErrors.password;
      newSuccess = "Password Format is valid";
    }
    setErrors(newErrors);
    setSuccess(newSuccess);
    setPassword(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <InputField
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            errors={errors.phoneNumber}
            success={success}
            placeholder="Enter your phone number"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            errors={errors.password}
            success={success}
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={
              Object.keys(errors).length > 0 ||
              phoneNumber === "" ||
              password === ""
            }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/;
// else if (!regex.test(value)) {
//       newErrors.password =
//         "Password must include at least one number, one capital letter and one small letter";
//     }
