import { LogDescription } from 'ethers/utils/interface'
import { Log } from 'ethers/providers/abstract-provider';

export type Event = {
    log: Log
    parsed: LogDescription
}

export type ProcessedLog = {
    avatarSeed: any
    primary: string
    secondary: string
}

