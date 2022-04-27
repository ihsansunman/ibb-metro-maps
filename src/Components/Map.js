import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayerGroup,
  Marker,
  Popup,
  Polyline,
  LayersControl,
} from "react-leaflet";
import axios from "axios";
import {
  polyline_m4,
  blackIcon,
  blueIcon,
  goldIcon,
  greenIcon,
  greyIcon,
  orangeIcon,
  purpleIcon,
  redIcon,
  polyline_m1a,
  polyline_t1,
  polyline_t4,
  polyline_m2a,
} from "./utils";

function Map() {
  const [markerPoint, setMarkerPoint] = useState([]);

  useEffect(() => {
    getMarkers();
  }, []);

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

  return (
    <div>
      <MapContainer
        className="markercluster-map"
        center={[41.1047, 28.9109]}
        zoom={10.5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://ihsansunman.asnus.com">ihsansunman</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Line">
            <LayerGroup>
              <Polyline
                // @ts-ignore
                positions={polyline_m4}
                color="violet"
              />
              <Polyline
                // @ts-ignore
                positions={polyline_t1}
              />
              <Polyline
                // @ts-ignore
                positions={polyline_t4}
                color="orange"
              />
              <Polyline
                // @ts-ignore
                positions={polyline_m1a}
                color="red"
              />
              <Polyline
                // @ts-ignore
                positions={polyline_m2a}
                color="green"
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Point">
            <LayerGroup>
              {markerPoint.map((point) => {
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
                      Hat: {point.LineName} <br /> <br /> Yürüyen Merdiven
                      Sayısı:
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
      </MapContainer>
    </div>
  );
}

export default Map;
