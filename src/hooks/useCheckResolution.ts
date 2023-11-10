'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material';

const useCheckResolution = () => {
  const theme = useTheme();
  const [width, setWidth] = useState(document.body.clientWidth);
  const valuesBreakPoint = theme.breakpoints.values;

  useEffect(() => {
    const handlerResize = () => {
      setWidth(document.body.clientWidth);
    };

    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  const isTablet = useMemo(() => {
    return width <= theme.breakpoints.values.md;
  }, [valuesBreakPoint, width]);

  const isMobile = useMemo(() => {
    return width <= theme.breakpoints.values.sm;
  }, [valuesBreakPoint, width]);

  const isDesktop = useMemo(() => {
    return width > theme.breakpoints.values.md;
  }, [valuesBreakPoint, width]);

  return useMemo(
    () => ({
      width,
      isTablet,
      isMobile,
      isDesktop,
    }),
    [width, isTablet, isDesktop, isMobile]
  );
};

export default useCheckResolution;
