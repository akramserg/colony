import { LogDescription } from "ethers/utils/interface";
import { Log } from 'ethers/providers/abstract-provider';
import getAddress from '../data/address'
import { ProcessedLog } from "../types";
import date from '../data/date'
import moment from 'moment'
import getAmount from "../data/amount";
import getRole from "../data/roles";

type processLogFunc = (eventLog: Log | any, parsedLog: LogDescription | any) => Promise<ProcessedLog>

const processLog: processLogFunc = async (eventLog: Log | any, parsedLog: LogDescription | any) => {
    //DEFAULT VALUES
    const result: ProcessedLog = {
        avatarSeed: "",
        primary: "Primary value",
        secondary: "Secondary value"
    }
    if (!eventLog || !parsedLog) {
        console.log("eventLog or parsedLog is not valid")
        return result
    }

    //SET DATE
    result.secondary = moment(await date(eventLog)).format("DD MMM")



    if (parsedLog.name === "ColonyInitialised") {
        result.primary = `Congratulations! It's a beautiful baby colony!`
        result.avatarSeed = eventLog.address
    }


    else if (parsedLog.name === "ColonyRoleSet") {
        result.primary = `
             <span class="heavy">${getRole(eventLog.role)} </span>
             role assigned to user  <span class="heavy"> ${eventLog.address} </span>
             in domain <span class="heavy">${eventLog.domainId}</span>
             `
        result.avatarSeed = eventLog.address
    }

    else if (parsedLog.name === "PayoutClaimed") {
        let userAddress = await getAddress(parsedLog);
        if (userAddress) result.avatarSeed = userAddress
        result.primary = `
            User  <span class="heavy">${userAddress} </span>
            claimed  <span class="heavy">${getAmount(parsedLog)} </span>
            payout from pot  <span class="heavy">${parsedLog.values.fundingPotId}</span>
             `
        result.avatarSeed = userAddress
    }
    else if (parsedLog.name === "DomainAdded") {
        result.primary = `Domain  <span class="heavy">${eventLog.domainId} </span> added`
        result.avatarSeed = eventLog.address
    }

    return result
}

export default processLog;
