// src/hooks/useMapRouteOpener.ts

export const useMapRouteOpener = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
    const openInGoogleMaps = (lat: number, lng: number) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    };
  
    const openInAppleMaps = (lat: number, lng: number) => {
      const url = `maps://?daddr=${lat},${lng}`;
      window.location.href = url;
    };
  
    const openBestAvailable = (lat: number, lng: number) => {
      if (isIOS) {
        openInAppleMaps(lat, lng);
      } else {
        openInGoogleMaps(lat, lng);
      }
    };
  
    return {
      openInGoogleMaps,
      openInAppleMaps,
      openBestAvailable,
    };
  };
  