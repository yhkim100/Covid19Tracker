import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if(country){
    changeableUrl = `${url}/countries/${country}`
  }

  try {
    //Creating a data object with specified 'confirmed, recovered, deaths, lastUpdate' fields
    const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

    //Old method of creating a modifiedData object with data fields
    // const modifiedData = {
    //   confirmed: data.confirmed,
    //   recovered: data.recovered,
    //   deaths: data.deaths,
    //   lastUpdate: data.lastUpdate
    // }

    //New method, taking advantage of javascript object shorthand where
    // 'confirmed: confirmed' -> 'confirmed' syntax
    //   const modifiedData = {
    //   confirmed,
    //   recovered,
    //   deaths,
    //   lastUpdate
    // }

    //Even better, we can just return the object immediately
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
}

export const fetchDailyData = async() => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData)=> ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }))

    // console.log(modifiedData);
    
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCountries = async() => {
  try {
    const { data: { countries }} = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
}