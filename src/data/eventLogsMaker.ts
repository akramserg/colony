import { ContractClient, getLogs } from '@colony/colony-js';

const eventLogs = async (colonyClient: any) => {
    if (!colonyClient) {
        console.log("You need to pass colonyClient")
        //TODO CONSIDER ADDING COLONY MAKER HERE WHEN IT IS NOT PASSED
        return null
    }
    // Get the filter
    // There's a corresponding filter method for all event types
    const eventFilter = colonyClient.filters.PayoutClaimed();

    // Get the raw logs array
    const eventLogs = await getLogs(colonyClient, eventFilter);
    const parsedLogs = eventLogs.map(event => colonyClient.interface.parseLog(event));

    return { eventLogs, parsedLogs }
}

export default eventLogs;