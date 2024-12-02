import styles from './Loaders.module.scss'

export function LoaderCircle(props) {
    let mainStyle = {width: props.width || 120, height: props.height || 120};
    let innerStyle = {borderWidth: props.borderWidth || 8, borderColor: `${props.borderColor || '#006666'} transparent transparent transparent`,};
    return (
        <div className={styles.loaderCircle} style={mainStyle}>
            <div style={innerStyle}></div>
            <div style={innerStyle}></div>
            <div style={innerStyle}></div>
            <div style={innerStyle}></div>
        </div>
    )
}

export function LoaderFullScreen(props) {
    return (
        <div className={styles.loaderFullScreen}>
            <LoaderCircle/>
        </div>
    )
}
