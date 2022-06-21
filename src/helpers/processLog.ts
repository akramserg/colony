import { LogDescription } from "ethers/utils/interface";
import { Log } from 'ethers/providers/abstract-provider';
import { utils } from "ethers";
import address from '../data/address'
import { colonyClientInstance } from "../data/colonyClientMaker";
import { ProcessedLog } from "../types";
import avatar from '../data/avatar'
import date from '../data/date'
import moment from 'moment'

type processLogFunc = (eventLog: Log | any, parsedLog: LogDescription | any) => Promise<ProcessedLog>

const processLog: processLogFunc = async (eventLog: Log | any, parsedLog: LogDescription | any) => {
    const result: ProcessedLog = {
        avatarSeed: "",
        primary: "Primary value",
        secondary: "Secondary value"
    }
    if (!eventLog || !parsedLog) {
        console.log("eventLog or parsedLog is not valid")
        return result
    }

    // 
    const amount = (singleLog: LogDescription) => new utils.BigNumber(singleLog.values.amount);

    result.secondary = moment(await date(eventLog)).format("DD MMM")



    if (parsedLog.name === "ColonyInitialised") {
        // event ColonyInitialised(address agent, address colonyNetwork, address token); 
        result.primary = `Congratulations! It's a beautiful baby colony!`
        result.avatarSeed = eventLog.address
    }
    else if (parsedLog.name === "ColonyRoleSet") {
        // event ColonyRoleSet(address agent, address indexed user, uint256 indexed domainId, uint8 indexed role, bool setTo);        result.primary = `Congratulations! It's a beautiful baby colony!`
        result.primary = `${eventLog.role} role assigned to user ${eventLog.address} in domain ${eventLog.domainId}`
        result.avatarSeed = eventLog.address
    }
    else if (parsedLog.name === "PayoutClaimed") {
        //  event PayoutClaimed(address agent, uint256 indexed fundingPotId, address token, uint256 amount);  
        const userAddress = await address(parsedLog);
        result.primary = `${userAddress} claimed ${amount(parsedLog)} payout from pot ${parsedLog.values.fundingPotId}`
        result.avatarSeed = userAddress
    }
    else if (parsedLog.name === "DomainAdded") {
        //  event DomainAdded(address agent, uint256 domainId);
        result.primary = ` Domain ${eventLog.domainId} added`
        result.avatarSeed = eventLog.address
    }

    return result
}

export default processLog;

/*
    ColonyInitialised
Event logged when Colony is initialised

Required display data and copy:

Primary: Congratulations! It's a beautiful baby colony!
Secondary: Formatted event date
Expected event values: ColonyDataTypes.sol#L25-L26

ColonyRoleSet
Event logged when a user/domain/role is granted or revoked

Required display data and copy:

Primary: ${role} role assigned to user ${userAddress} in domain ${domainId}.
Secondary: Formatted event date
Expected event values: ColonyDataTypes.sol#L40-L43

PayoutClaimed
Event logged when reward payout is claimed

Required display data and copy:

Primary: User ${userAddress} claimed {token} payout from pot ${fundingPotId}.
Secondary: Formatted event date
Expected event values: ColonyDataTypes.sol#L68-L71

DomainAdded
Event logged when a new Domain is added

Required display data and copy:

Primary: Domain ${domainId} added.
Secondary: Formatted event date
Expected event values: ColonyDataTypes.sol#L181
   */