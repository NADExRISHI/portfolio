import React, { useState } from "react";
import {
  Phone,
  Mail,
  Globe,
  UserPlus,
  QrCode,
  X,
  Download,
} from "lucide-react";
import qrImage from "../assets/qr.png";
import "./VisitingCard.css";

export interface VisitingCardProps {
  name: string;
  subtitle: string;
  avatarUrl: string;
  phone?: string;
  email?: string;
  website?: string;
  resumeUrl?: string;
  socials?: {
    icon: React.ReactNode;
    url: string;
    label: string;
  }[];
  vcfData?: string;
}

const VisitingCard: React.FC<VisitingCardProps> = ({
  name,
  subtitle,
  avatarUrl,
  phone,
  email,
  website,
  resumeUrl,
  socials,
  vcfData,
}) => {
  const [showQR, setShowQR] = useState(false);

  const handleSaveContact = () => {
    if (vcfData) {
      const blob = new Blob([vcfData], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/\s+/g, "_")}.vcf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Filter out Resume from socials since it gets its own download button
  const filteredSocials = socials?.filter((s) => s.label !== "Resume");

  return (
    <div className="vc-wrapper">
      <div className="vc-card">
        {/* Avatar */}
        <div className="vc-avatar-ring">
          <img src={avatarUrl} alt={name} className="vc-avatar" />
        </div>

        {/* Name & Subtitle */}
        <h2 className="vc-name">{name}</h2>
        <p className="vc-subtitle">{subtitle}</p>

        {/* Action Buttons */}
        <div className="vc-actions">
          {phone && (
            <a href={`tel:${phone}`} className="vc-action-btn">
              <Phone className="vc-action-icon" />
              <span>Call</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="vc-action-btn">
              <Mail className="vc-action-icon" />
              <span>Email</span>
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="vc-action-btn"
            >
              <Globe className="vc-action-icon" />
              <span>Website</span>
            </a>
          )}
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              className="vc-action-btn vc-action-btn--resume"
            >
              <Download className="vc-action-icon" />
              <span>Download Resume</span>
            </a>
          )}
        </div>

        {/* Social Icons Row */}
        {filteredSocials && filteredSocials.length > 0 && (
          <div className="vc-socials">
            {filteredSocials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="vc-social-btn"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}

        {/* QR Code Toggle */}
        {vcfData && (
          <button
            className="vc-qr-toggle"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? <X className="vc-qr-toggle-icon" /> : <QrCode className="vc-qr-toggle-icon" />}
            <span>{showQR ? "Close QR" : "Show QR Code"}</span>
          </button>
        )}

        {/* QR Code Display */}
        {showQR && vcfData && (
          <div className="vc-qr-container">
            <div className="vc-qr-box">
              <img
                src={qrImage}
                alt="QR Code"
                className="vc-qr-image"
              />
            </div>
            <p className="vc-qr-hint">Scan to save contact</p>
          </div>
        )}

        {/* Save Contact Button */}
        {vcfData && (
          <button className="vc-save-btn" onClick={handleSaveContact}>
            <UserPlus className="vc-save-icon" />
            <span>Save Contact (.vcf)</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VisitingCard;
