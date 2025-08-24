'use client'

import dynamic from 'next/dynamic';

const StarScene = dynamic(() => import('@/components/scenes/StarScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <StarScene/>
    </div>
  );
}
