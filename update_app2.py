import re

# Update App.tsx
app_file = r'd:\\Projects\\Portfolio\\adi_resume\\Portfolio\\src\\App.tsx'
with open(app_file, 'r', encoding='utf-8') as f:
    app_content = f.read()

experience_repl = '''const EXPERIENCE = [
  {
    role: "B.Tech in Computer Science & Engineering (AIML)",
    company: "Jain College of Engineering and Research",
    period: "7.7 CGPA",
    location: "Belgaum",
    highlights: [
      "Currently pursuing B.Tech with focus on Artificial Intelligence and Machine Learning.",
      "Leading technical and volunteer initiatives across the university."
    ]
  },
  {
    role: "Chair",
    company: "IEEE Student Branch JCER",
    period: "2026 - 2027",
    location: "Belgaum",
    highlights: [
      "Leading the student branch for 2026 as the Chair.",
      "Organizing and managing technical activities, student life, and volunteer functions."
    ],
  },
  {
    role: "Technical Committee (Member)",
    company: "IEEE Bangalore Section SAC",
    period: "2026 - 2027",
    location: "Bangalore",
    highlights: [
      "Working as a volunteer in the technical committee, Students Association Committee (SAC) under IEEE Bangalore Section.",
      "Organizing and managing technical activities, student life, and volunteer functions throughout the region."
    ],
  },
  {
    role: "Co-Lead (Technical Committee)",
    company: "IEEE North Karnataka Sub-Section (NKSS)",
    period: "2025 - 2026",
    location: "North Karnataka",
    highlights: [
      "Worked as Co-Lead in the technical committee, Students Association Committee (SAC) under IEEE North Karnataka Subsection.",
      "Organized and managed technical activities, student life, and volunteer functions throughout the region."
    ],
  },
  {
    role: "Publications & Research",
    company: "IEEE & Independent",
    period: "2024",
    location: "Published",
    highlights: [
      "Beyond Passwords: The Essence and Impact of Multi-Factor Authentication in Cybersecurity (IEEE, May 2024).",
      "Explored MFA vulnerabilities, bypass techniques, and modern security solutions using adaptive AI.",
      "AR and AI for Driver Assistance and Navigation: A comprehensive study on the synergy between Spatial Computing (AR) and Computer Vision (AI) for Next-Gen HUDs."
    ]
  }
];'''
app_content = re.sub(r'const EXPERIENCE = \[.*?\];\n', experience_repl + '\\n', app_content, flags=re.DOTALL)

with open(app_file, 'w', encoding='utf-8') as f:
    f.write(app_content)

# Update Contact.tsx
contact_file = r'd:\\Projects\\Portfolio\\adi_resume\\Portfolio\\src\\sections\\Contact.tsx'
with open(contact_file, 'r', encoding='utf-8') as f:
    contact_content = f.read()

contact_content = contact_content.replace('adityavpatili818@gmail.com', 'adityavpatil818@gmail.com')

with open(contact_file, 'w', encoding='utf-8') as f:
    f.write(contact_content)

print("Updated App.tsx and Contact.tsx successfully")
