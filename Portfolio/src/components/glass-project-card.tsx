"use client";


import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface GlassProjectCardProps {
    title: string;
    description: string;
    image: string;
    tech: string[];
    stars?: number;
    metrics?: Record<string, string | undefined>;
    className?: string;
}

export function GlassProjectCard({
    title,
    description,
    image,
    tech,
    stars,
    metrics,
    className,
}: GlassProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("w-full", className)}
        >
            <Card className="group relative h-full flex flex-col overflow-hidden rounded-2xl border-border/50 bg-card/30 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                    <motion.img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />




                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-3 p-5 grow">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[24px] font-semibold font-display leading-tight tracking-tight text-[color:var(--text-primary)] transition-colors group-hover:text-[color:var(--accent)]">
                            {title}
                        </h3>
                        {stars !== undefined && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground font-medium bg-background/50 px-2.5 py-1 rounded-full border border-border/50 shrink-0">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span>{stars}</span>
                            </div>
                        )}
                    </div>

                    {/* Tech Stack — always visible */}
                    {tech && tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {tech.map((t, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-[18px] leading-[1.75] font-normal text-[color:var(--text-secondary)]">
                        {description}
                    </p>

                    {/* Metrics Section */}
                    {metrics && (
                        <div className="mt-auto grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-border/50 pt-4">
                            {Object.entries(metrics).map(([key, value]) => (
                                <div key={key} className="flex flex-col">
                                    <span className="text-[color:var(--text-muted)] uppercase opacity-[0.8]" style={{ fontSize: "10px" }}>{key}</span>
                                    <span className="font-medium text-[color:var(--text-primary)]">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
