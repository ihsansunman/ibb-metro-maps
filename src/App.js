import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.scss';
import Map from "./Components/Map"
import LoadingSkeleton from './Components/LoadingSkeleton';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const axios = require('axios');
  const URL = 'https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/GetMaps';

  axios.get(URL).then(function (response) {
    setData(response.data.Data);
  });

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
      <h1>Metro İstanbul Ağ Haritası Listesi</h1>

      <Map/>

      {data.map((data) => (
        <Accordion key={data.Id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{data.Title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <a href={data.ImageURL} target="_blank">
                <img src={data.IconURL} />
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}      
    </div>
  );
}
