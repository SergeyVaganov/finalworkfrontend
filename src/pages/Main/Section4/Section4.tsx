import { FunctionComponent } from 'react'
import style from './Section4.module.css'
import { PriceCard } from '../../../components/PriceCard/PriceCard';
import { prices } from './prices';


export const Section4: FunctionComponent = () => {
    return (
        <section className={style.main}>
            <h1>НАШИ ТАРИФЫ</h1>
            <div className={style.wrapper}>
                <PriceCard key={'1'} {...prices[0]} />
                <PriceCard key={'2'} {...prices[1]} />
                <PriceCard key={'3'} {...prices[2]} />
            </div>
        </section>
    )
}