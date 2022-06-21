import { LogDescription } from "ethers/utils/interface";
import { Log } from 'ethers/providers/abstract-provider';
import { utils } from "ethers";
import address from '../data/address'
import { colonyClientInstance } from "../data/colonyClientMaker";
import { ProcessedLog } from "../types";
import avatar from '../data/avatar'
import date from '../data/date'
import moment from 'moment'

type processLogFunc = (eventLog: Log, parsedLog: LogDescription) => Promise<ProcessedLog>

const processLog: processLogFunc = async (eventLog: Log, parsedLog: LogDescription) => {
    const result: ProcessedLog = {
        avatar: null,
        primary: "Primary value",
        secondary: "Secondary value"
    }
    if (!eventLog || !parsedLog) {
        console.log("eventLog or parsedLog is not valid")
        return result
    }


    if (parsedLog.name === "PayoutClaimed") {
        const userAddress = await address(parsedLog);
        result.primary = `${userAddress} claimed ${parsedLog.values.amount} payout from pot ${parsedLog.values.fundingPotId}`
        result.secondary = moment(await date(eventLog)).format("DD MMM")
        result.avatar = avatar(userAddress)
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