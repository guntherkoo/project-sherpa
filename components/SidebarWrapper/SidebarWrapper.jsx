import s from './SidebarWrapper.scss'

const SidebarWrapper = (props) => {
    return (
      <div className={s('SidebarWrapper')}>
          { props.children }
      </div>
    );
}

export default SidebarWrapper