interface Props {
    log: any,
}
const Log = (props: Props) => {

    return <div>
        <div className={"primary"}> Log</div>
        <div className={"seconday"}> {props.log.toString()}</div>
    </div>
}

export default Log