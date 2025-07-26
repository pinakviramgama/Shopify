import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/getUsers");
        setTotalUsers(data.totalUsers);
      } catch (err) {
        console.error("Failed to fetch total users:", err);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col">
          <h3>Dashboard</h3>
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        {/* Total Orders */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="border rounded p-3 shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <h5>Total Orders</h5>
            <p className="fs-4 text-primary">150</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="border rounded p-3 shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <h5>Total Users</h5>
            <p className="fs-4 text-success">{totalUsers}</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="border rounded p-3 shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <h5>Revenue</h5>
            <p className="fs-4 text-warning">₹1,20,000</p>
          </div>
        </div>

        {/* Tickets */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="border rounded p-3 shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <h5>Tickets</h5>
            <p className="fs-4 text-danger">9</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
