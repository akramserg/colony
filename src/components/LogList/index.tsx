import LogComponent from '../Log'
import styles from '../../styles/event-wrapper.module.scss'
interface Props {
    logList: any,
}
const LogList = (props: Props) => {


    return <div>
        <div className={"primary"}> Log List:</div>
        <div className={styles.container}>
            {props.logList?.map((log: any, i: number) => <LogComponent log={log} key={i} />)}
        </div>
    </div >
}

export default LogList