/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Marker,MapContainer,TileLayer,Popup, useMap, useMapEvent } from 'react-leaflet';
import styles from './Map.module.css'
import { useEffect, useState } from 'react';
import{useCities}from "../contexts/CitiesContext"
// import { latLng } from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';


function Map() {
  const {cities}=useCities();
  const[mapPosition,setMapPosition]=useState([40,0])
  const{getPosition ,isLoading,position}=useGeolocation()
// 
  const[mapLat,mapLng]=useUrlPosition();

  useEffect(function(){
    if(mapLat&&mapLng)
    setMapPosition([mapLat,mapLng]);

  },[mapLat,mapLng]);
  useEffect(function(){
    if(position)setMapPosition([position.lat,position.lng])
  },[position]);
  return (
    <div  className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoading?"loading...":"use ur position"}
      </Button>
    <MapContainer className={styles.map}  center={mapPosition} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(<Marker position={[city.position.lat
      , city.position.lng ]} key={city.id} >
      <Popup >
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  ))}
  <ChangeCenter position={mapPosition}/>
  <DetectClick/>
  </MapContainer>
  </div>
  )
}
function ChangeCenter({position}){
  const map=useMap();
  map.setView(position);
  return null;
}
function DetectClick(){
  const navigate= useNavigate();
  useMapEvent({
    click:(e)=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

}
export default Map