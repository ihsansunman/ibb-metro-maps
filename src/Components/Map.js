import React, { useState, useEffect, useCallback } from "react";
import Control from "react-leaflet-custom-control";
import { Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import _ from "lodash";
import {
  TileLayer,
  LayerGroup,
  Marker,
  Popup,
  Polyline,
  LayersControl,
  useMap,
} from "react-leaflet";
import axios from "axios";
import {
  blackIcon,
  blueIcon,
  goldIcon,
  greenIcon,
  greyIcon,
  orangeIcon,
  purpleIcon,
  redIcon,
  myLocationIcon,
  polyline_M1A,
  polyline_M1B,
  polyline_M2,
  polyline_M2A,
  polyline_M4,
  polyline_T1,
  polyline_T4,
  polyline_T5,
  polyline_M3,
  polyline_T3,
  polyline_M6,
} from "./utils";

const Map = () => {
  const [markerPoint, setMarkerPoint] = useState([]);
  const [userPoint, setUserPoint] = useState([0, 0]);
  const [zoomMarker, setZoomMarker] = useState([]);
  const map = useMap();
  const getZoom = useMap().getZoom();

  useEffect(() => {
    getMarkers();
  }, []);

  useEffect(() => {
    GetZoomLevel();
  }, [markerPoint]);

  const getMarkers = () => {
    const URL =
      "https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/GetStations";

    axios(URL).then((response) => {
      const markers = response.data.Data.filter(
        (x) => x.DetailInfo.Latitude !== null
      );

      setMarkerPoint(markers);
    });
  };

  useEffect(() => {
    GetZoomLevel();
  }, [getZoom]);

  const GetZoomLevel = () => {
    var zoomLevel = 50;
    zoomLevel = 34 * getZoom - 290;
    var zoomMarker = _.sampleSize(markerPoint, zoomLevel);
    setZoomMarker(zoomMarker);
  };
  const iconColor = (LineName) => {
    if (LineName == "M2") {
      return greenIcon;
    } else if (LineName == "T4") {
      return orangeIcon;
    } else if (LineName == "M1A" || LineName == "M1B") {
      return redIcon;
    } else if (LineName == "T5") {
      return goldIcon;
    } else if (LineName == "M4") {
      return purpleIcon;
    } else if (LineName == "M3") {
      return greyIcon;
    } else if (LineName == "T3" || LineName == "M6" || LineName == "TF2") {
      return blackIcon;
    } else {
      return blueIcon;
    }
  };

  const statusControl = (Boolean) => {
    if (Boolean) {
      return "Var";
    } else {
      return "Yok";
    }
  };

  function GetCurrentPosition() {
    map.locate().on("locationfound", function (e) {
      setUserPoint(e.latlng);
    });
  }

  function SetCurrentPosition() {
    console.log(userPoint);
    map.flyTo(userPoint, 15);
  }

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://ihsansunman.asnus.com">ihsansunman</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      <LayersControl position="topright">
        <Marker position={userPoint} icon={myLocationIcon} />
        <LayersControl.Overlay checked name="Line">
          <LayerGroup>
            <Polyline
              // @ts-ignore
              positions={polyline_M4}
              color="violet"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_T1}
            />
            <Polyline
              // @ts-ignore
              positions={polyline_T4}
              color="orange"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_M1A}
              color="red"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_M1B}
              color="red"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_M2}
              color="green"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_M2A}
              color="green"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_T5}
              color="yellow"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_M3}
              color="grey"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_T3}
              color="black"
            />
            <Polyline
              // @ts-ignore
              positions={polyline_M6}
              color="black"
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Point">
          <LayerGroup>
            {zoomMarker.map((point) => {
              return (
                <Marker
                  key={point.Id}
                  position={[
                    point.DetailInfo.Longitude,
                    point.DetailInfo.Latitude,
                  ]}
                  icon={iconColor(point.LineName)}
                >
                  <Popup>
                    İsim: {point.Name} <br /> Açıklama: {point.Description}{" "}
                    <br />
                    Hat: {point.LineName} <br /> <br /> Yürüyen Merdiven Sayısı:
                    {point.DetailInfo.Escolator} <br /> Asansör Sayısı:
                    {point.DetailInfo.Lift} <br /> Mescit:
                    {statusControl(point.DetailInfo.Masjid)} <br /> WC:
                    {statusControl(point.DetailInfo.WC)} <br /> Bebek Odası:
                    {statusControl(point.DetailInfo.Babyroom)}
                  </Popup>
                </Marker>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <GetCurrentPosition />

      <Control position="topright">
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#fff",
            width: 5,
            "&:hover": { backgroundColor: "#fff" },
          }}
          variant="contained"
          onClick={() => SetCurrentPosition()}
        >
          <MyLocationIcon />
        </Button>
      </Control>
    </>
  );
};

export default Map;
function getZoom() {
  throw new Error("Function not implemented.");
}
