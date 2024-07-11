import { useEffect, useState } from 'react';

function useScrollThreshold({ threshold = 10 }) {
  const [isScrollThresholdPassed, setIsScrollThresholdPassed] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      setIsScrollThresholdPassed(window.scrollY > threshold);
    }

    updateScrollState();

    function handleScroll() {
      updateScrollState();
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrollThresholdPassed };
}

export default useScrollThreshold;
