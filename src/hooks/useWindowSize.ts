import { useEffect, useState, useCallback, useMemo} from 'react';

export function useWindowSize() {

  const hasWindow = useMemo(() => typeof window !== 'undefined', []);

  const getWindowDimensions = useCallback(() => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    return {
      innerWidth,
      innerHeight
    };
  }, []);

  const [windowSize, setWindowSize] = useState(getWindowDimensions);

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowSize(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [getWindowDimensions, hasWindow]);

  return windowSize;
};

// Fonte: https://www.codegrepper.com/code-examples/javascript/how+to+get+screen+width+in+react+js