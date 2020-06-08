import { connect } from 'react-redux';

import s from '../VideoBuilder.scss';

import { VideoAction } from 'redux-store/video/video.actions';

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


const LocationTimestamps = ({video_data, locationPins, video_player, playVideo, setVideoData }) => {
    return(
      <div className={s("LocationTimestamps")}>
        
        { 
          video_data.locations.map((loc, i)=> {
            let locationMatch = locationPins.find((pin)=> pin.id === loc.id)
            let { business_name, img } = locationMatch.data.business
            let timestamp = convertToTime(loc.timestamp)
            console.log(timestamp);
            return(
              <div className={s("LocationTimestamps_data")}
                onClick={(e)=>{
                  
                  video_player.seekTo(loc.timestamp);
                  playVideo();
                }}>
                <div className={s("LocationTimestamps_data-timestamp")}>
                {(img ? <img src={img} alt=""/> : <img src="https://via.placeholder.com/80" alt=""/>)}
                  <h1>{ business_name }</h1>
                  <span> { timestamp } </span>
                </div>


                <div className={s("x-out")}
                  onClick={(e)=>{
                    e.stopPropagation();
                    const filtered = video_data.locations.filter(location => loc.id !== location.id)
                    setVideoData({locations: filtered});
                  }}>
                  &#10005;
                </div>
              </div>
            )
          })
        }
      </div>
    )
  } 

  const mapStateToProps = state => {
    // console.log(state.video);
    return {
      video_player: state.video.player
    }
  }



const mapDispatchToProps = dispatch => ({
  playVideo: () => dispatch(VideoAction.playVideo()),
  setVideoData: (info) => dispatch(VideoAction.setVideoData(info))
})

export default connect( mapStateToProps, mapDispatchToProps )(LocationTimestamps)