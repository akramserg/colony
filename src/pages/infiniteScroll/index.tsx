import { useEffect, useRef } from 'react'
import styles from '../../styles/home.module.scss'

interface Props {
    showMore: any
    children?: any
}

const InfiniteScroll = (props: Props) => {
    const containerRef = useRef(null);





    useEffect(() => {

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }
        const current = containerRef.current

        const observer = new IntersectionObserver(props.showMore, options)
        if (current) observer.observe(current)

        return () => {
            if (current) observer.unobserve(current)
        }


    }, [containerRef, props.showMore])


    return <div className={styles.container}>
        {props.children}

        <div style={{ height: "1px", width: "100%" }} ref={containerRef}></div>

    </div>
}

export default InfiniteScroll


