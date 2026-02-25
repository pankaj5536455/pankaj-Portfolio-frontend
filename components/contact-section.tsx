"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LogoLoadingSpinner from "@/components/logos/LogoLoadingSpinner"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" })
        setSubmitted(false)
      }, 3000)
    }, 1400)
  }

  return (
    <section id="contact" className="relative w-full py-20 px-6 lg:px-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-[0.2em] font-mono text-primary">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Have a project in mind? Whether you're exploring a new idea or scaling an existing system, 
            I'd love to hear from you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-widest">
                Email
              </h3>
              <a
                href="mailto:pankaj5536455@gmail.com"
                className="text-lg text-primary hover:text-primary/80 transition-colors break-all"
              >
                pankaj5536455@gmail.com
              </a>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-widest">
                Location
              </h3>
              <p className="text-muted-foreground">
                Available for remote collaboration worldwide
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                Connect
              </h3>
              <div className="flex gap-4">
                {[
                  { name: "GitHub", url: "#" },
                  { name: "LinkedIn", url: "#" },
                  { name: "Twitter", url: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-primary/30 hover:border-primary/50 text-primary hover:bg-primary/10 transition-all"
                  >
                    <span className="text-xs font-semibold">{social.name[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="rounded-lg border border-primary/20 bg-card/40 p-8">
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-80">
                <div className="text-center">
                  <div className="inline-block mb-4 p-3 rounded-lg bg-primary/10">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">I'll get back to you as soon as possible.</p>
                </div>
              </div>
            ) : isSubmitting ? (
              <div className="flex min-h-80 flex-col items-center justify-center gap-4">
                <LogoLoadingSpinner size={80} color="#0f766e" speed={1.4} />
                <p className="text-sm text-muted-foreground">Sending your message...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
