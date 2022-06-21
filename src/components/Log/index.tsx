import { LogDescription } from 'ethers/utils/interface'
import { Log } from 'ethers/providers/abstract-provider';
import styles from '../../styles/event.module.scss'
import processLog from '../../helpers/processLog';
import { useEffect, useState } from 'react';
import { ProcessedLog } from '../../types';
import Blockies from 'react-blockies';
import ReactHtmlParser from 'react-html-parser';

interface Props {
    eventLog: Log,
    parsedLog: LogDescription
}
const LogComponent = (props: Props) => {
    const [primary, setPrimary] = useState("")
    const [secondary, setSecondary] = useState("")
    const [avatarSeed, setAvatarSeed] = useState("")


    useEffect(() => {
        const setup = async () => {
            if (!props.eventLog || !props.parsedLog) {
                return
            }
            const result: ProcessedLog = await processLog(props.eventLog, props.parsedLog)
            setPrimary(result.primary)
            setSecondary(result.secondary)
            setAvatarSeed(result.avatarSeed)
        }
        setup()
    }, [props.eventLog, props.parsedLog])




    return <div className={styles.container}>
        {/* {avatar || <>avatar</>} */}
        <div className={styles.row}>
            <div className={styles.left_section}>
                <div className={styles.avatar}><Blockies size={37} seed={avatarSeed} /></div>
            </div>
            <div className={styles.right_section}>
                <div className={"primary"}> {ReactHtmlParser(primary)}</div>
                <div className={"secondary"}> {secondary}</div>
            </div>
        </div>

    </div>
}

export default LogComponent