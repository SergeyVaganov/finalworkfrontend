import { FunctionComponent } from 'react'
import style from './Logo.module.css'


type Props = {
    logo: string | undefined
}

export const Logo: FunctionComponent<Props> = ({ logo }) => {

    const src = (logo !== 'footer') ?
        '/img/logo/logoMain.svg' :
        '/img/logo/logoWhite.svg'

    return (
        <div className={style.logo}>
            <object type="image/svg+xml" data={src}>
            </object>
        </div>
    )
}