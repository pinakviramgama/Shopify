import { login } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./login.css"; // 👈 custom styles

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    const payload = res?.payload;

    if (payload?.success) {
      toast.success(payload?.message || "Logged in");
      navigate("/");
    } else {
      toast.error(payload?.message || "Invalid login");
    }
  };

  return (
    <div className="login-container d-flex">
     <div className="left-panel text-white d-flex flex-column justify-content-center align-items-center d-none d-md-flex">
        <h1 className="display-5 fw-bold">WELCOME</h1>
        <p>Your headline name</p>
      </div>

      <div className="left-panel bg-white p-5 shadow">
        <h3 className="mb-4 fw-bold">Sign in</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative" style={{ width: "270px" }}>
            <label className="form-label text-start d-block" >Email address</label>
            <input
              type="email"
              className="form-control pe-5 custom-input"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <br />
<div className="mb-3 position-relative" style={{ width: "250px" }}>
  <label className="form-label text-start d-block">Password</label>
  <input
    type={showPassword ? "text" : "password"}
    className="form-control pe-5 custom-input" // pe-5 adds space for the show/hide text
    placeholder="Enter password"
    name="password"
    value={formData.password}
    onChange={handleInputChange}
    required
    style={{ height: "43px" }}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="position-absolute top-50 end-0 me-3 text-primary"
    style={{ cursor: "pointer", fontSize: "0.9rem" }}
  >
    {showPassword ? "HIDE" : "SHOW"}
  </span>
</div>


          <div className="d-flex justify-content-between mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="text-decoration-none text-primary">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign in
          </button>

          <button type="button" className="btn btn-outline-secondary w-100">
            Sign in with other
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account? <a href="/auth/register">Sign Up</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
