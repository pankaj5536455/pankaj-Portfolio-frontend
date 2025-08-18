"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Code2,
  Cpu,
  Brain,
  Palette,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const roles = ["Full-Stack Developer", "IoT Engineer", "AI Enthusiast", "Problem Solver"]

  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const skills = [
    {
      category: "Frontend",
      color: "from-cyan-400 to-blue-500",
      icon: <Code2 className="w-6 h-6" />,
      techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      color: "from-emerald-400 to-teal-500",
      icon: <Cpu className="w-6 h-6" />,
      techs: ["Java", "Spring Boot", "Node.js", "Python"],
    },
    {
      category: "AI/ML",
      color: "from-purple-400 to-pink-500",
      icon: <Brain className="w-6 h-6" />,
      techs: ["Python", "Weka", "TensorFlow", "Pandas"],
    },
    {
      category: "IoT",
      color: "from-amber-400 to-orange-500",
      icon: <Palette className="w-6 h-6" />,
      techs: ["Arduino", "ESP32", "C/C++", "Fusion 360"],
    },
  ]

  const projects = [
    {
      title: "Smart IoT Dashboard",
      description: "Real-time monitoring system for environmental sensors with predictive analytics",
      image: "/placeholder.svg?height=300&width=400",
      techs: ["React", "Node.js", "Arduino", "MongoDB"],
      github: "#",
      live: "#",
    },
    {
      title: "AI-Powered CMS",
      description: "Content management system with intelligent categorization and SEO optimization",
      image: "/placeholder.svg?height=300&width=400",
      techs: ["Spring Boot", "React", "Python", "MySQL"],
      github: "#",
      live: "#",
    },
    {
      title: "Mobile Expense Tracker",
      description: "Cross-platform app with ML-based spending pattern analysis",
      image: "/placeholder.svg?height=300&width=400",
      techs: ["React Native", "Firebase", "Python", "TensorFlow"],
      github: "#",
      live: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Pankaj Kumar
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "Skills", "Projects", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-cyan-400 transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="activeSection"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-800 border-t border-slate-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-2 space-y-2">
              {["Home", "Skills", "Projects", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Pankaj Kumar
            </span>
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl text-slate-300 mb-8 h-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRole]}
            </motion.span>
          </motion.div>

          <motion.p
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bridging the gap between hardware and software, creating intelligent solutions that make a difference. From
            IoT devices to AI-powered applications.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              What I Build With
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A diverse toolkit spanning multiple domains, from embedded systems to cloud applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{skill.category}</h3>
                    <div className="space-y-2">
                      {skill.techs.map((tech) => (
                        <div
                          key={tech}
                          className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full inline-block mr-2 mb-2"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real-world solutions combining multiple technologies to solve complex problems
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden hover:bg-slate-800/70 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                    <p className="text-slate-400 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techs.map((tech) => (
                        <span key={tech} className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  I'm a passionate developer who believes in the power of technology to solve real-world problems. My
                  journey spans from embedded systems and IoT devices to full-stack web applications and AI/ML
                  solutions.
                </p>
                <p>
                  What drives me is the intersection of hardware and software - creating intelligent systems that bridge
                  the physical and digital worlds. I approach every project with a calm, analytical mindset while
                  maintaining attention to detail and sustainable thinking.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                  or thinking about how technology can create a more sustainable future.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">15+</div>
                  <div className="text-sm text-slate-400">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400">8+</div>
                  <div className="text-sm text-slate-400">Technologies Mastered</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Pankaj Kumar"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>

              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Github className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 Pankaj Kumar. Built with Next.js, Tailwind CSS, and Framer Motion.</p>
        </div>
      </footer>
    </div>
  )
}
