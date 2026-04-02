"use client"

import { useEffect, useMemo, useState } from "react"
import { Mail, MessageSquare, Send, Sparkles } from "lucide-react"
import type { ProjectRecord } from "@/lib/project-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectAccessPayload, ProjectAccessResult } from "@/hooks/useProjects"

interface ProjectContactDialogProps {
  project: ProjectRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitRequest?: (project: ProjectRecord, payload: ProjectAccessPayload) => Promise<ProjectAccessResult>
}

type ContactMode = "quick" | "custom"

export function ProjectContactDialog({
  project,
  open,
  onOpenChange,
  onSubmitRequest,
}: ProjectContactDialogProps) {
  const [mode, setMode] = useState<ContactMode>("quick")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submissionResult, setSubmissionResult] = useState<ProjectAccessResult | null>(null)

  useEffect(() => {
    if (!open) {
      setMode("quick")
      setName("")
      setEmail("")
      setPhone("")
      setCustomMessage("")
      setSubmitted(false)
      setIsSubmitting(false)
      setError(null)
      setSubmissionResult(null)
    }
  }, [open, project?.slug])

  const quickMessage =
    project?.contactRouting?.quickMessage ||
    `Hi, I am interested in the ${project?.name || "project"} repository. Could you please share access or more details?`

  const resolvedMessage = useMemo(() => {
    if (mode === "custom" && customMessage.trim()) {
      return customMessage.trim()
    }
    return quickMessage
  }, [customMessage, mode, quickMessage])

  const composedPreview = useMemo(() => {
    const lines = [resolvedMessage]
    if (name.trim()) {
      lines.push(`Name: ${name.trim()}`)
    }
    if (email.trim()) {
      lines.push(`Email: ${email.trim()}`)
    }
    if (phone.trim()) {
      lines.push(`Phone: ${phone.trim()}`)
    }
    return lines.join("\n")
  }, [email, name, phone, resolvedMessage])

  const handleSubmit = async () => {
    if (!project) return

    if (!name.trim()) {
      setError("Please add your name.")
      return
    }

    if (!email.trim() && !phone.trim()) {
      setError("Please add at least an email or phone number.")
      return
    }

    if (mode === "custom" && !customMessage.trim()) {
      setError("Please enter your custom message.")
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      if (onSubmitRequest) {
        const result = await onSubmitRequest(project, {
          name,
          email,
          phone,
          message: resolvedMessage,
        })
        setSubmissionResult(result)
      } else {
        setSubmissionResult({
          message: "Project access request received",
          emailDelivery: true,
          whatsappNotification: true,
        })
      }
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not send request.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col overflow-hidden border-primary/20 bg-[#101726] p-0 text-foreground shadow-2xl sm:w-[min(1680px,calc(100vw-1rem))] sm:max-w-[min(1680px,calc(100vw-1rem))]">
        <div className="shrink-0 border-b border-white/8 bg-gradient-to-r from-primary/14 via-transparent to-primary/8 px-6 py-5">
          <DialogHeader className="gap-3 text-left">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary/80">
              <Sparkles className="size-3.5" />
              Private Repository Access
            </div>
            <DialogTitle className="text-2xl font-semibold">
              {project?.name || "Project"} Contact Flow
            </DialogTitle>
            <DialogDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Frontend prototype for the private-repo CTA. The backend step will connect this form to email and WhatsApp delivery without changing the user flow.
            </DialogDescription>
          </DialogHeader>
        </div>

        {submitted ? (
          <div className="scrollbar-hidden overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-300">
                  Request Staged
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {submissionResult?.message || "Project access request received."}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Your request has been recorded. Email delivery handles the main message, and a WhatsApp alert is also prepared for your notification flow.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Mail className="size-4 text-primary" />
                    Email Delivery
                  </div>
                  <p className="mt-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-muted-foreground">
                    {submissionResult?.emailDelivery
                      ? "Sent as the main access request."
                      : "Not enabled for this project."}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MessageSquare className="size-4 text-primary" />
                    WhatsApp Alert
                  </div>
                  <p className="mt-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-muted-foreground">
                    {submissionResult?.whatsappNotification
                      ? "Also notifies you through WhatsApp."
                      : "Not enabled for this project."}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Payload Preview
                </p>
                <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {composedPreview}
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setMode("quick")
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Compose Again
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-white/12 bg-transparent hover:bg-white/6"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="scrollbar-hidden overflow-y-auto px-6 py-6">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("quick")}
                    className={`rounded-full border px-4 py-2 text-center text-xs font-mono uppercase tracking-[0.18em] transition-colors ${
                      mode === "quick"
                        ? "border-primary/50 bg-primary/14 text-primary"
                        : "border-white/10 bg-white/4 text-muted-foreground hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    Quick Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("custom")}
                    className={`rounded-full border px-4 py-2 text-center text-xs font-mono uppercase tracking-[0.18em] transition-colors ${
                      mode === "custom"
                        ? "border-primary/50 bg-primary/14 text-primary"
                        : "border-white/10 bg-white/4 text-muted-foreground hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    Custom Message
                  </button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Message
                  </p>
                  {mode === "quick" ? (
                    <p className="mt-3 min-h-36 rounded-xl border border-white/10 bg-white/4 px-4 py-4 text-sm leading-relaxed text-foreground">
                      {quickMessage}
                    </p>
                  ) : (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        value={customMessage}
                        onChange={(event) => {
                          setCustomMessage(event.target.value)
                          if (error) setError(null)
                        }}
                        maxLength={320}
                        placeholder="Tell the developer what access you need, the context of the request, and how to reach you."
                        className="min-h-44 border-white/10 bg-white/4 text-foreground placeholder:text-muted-foreground/80"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Name + email or phone will be attached automatically.</span>
                        <span>{customMessage.length}/320</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      Your Name
                    </label>
                    <Input
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                        if (error) setError(null)
                      }}
                      placeholder="Your full name"
                      className="h-11 border-white/10 bg-white/4"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </label>
                    <Input
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (error) setError(null)
                      }}
                      placeholder="name@email.com"
                      className="h-11 border-white/10 bg-white/4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    Phone / WhatsApp
                  </label>
                  <Input
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="+91 98xxxxxx"
                    className="h-11 border-white/10 bg-white/4"
                  />
                </div>

                {error ? (
                  <p className="text-sm text-red-300" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Delivery Channels
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Mail className="size-4 text-primary" />
                        Email Delivery
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The submitted request is delivered by email.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <MessageSquare className="size-4 text-primary" />
                        WhatsApp Alert
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        A matching WhatsApp notification also appears for you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/18 bg-primary/8 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary/80">
                    Preview Payload
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
                    {composedPreview}
                  </pre>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    void handleSubmit()
                  }}
                  disabled={isSubmitting}
                  className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="size-4" />
                  {isSubmitting ? "Sending Request..." : "Send Request"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
