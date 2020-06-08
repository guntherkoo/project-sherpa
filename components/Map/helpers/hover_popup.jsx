import { Popup } from "react-mapbox-gl";

import s from '../Map.scss';


const HoverPopup = ({ hover_id }) => {
  let { coordinates, business_name, price} = hover_id.data.business
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
        </div>
      </Popup>
    )
  } 

export default HoverPopup