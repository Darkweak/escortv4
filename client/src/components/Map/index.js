import React from 'react';
import PropTypes from 'prop-types';
import BMap from 'pigeon-maps';
import Marker from 'pigeon-marker';

const parseArrayStringToInt = (array) => {
  return array.map(item => parseFloat(item));
};

export const Map = ({
  center_position,
  markers = [],
}) => (
  <BMap center={center_position} minZoom={8} zoom={15} height={400}>
    {
      markers && markers.length && markers.map((marker, index) => (
        <Marker key={index} anchor={marker.position} payload={1} />
      ))
    }
  </BMap>
);

Map.propTypes = {
  center_position: PropTypes.array.isRequired,
  markers: PropTypes.array,
};

export const ShowMap = ({outing}) => (
  <Map center_position={parseArrayStringToInt(outing.position)} markers={[{position: parseArrayStringToInt(outing.position)}]}/>
);
