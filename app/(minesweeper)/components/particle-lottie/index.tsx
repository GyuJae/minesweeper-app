'use client';

import Lottie, { LottieComponentProps } from 'lottie-react';
import React from 'react';

import particleLottie from '@/public/lotties/particle-lottie.json';

interface Properties extends Omit<LottieComponentProps, 'animationData'> {}

const ParticleLottie = (properties: Properties) => {
  return <Lottie animationData={particleLottie} {...properties} />;
};

export default ParticleLottie;
