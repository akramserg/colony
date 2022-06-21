import LogComponent from '../Log'
interface Props {
    logList: any,
}
const LogList = (props: Props) => {


    return <div>
        <div className={"primary"}> Log List:</div>
        {props.logList?.map((log: any, i: number) => <LogComponent log={log} key={i} />)}
    </div>
}

export default LogList