import { useEffect, useRef } from 'react';

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const { root = null, rootMargin = '0px', threshold = 0.1, triggerOnce = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        if (triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else if (!triggerOnce) {
        entry.target.classList.remove('reveal-visible');
      }
    }, { root, rootMargin, threshold });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return ref;
};

export default useScrollReveal;
