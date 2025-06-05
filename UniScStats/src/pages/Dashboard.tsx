// src/pages/Home.tsx
import React from 'react';
import HeaderCards from '@/components/HeaderCards';
import FeaturedStats from '@/components/FeaturedStats';
import LatestReleases from '@/components/LatestReleases';
import PopularStats from '@/components/PopularStats';

const Home = () => {
  return (
    <>
      <HeaderCards />
      <LatestReleases />
      <PopularStats />
    </>
  );
};

export default Home;
