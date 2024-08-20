/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
// import Message from "./Message";
// import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const{cities,isLoading}=useCities();
 if (isLoading)return<Spinner/>;
if (!cities.length) 
  return(<Message message=" Add ur First City By Clicking On Map🤟"/>);


  return ( 
    <ul className={styles.cityList}>
      {cities.map(city=><CityItem city={city} key={city.id}/>)}
    </ul>
  );
}

export default CityList;
