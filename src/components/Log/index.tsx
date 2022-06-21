import { LogDescription } from 'ethers/utils/interface'
import { Log } from 'ethers/providers/abstract-provider';
import styles from '../../styles/event.module.scss'
import processLog from '../../helpers/processLog';
import { useEffect, useState } from 'react';
import { ProcessedLog } from '../../types';
import Blockies from 'react-blockies';

interface Props {
    eventLog: Log,
    parsedLog: LogDescription
}
const LogComponent = (props: Props) => {
    const [primary, setPrimary] = useState("")
    const [secondary, setSecondary] = useState("")
    const [avatarSeed, setAvatarSeed] = useState("")

    const setup = async () => {
        const result: ProcessedLog = await processLog(props.eventLog, props.parsedLog)
        setPrimary(result.primary)
        setSecondary(result.secondary)
        setAvatarSeed(result.avatarSeed)
    }
    useEffect(() => {
        setup()
    }, [])


    return <div className={styles.container}>
        {/* {avatar || <>avatar</>} */}
        <Blockies seed={avatarSeed} />
        <div className={"primary"}> {primary}</div>
        <div className={"seconday"}> {secondary}</div>
    </div>
}

export default LogComponent