// See section "Handling Numbers" for how BigNumber plays a role
import { utils } from 'ethers';
import { LogDescription } from 'ethers/utils/interface';
import { colonyClientInstance } from './colonyClientMaker';
import { ColonyClient } from '@colony/colony-js';

const getAddress = async (singleLog: LogDescription, colonyClient?: ColonyClient) => {
    try {
        if (!colonyClient) colonyClient = await colonyClientInstance
        const humanReadableFundingPotId = new utils.BigNumber(
            singleLog.values.fundingPotId
        ).toString();

        const {
            associatedTypeId,
        } = await colonyClient.getFundingPot(humanReadableFundingPotId);

        const result = await colonyClient.getPayment(associatedTypeId);

        return result.recipient

    } catch (error) {
        console.log(error)
        return null;
    }

}
export default getAddress