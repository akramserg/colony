import LogComponent from '../Log'
import styles from '../../styles/event-wrapper.module.scss'
import { Event } from '../../types'

interface Props {
    eventList: Event[] | undefined,
}
const LogList = (props: Props) => {

    if (!props.eventList) return <></>
    return <div>
        <div className={styles.container}>
            {props.eventList?.map((event: Event, i: number) => event && <LogComponent eventLog={event.log} parsedLog={event.parsed} key={i} />)}
        </div>
    </div >
}

export default LogList