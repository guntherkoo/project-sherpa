import { Marker, Layer, Feature,Popup } from "react-mapbox-gl";
import s from '../Map.scss';

function Prices(props) {
  let { businesses, hoverPin, hover_marker } = props;
  if(businesses) {
    return(
      <div>
       { businesses[0].locations.map((loc, i) => {
          return (
            <div key={i}>
              <Marker
                coordinates= { loc.coordinates }
                anchor='bottom'
                className={(hover_marker === i ? s('popup', 'active') : s('popup'))}
                offset={{
                  'bottom':  [0,-10]
                }}>
                <h2><b>{loc.name}</b></h2>
                <p>{loc.vlogs} {(loc.vlogs <= 1 ? 'user' : 'users')} have been here</p>
              </Marker>
              <Marker
                coordinates={loc.coordinates}
                anchor="top"
                className={(loc.vlogs <= 5 ? s('price', 'green') : 
                            loc.vlogs <= 10 ? s('price', 'lightgreen') : 
                            loc.vlogs <= 15 ? s('price', 'tan') :
                            loc.vlogs <= 20 ? s('price', 'lightred') :
                            loc.vlogs > 21 ? s('price', 'red'):
                            s('price'))}
                onMouseEnter={()=>{
                  hoverPin(i);
                  console.log(hover_marker);
                }}
                
                onClick = {()=> {
                  hoverPin(i);
                }}>
                ${loc.price}

              </Marker>
              
            </div>
          )
         })
       }
      </div>
    )
  } else {
    <div></div>
  }
  
}

export default Prices