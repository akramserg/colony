import { ReactElement, useEffect, useState } from 'react'
import colonyClientMaker, { colonyClientInstance } from '../../data/colonyClientMaker'
import eventLogsMaker from '../../data/eventLogsMaker'
import LogListComponent from '../../components/LogList'
import { LogDescription } from 'ethers/utils/interface'
import { Log } from 'ethers/providers/abstract-provider';
import styles from '../../styles/home.module.scss'
import { Event } from '../../types'

interface Props {

}

const HomePage = (props: Props) => {
    const [events, setEvents] = useState<Event[]>()
    const [numberToShow, setNumberToShow] = useState(10)

    const showMore = () => {
        setNumberToShow(numberToShow + 10)
        console.log(numberToShow)
    }
    const setup = async () => {
        const colonyClient = await colonyClientInstance
        const e = await eventLogsMaker(colonyClient)
        let eventsArray: Event[] = []

        if (e?.eventLogs !== undefined)
            for (let i = 0; i < e?.eventLogs.length; i++) {
                eventsArray.push({
                    log: e?.eventLogs[i],
                    parsed: e?.parsedLogs[i]
                })
            }

        setEvents(eventsArray)
    }

    useEffect(() => {
        setup()
    }, [])


    return <div className={styles.container}>
        <LogListComponent eventList={events?.slice(0, numberToShow)} />
        <button onClick={showMore}>Show More</button>
        {/* <LogList logList={parsedLogs?.slice(10)} /> */}
    </div>
}

export default HomePage