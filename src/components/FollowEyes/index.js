import React, { useEffect, useRef } from 'react';
import styles from './index.module.css';

const FollowEyes = () => {
  const eyesRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      eyesRef.current.forEach((eye) => {
        if (!eye) return;
        
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxDistance = 5;
        const rawDistance = Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 8;
        const distance = Math.min(maxDistance, rawDistance);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        const pupil = eye.querySelector(`.${styles.pupil}`);
        if (pupil) {
          pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const characters = [
    { color: '#ff6b6b' },
    { color: '#4ecdc4' },
    { color: '#ffe66d' },
  ];

  return (
    <div className={styles.container}>
      {characters.map((char, index) => (
        <div 
          key={index} 
          className={styles.blob}
          style={{ backgroundColor: char.color }}
        >
          <div className={styles.eyes}>
            <div 
              className={styles.eye}
              ref={(el) => (eyesRef.current[index * 2] = el)}
            >
              <div className={styles.pupil}></div>
            </div>
            <div 
              className={styles.eye}
              ref={(el) => (eyesRef.current[index * 2 + 1] = el)}
            >
              <div className={styles.pupil}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowEyes;
