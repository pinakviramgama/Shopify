import CommonForm from "@/components/common/form";
import { login } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: '',
  password: ''
};

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your user-email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];


function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const OnSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await dispatch(login(formData));
    const payload = res?.payload;

    if (payload?.success) {
      toast.success(payload?.message || "Login successful!");
      navigate("/");
    } else if (payload?.message?.toLowerCase().includes("user doesn't exist")) {
      toast.warning("User not found, Please Sign-up first");
    } else {
      toast.error(payload?.message || "Invalid credentials.");
    }
  } catch (err) {
    toast.error("Login failed. Please try again.");
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to ECommerce Shopping</h1>
          <p className="text-sm text-gray-600">Create an account to get started</p>
          <p className="text-sm mt-2 text-gray-500">
        Don't have account{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              register now
            </a>
          </p>
        </div>

        <CommonForm
          formControls={loginFormControls}
          buttonText="Log in"
          formData={formData}
          setFormData={setFormData}
          onSubmit={OnSubmit}
        />
      </div>
    </div>
  );
}

export default Login;
