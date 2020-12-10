import React, { useEffect, useRef } from 'react';
 
const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;
 
  // list of icons
 
 
  // list of the marker object along with icon
  const markerList = [
    { lat: 41.8781, lng: -87.6298 }
  ]
 
  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map(x => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); // the map to contain all markers
  }, []);
 
 
  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
 
  // create marker on google map
  const createMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker width and height
      scaledSize: new window.google.maps.Size(50, 50)
    }
  });
 
  return <div
    ref={googleMapRef}
    style={{ width: 600, height: 500 }}
  />
}
 
export default GMap;