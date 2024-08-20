/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
// import CityItem from "./CityItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

    const countries=cities.reduce((arr,cur)=>{ 
      if(!arr.map((el)=>el.country).includes(cur.country))
        return[...arr,{country:cur.country,emoji:cur.emoji}];
      else return arr;
    },[]);
  return (
<ul className={styles.countryList}>
{countries.map((country)=>(
  <CountryItem country={country} key={country.country}/>
))}
</ul>
    
  );
}

export default CountryList;
