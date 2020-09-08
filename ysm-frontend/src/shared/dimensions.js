import { useState, useEffect } from 'react';

// const isBrowser = () => typeof window !== 'undefined';

function getWindowDimensions() {
  // TODO: Delete these two once this get's fixed
  const width = 760;
  const height = 0;

  // const { innerWidth: width, innerHeight: height } = isBrowser ? window : {};
  return width > 752 ? {
    width: 752, height: 731,
  } : {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
