"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle,
    ChevronDown,
    Info,
    type LucideIcon,
    X,
} from "lucide-react";
import { useState } from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

export type NotificationConfig = {
    title: string;
    message: string;
    description: string;
    action: {
        label: string;
        onClick: () => void;
    };
    icon: LucideIcon;
    toneClassName: string;
};

export type ActiveNotification = {
    id: string;
    type: NotificationType;
};

export const NOTIFICATION_CONFIGS: Record<NotificationType, NotificationConfig> = {
    success: {
        title: "Success",
        message: "Operation completed successfully",
        description:
            "Your changes have been saved to the database. All updates are now live.",
        action: {
            label: "View Details",
            onClick: () => console.log("View details"),
        },
        icon: CheckCircle,
        toneClassName: "text-green-500",
    },
    error: {
        title: "Error Occurred",
        message: "Something went wrong",
        description:
            "Failed to process your request. Please try again or contact support if the issue persists.",
        action: { label: "Retry", onClick: () => console.log("Retry") },
        icon: AlertCircle,
        toneClassName: "text-red-500",
    },
    warning: {
        title: "Warning",
        message: "Action Required",
        description:
            "This action may have side effects. Please review the details.",
        action: { label: "Learn More", onClick: () => console.log("Learn more") },
        icon: AlertTriangle,
        toneClassName: "text-yellow-500",
    },
    info: {
        title: "Information",
        message: "New update available",
        description:
            "Check out the new features deployed to the production environment.",
        action: { label: "Explore", onClick: () => console.log("Explore") },
        icon: Info,
        toneClassName: "text-blue-500",
    },
};

type NotificationBarProps = {
    config: NotificationConfig;
    type: NotificationType;
    notificationId: string;
    onDismiss: () => void;
    prefersReducedMotion: boolean;
};

export function NotificationBar({
    config,
    type,
    notificationId,
    onDismiss,
    prefersReducedMotion,
}: NotificationBarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        action,
        description,
        icon: Icon,
        message,
        title,
        toneClassName,
    } = config;

    return (
        <motion.div
            role="listitem"
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-full max-w-sm"
        >
            <Card className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 backdrop-blur shadow-xl dark:bg-[color:var(--plum-50)]/90 dark:border-[color:var(--plum-100)]/20">
                <div
                    aria-hidden="true"
                    className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/80 dark:bg-black/20",
                        toneClassName
                    )}
                >
                    <Icon className="h-5 w-5" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground">{message}</p>
                        </div>
                        <motion.button
                            type="button"
                            onClick={() => setIsExpanded((prev) => !prev)}
                            aria-expanded={isExpanded}
                            aria-controls={`notification-details-${notificationId}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:text-foreground dark:bg-white/5"
                        >
                            <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="flex"
                            >
                                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </motion.span>
                            <span className="sr-only">
                                {isExpanded ? "Hide details" : "Show details"}
                            </span>
                        </motion.button>
                    </div>
                    <AnimatePresence initial={false}>
                        {isExpanded && (
                            <motion.div
                                key="details"
                                id={`notification-details-${notificationId}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-2 space-y-3 border-t border-border/40 pt-3 text-sm text-muted-foreground">
                                    <p>{description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={action.onClick}
                                            className="rounded-full text-xs h-7 px-3"
                                        >
                                            {action.label}
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            className="rounded-full text-xs h-7 px-3"
                                            onClick={() => {
                                                onDismiss();
                                            }}
                                        >
                                            Dismiss
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    type="button"
                    onClick={onDismiss}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Dismiss ${type} notification`}
                >
                    <X className="h-4 w-4" aria-hidden="true" />
                </motion.button>
            </Card>
        </motion.div>
    );
}

export function NotificationOverlay({
    notifications,
    removeNotification,
}: {
    notifications: ActiveNotification[];
    removeNotification: (id: string) => void;
}) {


    return (
        <div
            aria-live="polite"
            role="status"
            className="pointer-events-none fixed right-0 top-0 z-50 flex h-full flex-col items-end gap-2 p-4 sm:p-6"
        >
            <AnimatePresence initial={false} mode="popLayout">
                {notifications.map((notification) => {
                    const config = NOTIFICATION_CONFIGS[notification.type];
                    return (
                        <NotificationBar
                            key={notification.id}
                            config={config}
                            type={notification.type}
                            notificationId={notification.id}
                            onDismiss={() => removeNotification(notification.id)}
                            prefersReducedMotion={false}
                        />
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
