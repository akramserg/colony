// See section "Handling Numbers" for how BigNumber plays a role
import { utils } from 'ethers';
import { LogDescription } from 'ethers/utils/interface';
import { colonyClientInstance } from './colonyClientMaker';
import { ColonyClient, getLogs } from '@colony/colony-js';

const address = async (singleLog: LogDescription, colonyClient?: ColonyClient) => {
    // const [singleLog] = parsedLogs;
    if (!colonyClient) colonyClient = await colonyClientInstance


    const humanReadableFundingPotId = new utils.BigNumber(
        singleLog.values.fundingPotId
    ).toString();

    const {
        associatedTypeId,
    } = await colonyClient.getFundingPot(humanReadableFundingPotId);

    const result = await colonyClient.getPayment(associatedTypeId);
    // const { recipient: userAddress } = result
    // console.log(result)
    return result.recipient

}
export default address