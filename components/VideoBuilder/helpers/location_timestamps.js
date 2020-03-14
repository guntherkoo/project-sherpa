import s from '../VideoBuilder.scss';

const convertToTime = (time) => {
  let hr = ~~(time / 3600);
  let min = ~~((time % 3600) / 60);
  let sec = time % 60;
  let sec_min = "";
  if (hr > 0) {
     sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
  }
  sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
  sec_min += "" + sec;
  return sec_min;
}


const LocationTimestamps = ({video_data, locationPins }) => {
    return(
      <div className={s("LocationTimestamps")}>
        { 
          video_data.locations.map((loc, i)=> {
            let locationMatch = locationPins.find((pin)=> pin.id === loc.id)
            let timestamp = convertToTime(loc.timestamp)
            console.log(timestamp);
            return(
              <div className={s("LocationTimestamps-timestamp")}>
                { locationMatch.data.business.business_name }
                { timestamp }
              </div>
            )
          })
        }
      </div>
    )
  } 

export default LocationTimestamps