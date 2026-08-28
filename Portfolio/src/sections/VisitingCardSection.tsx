import { motion } from "framer-motion";
import { User } from "lucide-react";
import VisitingCard from "@/components/VisitingCard";
import { Linkedin, Globe, MessageCircle } from "lucide-react";

const PROFILE = {
  name: "Rishikesh Patil",
  subtitle:
    "Engineering Student | Startup Enthusiast | Mobility Innovator",
  avatarUrl: "/profile.jpg",
  phone: "+91 8277747242",
  email: "rishikeshpatil82777@gmail.com",
  website: "https://rishikeshpatil.dev",
  resumeUrl: "/Rishikesh_Patil_Resume.pdf",
  socials: [
    {
      icon: <Linkedin />,
      url: "https://www.linkedin.com/in/rishikesh-patil-486421389?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      label: "LinkedIn",
    },
    {
      icon: <Globe />,
      url: "#",
      label: "Portfolio",
    },
    {
      icon: <MessageCircle />,
      url: "https://wa.me/918277747242",
      label: "WhatsApp",
    },
  ],
  vcfData: `BEGIN:VCARD
VERSION:3.0
FN:Rishikesh Patil
TEL;TYPE=CELL:+918277747242
EMAIL:rishikeshpatil82777@gmail.com
URL:https://rishikeshpatil.dev
TITLE:Engineering Student | Startup Enthusiast
NOTE:Engineering Student at GIT, Belagavi
END:VCARD`,
};

export function VisitingCardSection() {
  return (
    <section
      id="vcard"
      className="relative w-full overflow-hidden px-4 py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <User className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-[42px] font-medium tracking-tight text-text-primary ios-heading">
              Digital Visiting Card
            </h2>
          </div>
          <p className="mx-auto max-w-2xl px-4 text-base text-text-secondary sm:text-lg">
            Scan, connect, and save — your professional identity in one card.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <VisitingCard
            name={PROFILE.name}
            subtitle={PROFILE.subtitle}
            avatarUrl={PROFILE.avatarUrl}
            phone={PROFILE.phone}
            email={PROFILE.email}
            website={PROFILE.website}
            resumeUrl={PROFILE.resumeUrl}
            socials={PROFILE.socials}
            vcfData={PROFILE.vcfData}
          />
        </motion.div>
      </div>
    </section>
  );
}
