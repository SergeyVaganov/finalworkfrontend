import { FunctionComponent } from 'react'
import style from './SlideSearch.module.css'


type Props = {
    date: Date
    total: number
    risk: number
}

export const SlideSearch: FunctionComponent<Props> = (props) => {

    return (
        <div className={style.histoblok}>
            <div>{props.date.toLocaleDateString()}</div>
            <div>{props.total}</div>
            <div>{props.risk}</div>
        </div>
    )
}