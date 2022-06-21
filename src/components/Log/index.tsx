import styles from '../../styles/event.module.scss'
interface Props {
    log: any,
}
const Log = (props: Props) => {

    return <div className={styles.container}>
        <div className={"primary"}> Log</div>
        <div className={"seconday"}> {props.log.toString()}</div>
    </div>
}

export default Log