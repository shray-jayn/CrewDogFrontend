import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";
import { 
  Target, Search, TrendingUp, CheckCircle2, Users, Zap, ArrowRight, Sparkles, 
  BarChart3, Clock, Shield, Rocket, PlayCircle, Brain, Cpu, Network, Layers,
  Workflow, Database, Code2, Gauge
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import heroTechBg from "@/assets/hero-tech-bg.jpg";
import processModern from "@/assets/process-modern.jpg";
import dashboardModern from "@/assets/dashboard-modern.jpg";
import dataModernBg from "@/assets/data-modern-bg.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// Chart data
const successRateData = [
  { month: "Jan", direct: 87, recruiter: 34 },
  { month: "Feb", direct: 89, recruiter: 31 },
  { month: "Mar", direct: 92, recruiter: 38 },
  { month: "Apr", direct: 94, recruiter: 35 },
  { month: "May", direct: 96, recruiter: 33 },
  { month: "Jun", direct: 94, recruiter: 36 }
];

const performanceData = [
  { metric: "Response Rate", value: 94, color: "hsl(var(--primary))" },
  { metric: "Time Saved", value: 85, color: "hsl(180, 100%, 60%)" },
  { metric: "Direct Contacts", value: 97, color: "hsl(280, 100%, 70%)" },
  { metric: "Success Rate", value: 92, color: "hsl(160, 100%, 60%)" }
];

export default function Home() {
  const [counts, setCounts] = useState({ searches: 0, jobs: 0, success: 0, users: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const targets = { searches: 12847, jobs: 45023, success: 94, users: 8500 };
    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCounts({
        searches: Math.floor(targets.searches * easeOutQuart),
        jobs: Math.floor(targets.jobs * easeOutQuart),
        success: Math.floor(targets.success * easeOutQuart),
        users: Math.floor(targets.users * easeOutQuart)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-background via-background to-background/95">
      <Topbar />
      
      <main className="flex-1">
        {/* Hero Section - Cutting Edge Design */}
        <motion.section 
          ref={heroRef}
          style={{ y: smoothY, opacity }}
          className="relative overflow-hidden min-h-screen flex items-center"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.img 
              src={heroTechBg} 
              alt="" 
              className="w-full h-full object-cover"
              style={{
                x: mousePosition.x,
                y: mousePosition.y
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-primary/5" />
          </div>

          {/* Animated Grid Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'float 20s ease-in-out infinite'
            }} />
          </div>

          {/* Floating Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: Math.random() * 400 + 200,
                height: Math.random() * 400 + 200,
                background: `radial-gradient(circle, hsl(var(--primary) / ${0.1 + Math.random() * 0.1}) 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-6xl mx-auto text-center space-y-10"
            >
              <motion.div 
                variants={fadeInUp} 
                className="inline-block"
              >
                <motion.div 
                  className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-primary/5 border border-primary/20 text-sm font-medium mb-8 overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <Brain className="h-4 w-4 text-cyan-400 animate-pulse" />
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary">
                    AI-Powered Intelligence Engine
                  </span>
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp} 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
              >
                <span className="block mb-4">Bypass the</span>
                <span className="block relative">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 via-primary to-purple-500 opacity-50 animate-pulse" />
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-primary to-purple-500 animate-shimmer bg-[length:200%_auto]">
                      Middleman
                    </span>
                  </span>
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp} 
                className="text-xl md:text-3xl text-muted-foreground/90 max-w-4xl mx-auto leading-relaxed font-light"
              >
                Discover the <span className="text-cyan-400 font-semibold">actual hiring company</span> behind every LinkedIn post.
                <br className="hidden md:block" />
                Apply directly. Get hired <span className="text-primary font-semibold">400% faster</span>.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp} 
                className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              >
                <Link to="/run">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="relative text-lg px-12 py-8 group overflow-hidden bg-gradient-to-r from-cyan-500 to-primary hover:from-cyan-400 hover:to-primary-glow shadow-2xl shadow-primary/50">
                      <span className="relative z-10 flex items-center gap-2">
                        Start Free Search
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/pricing">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="text-lg px-12 py-8 group backdrop-blur-xl bg-background/30 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                      <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-8 pt-12"
              >
                {[
                  { icon: Zap, text: "Instant Results" },
                  { icon: Shield, text: "100% Secure" },
                  { icon: CheckCircle2, text: "No Credit Card" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-primary/5 border border-primary/10"
                    whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  >
                    <item.icon className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Live Stats Preview */}
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8"
              >
                {[
                  { value: counts.users, label: "Active Users", suffix: "+" },
                  { value: counts.searches, label: "Searches", suffix: "+" },
                  { value: counts.jobs, label: "Jobs Found", suffix: "+" },
                  { value: counts.success, label: "Success Rate", suffix: "%" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative backdrop-blur-xl bg-background/30 border border-primary/10 rounded-xl p-4 group-hover:border-primary/30 transition-colors">
                      <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary">
                        {stat.value.toLocaleString()}{stat.suffix}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Process Visualization */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-primary/5 border border-primary/20 text-sm font-medium mb-6">
                <Workflow className="h-4 w-4 text-cyan-400" />
                <span>Automated Workflow</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three steps to bypass recruiters and connect with real employers
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto mb-20"
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-primary/30 to-purple-500/30 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-xl bg-background/40">
                  <img 
                    src={processModern} 
                    alt="How CrewDog Works" 
                    className="w-full"
                  />
                </div>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  number: "01",
                  title: "Paste Job URL",
                  description: "Copy any LinkedIn job URL. Our AI instantly begins analysis of the posting content, metadata, and hidden signals.",
                  icon: Search,
                  gradient: "from-cyan-500 to-blue-500"
                },
                {
                  number: "02",
                  title: "AI Analyzes",
                  description: "Advanced neural networks decode the post, trace company footprints, and map hiring patterns in milliseconds.",
                  icon: Brain,
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  number: "03",
                  title: "Get Direct Access",
                  description: "Receive the actual company name, career pages, hiring manager contacts, and alternative application routes.",
                  icon: Target,
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ y: -10, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-2xl transition-opacity`} />
                    <Card className="relative h-full backdrop-blur-xl bg-background/40 border-primary/10 p-8 group-hover:border-primary/30 transition-all overflow-hidden">
                      <div className="absolute top-4 right-4 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                        {step.number}
                      </div>
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-2xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <step.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src={dataModernBg} alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-primary/5 border border-primary/20 text-sm font-medium mb-6">
                <Database className="h-4 w-4 text-cyan-400" />
                <span>Advanced Analytics</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                  Intelligence Dashboard
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time insights and company intelligence at your fingertips
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto perspective-1000"
            >
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/40 via-primary/40 to-purple-500/40 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
                <motion.div 
                  className="relative rounded-3xl overflow-hidden border border-primary/20 backdrop-blur-xl bg-background/50 shadow-2xl"
                  whileHover={{ scale: 1.02, rotateY: -2 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={dashboardModern} 
                    alt="Dashboard Interface" 
                    className="w-full"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
              {performanceData.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <Card className="backdrop-blur-xl bg-background/40 border-primary/10 p-6 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <Gauge className="h-5 w-5 text-cyan-400" />
                      <span className="text-3xl font-bold" style={{ color: metric.color }}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{metric.metric}</div>
                    <div className="mt-3 h-2 bg-background/50 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                  Why Choose CrewDog
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for modern job seekers who refuse to wait
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                { 
                  icon: Shield, 
                  title: "Bypass Gatekeepers", 
                  description: "Get past recruiter filters that block qualified candidates from reaching hiring managers",
                  gradient: "from-cyan-500 to-blue-500"
                },
                { 
                  icon: Target, 
                  title: "Direct Access", 
                  description: "Apply directly to decision makers and hiring managers without middleman interference",
                  gradient: "from-purple-500 to-pink-500"
                },
                { 
                  icon: Rocket, 
                  title: "400% Faster", 
                  description: "Direct applications get 4x higher response rates than applications through recruiters",
                  gradient: "from-green-500 to-emerald-500"
                },
                { 
                  icon: Database, 
                  title: "Company Intel", 
                  description: "Get detailed company information, culture insights, and recent hiring patterns",
                  gradient: "from-orange-500 to-red-500"
                },
                { 
                  icon: Network, 
                  title: "No Data Sharing", 
                  description: "Your information stays private - never shared with third-party recruiters",
                  gradient: "from-blue-500 to-cyan-500"
                },
                { 
                  icon: TrendingUp, 
                  title: "Higher Salaries", 
                  description: "Skip recruiter markup and negotiate directly for better compensation packages",
                  gradient: "from-pink-500 to-purple-500"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-2xl transition-opacity`} />
                    <Card className="relative h-full backdrop-blur-xl bg-background/40 border-primary/10 p-8 group-hover:border-primary/30 transition-all">
                      <motion.div 
                        className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          
          {/* Animated Background Elements */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                background: `radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)`,
                left: `${i * 40}%`,
                top: `${i * 30}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <Card className="relative backdrop-blur-2xl bg-background/60 border-primary/20 p-12 md:p-20 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-primary to-purple-500" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl bg-primary/10 border border-primary/20 text-sm font-medium mb-8"
                  >
                    <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary">
                      Join 8,500+ Smart Job Seekers
                    </span>
                  </motion.div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60">
                      Ready to Skip the Queue?
                    </span>
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Start finding real employers today. No credit card. No commitment. 
                    <span className="text-cyan-400 font-semibold"> Just results</span>.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                    <Link to="/run">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="lg" className="relative text-xl px-16 py-8 group overflow-hidden bg-gradient-to-r from-cyan-500 to-primary hover:from-cyan-400 hover:to-primary-glow shadow-2xl shadow-primary/50">
                          <span className="relative z-10 flex items-center gap-3">
                            Get Started Free
                            <Rocket className="h-6 w-6 group-hover:translate-y-[-2px] transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/pricing">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="lg" variant="outline" className="text-xl px-16 py-8 backdrop-blur-xl bg-background/30 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                          View Pricing
                        </Button>
                      </motion.div>
                    </Link>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                    {[
                      { icon: Zap, text: "Instant Access" },
                      { icon: Shield, text: "100% Secure" },
                      { icon: CheckCircle2, text: "Cancel Anytime" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <item.icon className="h-5 w-5 text-cyan-400" />
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
