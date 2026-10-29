import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { DemoSlot } from '../components/home/DemoSlot';
import { ThreePillarsSection } from '../components/home/ThreePillarsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { PrivacyStrip } from '../components/home/PrivacyStrip';
import { AskAiMcpSection } from '../components/home/AskAiMcpSection';
import { LimitationsStrip } from '../components/home/LimitationsStrip';
import { CtaSection } from '../components/home/CtaSection';

export function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <DemoSlot />
      <ThreePillarsSection />
      <HowItWorksSection />
      <PrivacyStrip />
      <AskAiMcpSection />
      <LimitationsStrip />
      <CtaSection />
    </div>
  );
}
