import s from './MapWrapper.scss'

const MapWrapper = (props) => {
    return (
      <div className={s('MapWrapper')}>
          { props.children }
      </div>
    );
}

export default MapWrapper