import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  Chrome, 
  Plus, 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Apple
} from "lucide-react";
import { useMockAuth } from "@/hooks/useMockAuth";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useMockAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/run");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    login(email);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/run");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Ambient Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-6xl h-[600px] bg-card rounded-3xl shadow-2xl overflow-hidden flex"
      >
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center bg-card">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-background" />
            </div>
            <span className="text-2xl font-bold text-foreground">CrewDog</span>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back Creative!
            </h1>
            <p className="text-muted-foreground text-sm">
              We Are Happy To See You Again
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all ${
                isLogin
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-4 pr-12 h-12 rounded-full bg-muted/50 border-muted focus:border-primary"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-4 pr-12 h-12 rounded-full bg-muted/50 border-muted focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-4 pr-12 h-12 rounded-full bg-muted/50 border-muted focus:border-primary"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </motion.div>
            )}

            {/* Remember Me & Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-lg"
            >
              {isLogin ? "Login" : "Create Account"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-4 text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 border-0"
              >
                <Apple className="w-5 h-5 mr-2" />
                Log in with Apple
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-full"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Log in with Google
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side - Blue Fluid Design */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 overflow-hidden">
          {/* Animated Fluid Shapes */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Main Fluid Shape 1 */}
            <motion.div
              className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.3))",
                filter: "blur(60px)",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main Fluid Shape 2 */}
            <motion.div
              className="absolute top-[40%] right-[10%] w-[350px] h-[350px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.6), rgba(59, 130, 246, 0.4))",
                filter: "blur(50px)",
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main Fluid Shape 3 */}
            <motion.div
              className="absolute bottom-[15%] left-[15%] w-[300px] h-[300px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(147, 197, 253, 0.5), rgba(96, 165, 250, 0.3))",
                filter: "blur(40px)",
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Additional accent shapes */}
            <motion.div
              className="absolute top-[60%] left-[40%] w-[200px] h-[200px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(191, 219, 254, 0.4), rgba(147, 197, 253, 0.2))",
                filter: "blur(30px)",
              }}
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Footer Text */}
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20"
            >
              <p className="text-white/80 text-xs leading-relaxed">
                © 2025 CrewDog. All rights reserved.
                <br />
                Unauthorized use or reproduction of any content or materials from this site is
                prohibited. For more information, visit our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
