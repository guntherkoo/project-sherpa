import { Popup } from "react-mapbox-gl";

import s from '../Map.scss';


const LocationPopup = ({ hover_marker }) => {
  let { coordinates, business_name, price} = hover_marker.data.business
    return(
      <Popup
      	coordinates= {coordinates}
        offset={{
            'bottom-left': [12, -38],
            'bottom': [0, -20],
            'bottom-right': [-12, -38]
          }}>
        <div className={s('popup-style')}>
          <div>{business_name}</div>
          <div>${price}</div>
        </div>
      </Popup>
    )
  } 

export default LocationPopup