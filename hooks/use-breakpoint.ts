import {useViewport} from "@/hooks/use-viewport";

export const useBreakpoint = () => {
  const { width } = useViewport();

  const breakpoints = {
    sm: width >= 640,
    md: width >= 768,
    lg: width >= 1024,
    xl: width >= 1280,
    '2xl': width >= 1536,
  };

  const getCurrentBreakpoint = () => {
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs';
  };

  return {
    ...breakpoints,
    width,
    current: getCurrentBreakpoint(),
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
};