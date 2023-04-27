import { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "./components/InputField";
import axiosInstance from "../../api/axiosInstance";

const OTP = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [otpCode, setOtpCode] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/users/otp", {
        otp_code: otpCode,
        phone_no: phoneNo,
      });
      // const res = await axios.post("http://localhost:4444/api/v1/users/otp", {
      //   otp_code: otpCode,
      //   phone_no: phoneNo,
      // });
      if (res.data.success == true) {
        console.log(res.data);
        toast.success("Login successful!");
        setErrors({});
        navigate("/home");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error.res);
      setSuccess("");
    }
  };

  const handleOtpCodeChange = (e) => {
    const value = Number(e.target.value);
    // const regex = /^\d+$/;
    // const newErrors = { ...errors };
    // let newSuccess = "";
    // if (value === "") {
    //   newErrors.otp = "OTP cannot be empty";
    // } else if (!regex.test(value)) {
    //   newErrors.otp = "OTP must be a number";
    // } else if (value.length !== 6) {
    //   newErrors.otp = "OTP must be 6 digits";
    // } else {
    //   delete newErrors.otp;
    // }
    // setErrors(newErrors);
    // setSuccess(newSuccess);
    setOtpCode(value);
  };
  useEffect(() => {
    try {
      setPhoneNo(location.state.phoneNo);
    } catch (error) {
      return redirect("/");
    }

    const timer = setInterval(() => {
      setCountdown((countdown) => {
        if (countdown == 1) {
          clearInterval(timer);
          return navigate("/");
        }
        return countdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">
          Verify Short Code
        </h2>
        <p>
          we sent a short code to your phone number <b>{phoneNo}</b>
        </p>
        <form onSubmit={handleVerify}>
          {/* <input
            type="text"
            pattern="[0-9]*"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          /> */}
          <InputField
            label="Short code"
            type="tel"
            pattern="[0-9]*"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            errors={errors.otpCode}
            success={success}
            autoFocus
            placeholder="Enter your short code"
          />
          <p className="text-gray-500 mb-4">{countdown} seconds left</p>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            // disabled={Object.keys(errors).length > 0 || otpCode === ""}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
