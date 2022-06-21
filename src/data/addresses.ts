// See section "Handling Numbers" for how BigNumber plays a role
import { utils } from 'ethers';

const addresses = async (parsedLogs: any[], colonyClient: any) => {
    const [singleLog] = parsedLogs;

    const humanReadableFundingPotId = new utils.BigNumber(
        singleLog.values.fundingPotId
    ).toString();

    const {
        associatedTypeId,
    } = await colonyClient.getFundingPot(humanReadableFundingPotId);

    const { recipient: userAddress } = await colonyClient.getPayment(associatedTypeId);

    return {
        recipient: userAddress
    }
}