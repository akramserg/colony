import { LogDescription } from 'ethers/utils/interface'
import { Log } from 'ethers/providers/abstract-provider';
import '../fonts/muli/Muli.ttf';
import '../fonts/muli/Muli-Bold.ttf';

export type Event = {
    log: Log
    parsed: LogDescription
}

export type ProcessedLog = {
    avatarSeed: any
    primary: any
    secondary: string
}

