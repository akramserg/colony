import { getBlockTime } from '@colony/colony-js';


const date = async (eventLogs: any[], provider: any) => {


    const [singleLog] = eventLogs;

    // Use the blockHash to look up the actual time of the block that mined the transactions of the current event
    const logTime = await getBlockTime(provider, singleLog.blockHash);
    return logTime

}

export default date