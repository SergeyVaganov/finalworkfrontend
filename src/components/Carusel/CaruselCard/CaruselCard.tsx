import { FunctionComponent } from 'react'
import style from './CaruselCard.module.css'
import { useAppSelector } from '../../../hooks/hooksStore'
import { GAP_ITEMS } from '../Carusel'


type Props = {
    id: number,
    icon: string,
    text: string,

}

export const CaruselCard: FunctionComponent<Props> = ({ icon, text }) => {

    const widthWindow = useAppSelector((state) => state.caruselSt.windowCarusel)
    const countBlocks = useAppSelector((state) => state.caruselSt.countBlocks)
    const x = (widthWindow - ((countBlocks) * GAP_ITEMS)) / countBlocks

    return (
        <div className={style.card} style={{ minWidth: `${x}px`, maxWidth: `${x}px` }}>
            <object type='image/svg-xml' data={icon}>
                <img src={icon} alt='icon' />
            </object>
            <div>{text}</div>
        </div>
    )
}