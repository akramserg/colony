import { utils } from 'ethers';
import { LogDescription } from 'ethers/utils/interface';


const getAmount = (singleLog: LogDescription) => {
    const wei = new utils.BigNumber(10);
    const humanReadableAmount = new utils.BigNumber(singleLog.values.amount)
    const convertedAmount = humanReadableAmount.div(wei.pow(18));
    return convertedAmount.toString()
}
export default getAmount