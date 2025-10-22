import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, Plane, Sparkles, ArrowRight } from "lucide-react";
import { useMockAuth } from "@/hooks/useMockAuth";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import loginBg1 from "@/assets/login-bg-1.jpg";
import loginBg2 from "@/assets/login-bg-2.jpg";
import loginBg3 from "@/assets/login-bg-3.jpg";
import loginBg4 from "@/assets/login-bg-4.jpg";

const backgroundImages = [loginBg1, loginBg2, loginBg3, loginBg4];

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useMockAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/run");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter an email");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    login(email);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/run");
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background Carousel */}
      <Carousel
        setApi={setCarouselApi}
        className="absolute inset-0 w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {backgroundImages.map((image, index) => (
            <CarouselItem key={index} className="h-screen">
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={`Background ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/4 transform -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
            animate={{
              scale: currentSlide === index ? 1 : 0.8,
            }}
          />
        ))}
      </div>

      {/* Left Content Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white"
        >
          {/* Premium Logo */}
          <motion.div
            className="flex items-center gap-3 mb-12"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-br from-primary to-primary/60 p-3 rounded-xl">
                <Plane className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wider">TRAVEL</h1>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              EXPLORE
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                HORIZONS
              </span>
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl mb-6 font-light"
          >
            Where Your Dream Destinations
            <br />
            Become Reality.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-white/80 leading-relaxed max-w-xl"
          >
            Embark on a journey where every corner of the world is within your
            reach. Discover breathtaking destinations and create unforgettable
            memories.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="flex items-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Form Section */}
      <div className="relative z-10 w-full lg:w-[600px] flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-white text-sm backdrop-blur-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="email" className="text-white font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white transition-all"
                      required
                    />
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="password" className="text-white font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white transition-all"
                    />
                  </motion.div>

                  {/* Confirm Password (Signup only) */}
                  {!isLogin && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="confirmPassword" className="text-white font-medium">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-12 bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white transition-all"
                      />
                    </motion.div>
                  )}

                  {/* Forgot Password */}
                  {isLogin && (
                    <motion.div
                      className="text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        type="button"
                        className="text-white/80 hover:text-white text-sm underline transition-colors"
                      >
                        Forgot password?
                      </button>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all group"
                      size="lg"
                    >
                      {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-4 text-white/60 font-medium">
                        or
                      </span>
                    </div>
                  </div>

                  {/* Google Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 bg-white/90 hover:bg-white border-white/30 text-gray-900 font-medium backdrop-blur-sm group"
                      size="lg"
                    >
                      <Chrome className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Sign in with Google
                    </Button>
                  </motion.div>
                </form>

                {/* Toggle Login/Signup */}
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-white/80 text-sm">
                    {isLogin ? "Are you new? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                        setConfirmPassword("");
                      }}
                      className="text-white font-semibold underline hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {isLogin ? "Create an Account" : "Sign In"}
                      <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    </button>
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
