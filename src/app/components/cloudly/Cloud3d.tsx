// CloudIntro3D.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './CloudWorld3D.module.css';

export default function CloudIntro3D() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const world = worldRef.current;
    if (!viewport || !world) return;

    function createCloud(z: number, delay: number) {
      const div = document.createElement('div');
      div.className = styles.cloudLayer;
      div.style.backgroundImage = 'url("/clouds/cloud1.png")';

      const x = (Math.random() - 0.5) * viewport!.clientWidth * 0.5;
      const y = (Math.random() - 0.5) * viewport!.clientHeight * 0.5;

      div.style.opacity = '0';
      div.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(0.5)`;

      setTimeout(() => {
        div.style.transition = 'transform 15s ease-out, opacity 6s ease-out';
        div.style.opacity = '1';
        div.style.transform = `translate3d(${x}px, ${y - 50}px, 200px) scale(1.8)`;
      }, delay);

      setTimeout(() => {
        div.style.opacity = '0';
      }, delay + 5000);

      world!.appendChild(div);
    }

    // Запускаємо 3 хмарки з невеликим зміщенням у часі
    createCloud(-400, 0);
    createCloud(-500, 2000);
    createCloud(-600, 5000);
  }, []);

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <div ref={worldRef} className={styles.world}></div>
    </div>
  );
}
