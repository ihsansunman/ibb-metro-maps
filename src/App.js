import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';
import './style.scss';
import {
  MapContainer
} from "react-leaflet";
import Map from "./Components/Map"
import LoadingSkeleton from './Components/LoadingSkeleton';
import axios from "axios";
import Footer from './Components/Footer';
import { Button } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const URL =
      "https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/GetMaps";

    axios(URL).then((response) => {
      const datas = response.data.Data

      setData(datas);
    });
  };


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <LoadingSkeleton/>
    );
  }

  return (
    <div>
      <div className='header'>
      <MapIcon className='maps-button' sx={{color: "white"}} onClick={()=> location.href='#maps'}/>
      <h2 className='site-title'>Metro İstanbul Ağ Haritası</h2>
      </div>
      <MapContainer
        className="markercluster-map"
        center={[41.0188325, 29.0088419]}
        zoom={11}
        scrollWheelZoom={true}
      >
      <Map/>
      </MapContainer>

      {data.map((data) => (
        <Accordion key={data.Id} id="maps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{backgroundColor: "#222222", color: "white"}}
          >
            <Typography>{data.Title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{backgroundColor: "#222222"}}>
            <Typography>
              <a href={data.ImageURL} target="_blank">
                <img src={data.IconURL} />
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Footer/>
    </div>
  );
}

export default App;