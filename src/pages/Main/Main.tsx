import { FunctionComponent } from 'react'
import { Section1 } from './Section1/Section1';
import { Section2 } from './Section2/Section2';
import { Section3 } from './Section3/Section3';
import { Section4 } from './Section4/Section4';
import style from './Main.module.css'


export const Main: FunctionComponent = () => {

    return (
        <main className={style.main}>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
        </main>
    )
}