import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/admin/login", { username, password });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-dark p-8 rounded-3xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold gradient-text">
            Admin Login
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Access the administration panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-dark-slate border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-secondary-orange transition-colors"
              placeholder="Enter password"
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-xs text-text-secondary mt-4">
            Default credentials: admin / admin123
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
