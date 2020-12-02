import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';


const GoogleMapExample = compose(
    withGoogleMap
)
    (props =>
        <GoogleMap
            zoom={15}
            center={props.markerPosition}
        >
            <Marker position={props.markerPosition} />

        </GoogleMap>
    )

export default class Map extends React.Component {
    

    state = {
      coordinates: { lat: 40.25, lng: -75.22 }
    }

    componentDidMount() {
      this.setState({
        coordinates: { lat:this.props.latitude, lng: this.props.longitude}
      });
    }

    render() {
        const lat =parseFloat(this.props.latitude)
        const lng =parseFloat(this.props.longitude)
        console.log(lat,lng)
        return (
            <div style={{ height: '100%' }}>
                <GoogleMapExample
                    markerPosition={this.state.coordinates}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw"
                    loadingElement={<div style={{ height: `50%` }} />}
                    containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}
// import React, { Component } from 'react';
// import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

// const GoogleMapExample = withGoogleMap(props => {
    
//     return(
//         <GoogleMap
//             ref={props.onMapLoad}
//             zoom={15}
//             center={{ lat: 44.11, lng: 28.25 }}
//             onClick={props.onMapClick}
//             >
//             {props.markers.map(marker => (
//             <Marker
//                 {...marker}
                
//             />
//             ))}
//         </GoogleMap>
//     )
// });



// export default class Map extends Component {
//    render() {
//        const lat =parseFloat(this.props.latitude)
//        const lng =parseFloat(this.props.longitude)
//        console.log(lat,lng)
       

//     return(
//         <div>
//             <GoogleMapExample
//             containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
//             mapElement={ <div style={{ height: `100%` }} /> }
//             markers={[{
//                 position:{
//                   lat: this.props.latitude,
//                   lng: this.props.longitude,
//                 }
//               }]}
//             />
//         </div>
//     );
//    }
// };
