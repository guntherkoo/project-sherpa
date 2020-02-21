import s from './LocationDetails.scss';

const LocationDetails = (props) => {
  let { businesses, hoverPin, hover_marker } = props;

    return(
      <div className = {s('LocationDetails')}>
        <div className = {s('LocationDetails-img')} 
              style={{
                backgroundImage: 'url(https://i.pinimg.com/originals/21/b3/9b/21b39b61ada037ce168a68051af7890f.jpg)'
              }}></div>
        <h2 className = {s('LocationDetails-location')}>Chez Muffy</h2>
      </div>
    )
  
}

export default LocationDetails;
