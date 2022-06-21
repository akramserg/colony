import { useEffect, useState } from 'react'
import { colonyClientInstance } from '../../data/colonyClientMaker'
import eventLogsMaker from '../../data/eventLogsMaker'
import LogListComponent from '../../components/LogList'
import styles from '../../styles/home.module.scss'
import { Event } from '../../types'
import InfiniteScroll from '../infiniteScroll'
interface Props {

}

const HomePage = (props: Props) => {
    const [events, setEvents] = useState<Event[]>()
    const [numberToShow, setNumberToShow] = useState(8)
    const [disabledScroll, setDisableScroll] = useState(true)

    const showMore = async () => {
        console.log({
            disabledScroll
        })
        if (!disabledScroll && events && events.length >= numberToShow) {
            setNumberToShow(numberToShow + 8)
            await setDisableScroll(true)
            await setTimeout(async () => {
                await setDisableScroll(false)
            }, 15000)
        }


    }
    const setup = async () => {
        setDisableScroll(true)
        const colonyClient = await colonyClientInstance
        const e = await eventLogsMaker(colonyClient)
        let eventsArray: Event[] = []

        if (e?.eventLogs !== undefined) {

            for (let i = e?.eventLogs.length - 1; i >= 0; i--) {
                eventsArray.push({
                    log: e?.eventLogs[i],
                    parsed: e?.parsedLogs[i]
                })
            }
            setDisableScroll(false)

        }

        setEvents(eventsArray)

    }

    useEffect(() => {
        setup()
    }, [])


    return <div className={styles.container}>
        <InfiniteScroll showMore={() => { showMore() }}>
            <LogListComponent eventList={events?.slice(0, numberToShow)} />
            <div className={styles.center} >
                <div className={styles.showmore} onClick={showMore}>
                    {!disabledScroll ? "show more" : "Disabled Loading Temporarily"}
                </div>
            </div>
        </InfiniteScroll >
    </div >
}

export default HomePage

