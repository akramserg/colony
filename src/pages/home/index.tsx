import { ReactElement, useEffect, useState } from 'react'
import colonyClientMaker from '../../data/colonyClientMaker'
import eventLogsMaker from '../../data/eventLogsMaker'
import LogComponent from '../../components/Log'
import LogList from '../../components/LogList'

import styles from '../../styles/home.module.scss'

interface Props {

}
const HomePage = (props: Props) => {
    const [eventLogs, setEventLogs] = useState<any[]>()
    const [parsedLogs, setParsedLogs] = useState<any[]>()


    const setup = async () => {
        const colonyClient = await colonyClientMaker()
        const e = await eventLogsMaker(colonyClient)
        setEventLogs(e?.eventLogs)
        setParsedLogs(e?.parsedLogs)
    }

    useEffect(() => {
        setup()
    }, [])


    return <div className={styles.container}>
        <div> Home Page</div>
        <LogList logList={eventLogs?.slice(0, 10)} />
        {/* <LogList logList={parsedLogs?.slice(10)} /> */}
    </div>
}

export default HomePage