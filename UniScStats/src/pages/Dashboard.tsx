// src/pages/Home.tsx
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedStats from '@/components/FeaturedStats';
import LatestReleases from '@/components/LatestReleases';
import PopularStats from '@/components/PopularStats';
import MermaidPage from './mermaid-page';

const Home = () => {
  return (
    <>
      <HeroSection />
      <LatestReleases />
      <PopularStats />
      {/* <MermaidPage/> */}
      {/* <FeaturedStats /> */}
    </>
  );
};

export default Home;
