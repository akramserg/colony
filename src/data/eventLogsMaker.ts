import { ColonyClient, getLogs } from '@colony/colony-js';
import { EventFilter } from 'ethers/contract';
import { Log } from 'ethers/providers/abstract-provider';
import { LogDescription } from 'ethers/utils/interface';

const eventLogs = async (colonyClient: ColonyClient) => {
    if (!colonyClient) {
        console.log("You need to pass colonyClient")
        //TODO CONSIDER ADDING COLONY MAKER HERE WHEN IT IS NOT PASSED
        return null
    }
    // Get the filter
    // There's a corresponding filter method for all event types
    //TODO CHECK PASSED NULLS
    const eventFilter: EventFilter = colonyClient.filters.PayoutClaimed(null, null, null);

    // Get the raw logs array
    const eventLogs: Log[] = await getLogs(colonyClient, eventFilter);
    const parsedLogs: LogDescription[] = eventLogs.map(event => colonyClient.interface.parseLog(event));

    return { eventLogs, parsedLogs }
}

export default eventLogs;