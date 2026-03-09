"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "adityavpatili818@gmail.com",
    href: "mailto:adityavpatili818@gmail.com",
  },

  {
    icon: MapPin,
    label: "Location",
    value: "Belgaum, India",
    href: "#",
  },
];

export function ContactBlock() {
  return (
    <section id="contact" className="relative w-full overflow-hidden px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[color:var(--text-primary)] sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base text-[color:var(--text-secondary)] sm:text-lg">
            Ready to craft the next standout experience? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/45 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent" />
              <form
                action="mailto:adityavpatili818@gmail.com"
                method="post"
                encType="text/plain"
                className="relative z-10 space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-[color:var(--text-secondary)]">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="bg-[color:var(--surface)] transition-colors border-[color:var(--border)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus-visible:ring-[color:var(--accent)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[color:var(--text-secondary)]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-[color:var(--surface)] transition-colors border-[color:var(--border)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus-visible:ring-[color:var(--accent)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-[color:var(--text-secondary)]">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can I help you?"
                    className="bg-[color:var(--surface)] transition-colors border-[color:var(--border)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus-visible:ring-[color:var(--accent)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-[color:var(--text-secondary)]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="resize-none bg-[color:var(--surface)] transition-colors border-[color:var(--border)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus-visible:ring-[color:var(--accent)]"
                  />
                </div>

                <Button type="submit" className="w-full gap-2 text-base rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2.5 font-medium text-[color:var(--text-primary)] shadow-sm backdrop-blur-md cursor-pointer hover:bg-[color:var(--accent)] hover:text-white transition-all">
                  Send Message
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6 lg:space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <Card className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/45 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 sm:p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent" />
                    <a
                      href={info.href}
                      className="relative z-10 flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--accent)]/10 text-[color:var(--accent)] transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-white">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[color:var(--text-primary)]">
                          {info.label}
                        </h3>
                        <p className="text-sm transition-colors text-[color:var(--text-semibold)]">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
