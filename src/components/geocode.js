import React from 'react';
import GoogleMapReact from 'google-map-react';

function GoogleMaps({ latitude, longitude }){
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4
  });
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
    position: { lat: latitude, lng: longitude },
    map,
    title: 'Hello World!'
    });
    return marker;
 };

 
 return (
   <div style={{ height: '50vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyB9LwVR4EdVtYVmT3uuibKaU56O7XmmE8M' }}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
    >
    </GoogleMapReact>
   </div>
 );
};

export default GoogleMaps;