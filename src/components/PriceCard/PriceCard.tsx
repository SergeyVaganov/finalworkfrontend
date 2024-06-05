import { FunctionComponent } from 'react'
import style from './PriceCard.module.css'
import { IPrices } from '../../pages/Main/Section4/prices'


export const PriceCard: FunctionComponent<IPrices> = (props) => {

    return (
        <div style={
            props.current ? { borderColor: props.color } : { border: 'none' }
        } className={style.card}>
            <div className={style.header} style=
                {props.color === '#000000' ?
                    { backgroundColor: props.color, color: '#ffffff' } :
                    { backgroundColor: props.color }
                }>
                <div className={style.name}>{props.name}</div>
                <div className={style.desciption}> {props.desciption}</div>
                <div className={style.img}>
                    <img src={props.icon} alt="icon" />
                </div>
            </div>
            <div className={style.main}>
                {props.current ?
                    <div className={style.current}>Текущий тариф</div> :
                    <div style={{ height: '24px' }}></div>}
                <div className={style.price}>
                    <div>{props.price.toLocaleString()}</div>
                    <div>{props.oldPrice.toLocaleString()}</div>
                </div>
                <div className={style.descriptionPrice}>{props.descriptionPrice}</div>
                <div className={style.titleList}>В тариф входит:</div>
                <div className={style.list}>
                    {props.include.map((item, index) => {
                        return (
                            <div key={index}>{item}</div>
                        )
                    })}
                </div>
            </div>
            <button style=
                {props.current ? 
                { color: 'black', backgroundColor: '#D2D2D2' } : 
                { color: 'white', backgroundColor: '#5970FF' }}>
                    {props.current ? 'Перейти в личный кабинет' : 'Подробнее'}
            </button>
        </div>
    )
}