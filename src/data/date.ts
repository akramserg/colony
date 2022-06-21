import { getBlockTime } from '@colony/colony-js';
import { Log } from 'ethers/providers/abstract-provider';
import { LogDescription } from 'ethers/utils/interface';
import { providerInstance } from './colonyClientMaker';

const date = async (singleLog: Log) => {
    if (!singleLog) return ""

    // Use the blockHash to look up the actual time of the block that mined the transactions of the current event
    const logTime = await getBlockTime(providerInstance, singleLog?.blockHash || "");





    return logTime

}

export default date