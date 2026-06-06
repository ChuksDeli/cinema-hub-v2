'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export default function SectionHeader({ title, subtitle, viewAllHref }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-end justify-between mb-6"
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-7 bg-accent" />
          <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-widest">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-text-muted text-sm ml-4">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-xs text-accent hover:text-accent-hover font-medium tracking-widest uppercase border border-accent hover:border-accent-hover px-3 py-1.5 transition-colors"
        >
          View All
        </Link>
      )}
    </motion.div>
  );
}
