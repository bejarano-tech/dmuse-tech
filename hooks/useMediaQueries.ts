import { useMediaQuery } from 'react-responsive'
import { md, lg, sm, xs, tb, xl, xxl } from '@/constants/breakpoints'

interface UseMediaQueries {
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
  isMobileOrTablet: boolean
  isLargerDevice?: boolean
  isExtraSmallDevice?: boolean
  isMobileScreen?: boolean
  isWiderDesktop?: boolean
  isTabletActive?: boolean
  isTabletLandscape?: boolean
  isTabletDevice?: boolean
  isHandheldDevice?: boolean
}

const useMediaQueries = (): UseMediaQueries => {
  const isExtraSmallDevice = useMediaQuery({ minWidth: `${xs}px`, maxWidth: `${sm - 1}px` })
  const isMobileScreen = useMediaQuery({ minWidth: `${sm}px`, maxWidth: `${md - 1}px` })
  const isDesktop = useMediaQuery({ minWidth: lg })
  const isTabletActive = useMediaQuery({ minWidth: md })
  const isTabletDevice = useMediaQuery({ minWidth: tb })
  const isTabletLandscape = useMediaQuery({ minWidth: `${tb}px`, maxWidth: `${xl - 1}px` })
  const isWiderDesktop = useMediaQuery({ minWidth: `${xl}px`, maxWidth: `${xxl - 1}px` })
  const isLargerDevice = useMediaQuery({ minWidth: `${xxl}px` })
  const isHandheldDevice = useMediaQuery({ minWidth: `${xs}px`, maxWidth: `${tb - 1}px` })

  // TODO: In case they are needed in the future:
  // const isPortrait = useMediaQuery({ orientation: 'portrait' });
  // const isRetina = useMediaQuery({ minResolution: '2dppx' });

  const isTablet = !isDesktop && isTabletActive
  const isMobile = !isDesktop && !isTablet
  const isMobileOrTablet = !isDesktop

  return {
    isDesktop,
    isTablet,
    isMobile,
    isMobileOrTablet,
    isExtraSmallDevice,
    isMobileScreen,
    isWiderDesktop,
    isLargerDevice,
    isTabletActive,
    isTabletLandscape,
    isTabletDevice,
    isHandheldDevice
  }
}

export default useMediaQueries
