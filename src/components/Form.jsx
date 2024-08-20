/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const[lat,lng]=useUrlPosition();
  const{createCity}=useCities();
  const navigate=useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const BASE_URL= "https://api.bigdatacloud.net/data/reverse-geocode-client"
useEffect(function(){
  if(!lat&!lng)return;
async function fetchCityData(){
const res=await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
const data =await res.json();
console.log(data);
setCityName(data.city||data.locality ||"");
setCountry(data.countryName)
}
fetchCityData();
},[lat,lng])
function handleSubmit(e){
  e.preventDefault();
  if(!cityName||!date)return;
  const newCity={
    cityName,
    country,
   
    date,notes,
    position:{lat,lng}
  }
 createCity(newCity);
}


  return (
    <form className={styles.form}onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
