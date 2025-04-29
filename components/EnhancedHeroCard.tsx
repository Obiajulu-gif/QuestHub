"use client"

import { useState } from "react"

interface HeroCardProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  imageSrc: string
  imageAlt: string
}

export default function EnhancedHeroCard({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageSrc,
  imageAlt
}: HeroCardProps) {
  const [isVisible, setIsVisible] = useState(false);

\
Let's create a new enhanced quest card component:
