// src/hooks/useSyncScroll.js
import { useEffect } from 'react';

const useSyncScroll = (refs) => {
  useEffect(() => {
    if (refs.length === 0) return;

    const handleScroll = (e) => {
      refs.forEach((ref) => {
        if (ref.current && ref.current !== e.target) {
          ref.current.scrollLeft = e.target.scrollLeft;
        }
      });
    };

    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener('scroll', handleScroll);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.removeEventListener('scroll', handleScroll);
        }
      });
    };
  }, [refs]);
};

export default useSyncScroll;
