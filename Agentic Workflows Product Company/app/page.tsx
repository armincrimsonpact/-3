import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Play,
  Star
} from "lucide-react"

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <MainNav />

      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-aubergine-700 via-blush-500 to-gold-600 animate-gradient opacity-90"></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-sage-400/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gold-600/20 rounded-full blur-xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-blush-500/20 rounded-full blur-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <ScrollReveal animation="fade" direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-warm-50">
                Transform Your
                <span className="text-gold-600 block">Workflows</span>
                <span className="text-sage-400">with AI</span>
              </h1>
              <p className="text-xl text-warm-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Intelligent AI workflows that adapt, learn, and optimize your business processes automatically. 
                Reduce manual tasks by 80% and boost productivity with our agentic AI platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button 
                  className="bg-gold-600 hover:bg-gold-700 text-warm-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  className="border-2 border-warm-50 text-warm-50 hover:bg-warm-50 hover:text-aubergine-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade" direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "80%", label: "Time Saved", icon: Zap },
                { number: "500+", label: "Companies", icon: Users },
                { number: "99.9%", label: "Uptime", icon: Shield },
                { number: "3x", label: "Productivity", icon: TrendingUp },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-sage-400" />
                  </div>
                  <div className="text-3xl font-bold text-aubergine-700 mb-1">{stat.number}</div>
                  <div className="text-charcoal-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 px-6 bg-warm-100">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade" direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-aubergine-700 mb-6">
                AI Capabilities That
                <span className="text-gold-600 block">Transform Workflows</span>
              </h2>
              <p className="text-xl text-charcoal-500 max-w-2xl mx-auto">
                Our intelligent AI agents work seamlessly across your existing systems, 
                learning and adapting to optimize every process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Intelligent Learning",
                  description: "AI agents that learn from your workflows and continuously improve performance over time.",
                  color: "sage"
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Execute complex workflows in seconds, not hours. Real-time processing and instant results.",
                  color: "gold"
                },
                {
                  icon: TrendingUp,
                  title: "Performance Analytics",
                  description: "Deep insights into workflow efficiency with predictive analytics and optimization suggestions.",
                  color: "blush"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level security with end-to-end encryption and compliance with industry standards.",
                  color: "aubergine"
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Seamless integration with your team's existing tools and workflows for maximum efficiency.",
                  color: "sage"
                },
                {
                  icon: BarChart3,
                  title: "Smart Automation",
                  description: "Automate repetitive tasks while maintaining human oversight and control where needed.",
                  color: "gold"
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-warm-50 border border-warm-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${feature.color}-200 transition-colors`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-aubergine-700 mb-4">{feature.title}</h3>
                  <p className="text-charcoal-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-aubergine-700 to-aubergine-800">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade" direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-warm-50 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-warm-100 max-w-2xl mx-auto">
                Get started with intelligent workflow automation in just three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Connect Your Systems",
                  description: "Integrate with your existing tools and platforms through our secure API connections.",
                  icon: "🔗"
                },
                {
                  step: "02",
                  title: "Define Your Workflows",
                  description: "Use our intuitive interface to map out your processes and set automation rules.",
                  icon: "⚙️"
                },
                {
                  step: "03",
                  title: "Watch AI Optimize",
                  description: "Our AI agents take over, learning and improving your workflows automatically.",
                  icon: "🚀"
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                    {process.icon}
                  </div>
                  <div className="text-gold-600 font-bold text-sm mb-2">{process.step}</div>
                  <h3 className="text-xl font-bold text-warm-50 mb-4">{process.title}</h3>
                  <p className="text-warm-100 leading-relaxed">{process.description}</p>
                  
                  {/* Connector Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gold-600/30 transform -translate-y-1/2 z-0"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade" direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-aubergine-700 mb-6">
                Trusted by Industry Leaders
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Agentic Workflows transformed our entire operation. We've reduced manual processing time by 85%.",
                  author: "Sarah Chen",
                  role: "CTO, TechFlow Inc",
                  rating: 5
                },
                {
                  quote: "The AI learning capabilities are incredible. Our workflows keep getting smarter every day.",
                  author: "Michael Rodriguez",
                  role: "Operations Director, DataCorp",
                  rating: 5
                },
                {
                  quote: "Finally, a solution that actually understands our business processes and adapts to them.",
                  author: "Emily Watson",
                  role: "VP Engineering, InnovateLab",
                  rating: 5
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  className="bg-warm-100 border border-warm-200 rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-600 fill-current" />
                    ))}
                  </div>
                  <p className="text-charcoal-500 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-aubergine-700">{testimonial.author}</div>
                    <div className="text-sm text-charcoal-400">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fade" direction="up">
            <h2 className="text-4xl font-bold text-warm-50 mb-6">
              Ready to Transform Your Workflows?
            </h2>
            <p className="text-xl text-warm-100 mb-8">
              Join thousands of companies already using Agentic Workflows to automate and optimize their processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-aubergine-700 hover:bg-aubergine-800 text-warm-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button 
                className="border-2 border-warm-50 text-warm-50 hover:bg-warm-50 hover:text-aubergine-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
