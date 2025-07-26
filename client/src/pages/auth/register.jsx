import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AuthRegister() {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        toast.error(payload?.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row w-100 shadow rounded-4 overflow-hidden" style={{ maxWidth: "900px" }}>
        {/* Left Side – Welcome Section */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-4">
          <h2 className="fw-bold">Welcome to ECommerce</h2>
          <p className="text-center mt-2">We are happy to have you here. Start your journey with us.</p>
        </div>

        {/* Right Side – Form Section */}
        <div className="col-12 col-md-6 bg-white p-4">
          <div className="text-center mb-3">
            <h4 className="fw-bold">Create Account</h4>
            <p className="text-muted">Register to continue</p>
          </div>

          <CommonForm
            formControls={registerFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleRegister}
            buttonText="Register"
            isBtnDisabled={isSubmitting}
          />

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <a href="/auth/login" className="text-primary">Login</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
