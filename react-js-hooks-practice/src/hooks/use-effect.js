import { useRef } from 'react';

const useCustomEffect = (effect, deps) => {
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);
  const cleanupRef = useRef(() => {});

  const checkDepsChanged = () => {
    if (prevDeps.current.length !== deps.length) return true;
    return deps.some((dep, index) => dep !== prevDeps.current[index]);
  };

  if (isFirstRender.current) {
    // First render
    isFirstRender.current = false;
    cleanupRef.current = effect();
  } else {
    // Check if dependencies have changed
    if (checkDepsChanged()) {
      // Call cleanup from previous effect
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      // Run new effect
      cleanupRef.current = effect();
    }
  }

  // Store previous dependencies
  prevDeps.current = deps;
};

export default useCustomEffect;
