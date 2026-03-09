"use client";

import React, { useRef, useCallback } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
    /** Display name */
    name?: string;
    /** Job title / subtitle */
    title?: string;
    /** Social handle shown below name, e.g. @javicodes */
    handle?: string;
    /** Status text shown on badge, e.g. "Online" */
    status?: string;
    /** Contact button label */
    contactText?: string;
    /** Avatar image URL */
    avatarUrl?: string;
    /** Show the name / handle / status row */
    showUserInfo?: boolean;
    /** Enable 3-D tilt on mouse move (desktop) */
    enableTilt?: boolean;
    /** Enable tilt on mobile pointer events */
    enableMobileTilt?: boolean;
    /** Callback when contact button is clicked */
    onContactClick?: () => void;
    /** HSLA/CSS color for the behind-card glow */
    behindGlowColor?: string;
    /** Whether to render the behind-card glow */
    behindGlowEnabled?: boolean;
    /** URL of the repeating icon / pattern image rendered behind the card content */
    iconUrl?: string;
    /** CSS gradient string for the inner card overlay */
    innerGradient?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name = "Javi A. Torres",
    title = "Software Engineer",
    handle = "javicodes",
    status = "Online",
    contactText = "Contact Me",
    avatarUrl,
    showUserInfo = true,
    enableTilt = true,
    enableMobileTilt = false,
    onContactClick,
    behindGlowColor = "hsla(238, 100%, 70%, 0.6)",
    behindGlowEnabled = true,
    iconUrl,
    innerGradient = "linear-gradient(145deg, hsla(238,40%,45%,0.55) 0%, hsla(352,60%,70%,0.27) 100%)",
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    /* ── Tilt handler ──────────────────────────────────────────────── */
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!enableTilt) return;
            const card = cardRef.current;
            const shine = shineRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const rotX = (-dy / (rect.height / 2)) * 12;
            const rotY = (dx / (rect.width / 2)) * 12;

            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;

            // Shine position
            const pctX = ((e.clientX - rect.left) / rect.width) * 100;
            const pctY = ((e.clientY - rect.top) / rect.height) * 100;
            if (shine) {
                shine.style.setProperty("--mouse-x", `${pctX}%`);
                shine.style.setProperty("--mouse-y", `${pctY}%`);
            }
        },
        [enableTilt]
    );

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!enableMobileTilt || e.pointerType !== "touch") return;
            // Reuse tilt logic for touch
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const rotX = (-dy / (rect.height / 2)) * 8;
            const rotY = (dx / (rect.width / 2)) * 8;
            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        },
        [enableMobileTilt]
    );

    const resetTilt = useCallback(() => {
        const card = cardRef.current;
        if (card) card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    }, []);

    /* ── Glow tracker ──────────────────────────────────────────────── */
    const handleMouseMoveGlow = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const glow = glowRef.current;
            if (!glow || !behindGlowEnabled) return;
            const rect = wrapperRef.current?.getBoundingClientRect();
            if (!rect) return;
            glow.style.left = `${e.clientX - rect.left}px`;
            glow.style.top = `${e.clientY - rect.top}px`;
        },
        [behindGlowEnabled]
    );

    return (
        <div
            ref={wrapperRef}
            className="pc-card-wrapper"
            onMouseMove={(e) => {
                handleMouseMove(e);
                handleMouseMoveGlow(e);
            }}
            onMouseLeave={resetTilt}
            onPointerMove={handlePointerMove}
        >
            {/* Behind glow blob */}
            {behindGlowEnabled && (
                <div
                    ref={glowRef}
                    className="pc-behind-glow"
                    style={{ background: behindGlowColor }}
                />
            )}

            <div ref={cardRef} className="pc-card">
                {/* Icon / pattern background layer */}
                {iconUrl && (
                    <div
                        className="pc-icon-pattern"
                        style={{ backgroundImage: `url(${iconUrl})` }}
                    />
                )}

                {/* Inner gradient overlay */}
                {innerGradient && (
                    <div className="pc-inner-gradient" style={{ background: innerGradient }} />
                )}

                {/* Ambient base gradient */}
                <div className="pc-ambient" />

                {/* Shine */}
                <div ref={shineRef} className="pc-shine" />

                {/* Card content */}
                <div className="pc-inner">
                    {/* Avatar */}
                    {avatarUrl && (
                        <div className="pc-avatar-wrap">
                            <img src={avatarUrl} alt={name} />
                            <span className="pc-badge" aria-label={status} />
                        </div>
                    )}

                    {showUserInfo && (
                        <>
                            <div className="pc-name">{name}</div>
                            <div className="pc-handle">@{handle}</div>
                            <div className="pc-title-text">{title}</div>
                        </>
                    )}

                    {/* Contact button */}
                    <button className="pc-btn" onClick={onContactClick}>
                        {contactText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
