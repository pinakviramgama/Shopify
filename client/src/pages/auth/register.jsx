import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, useSonner } from "sonner";

  function AuthRegister() {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sonner } = useSonner();
const handleRegister = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const result = await dispatch(registerUser(formData));
    const payload = result?.payload;

    if (payload?.success) {
      toast.success(payload?.message || "Registered successfully!");
      navigate("/auth/login");
    } else if (payload?.message?.includes("E11000 duplicate key error")) {
      toast.warning("User already exists. Redirecting to login...");
      navigate("/auth/login");
    } else {
      toast.error(payload?.message || "Registration fail hogya.");
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
    console.error(err);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to ECommerce</h1>
          <p className="text-sm text-gray-600">Create an account to continue</p>
          <p className="text-sm mt-2 text-gray-500">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>

        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleRegister}
          buttonText="Register"
          isBtnDisabled={isSubmitting}
        />


      </div>
    </div>
  );
}

export default AuthRegister;
