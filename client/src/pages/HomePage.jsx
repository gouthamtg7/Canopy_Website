import React from 'react';
import { Hero } from '../components/home/Hero';
import { DemoSection } from '../components/home/DemoSection';
import { Videos } from '../components/home/Videos';
import { Reviews } from '../components/home/Reviews';
import { InstallCta } from '../components/home/InstallCta';

export function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <DemoSection />
      <Videos />
      <Reviews />
      <InstallCta />
    </div>
  );
}
