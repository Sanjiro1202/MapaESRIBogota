import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';

const MapaBogota = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Carga los módulos necesarios de ArcGIS
    loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
      .then(([Map, MapView]) => {
        const map = new Map({
          basemap: 'streets' // Puedes cambiar el tipo de mapa aquí
        });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-74.046, 4.676], // Coordenadas del edificio de ESRI Colombia en el Chicó
          zoom: 15
        });

        view.when(() => {
          setMapLoaded(true);
        });
      })
      .catch((error) => {
        console.error('Error al cargar el mapa:', error);
      });
  }, []);

  return (
    <div>
      {mapLoaded ? (
        <div
          ref={mapRef}
          style={{ width: '100%', height: '600px' }}
        ></div>
      ) : (
        <div>Cargando el mapa...</div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Mapa de Bogotá</h1>
      <MapaBogota />
    </div>
  );
};

export default App;
