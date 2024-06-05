import { FunctionComponent } from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooksStore'
import { fetchInfo } from '../../../store/slices/infoSlice'
import style from './LimitPanel.module.css'
import Loader from 'react-ts-loaders'


export const LimitPanel: FunctionComponent = () => {

    const authState = useAppSelector(state => state.authSt)
    const infoState = useAppSelector(state => state.infoSt.eventFiltersInfo)
    const loader = useAppSelector(state => state.infoSt.loading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const info = dispatch(fetchInfo(authState.accessToken))
    }, [authState.authorized])

    return (
        <div className={style.panel}>
            {loader ?
                <div className={style.loader}>
                    <Loader
                        type="dotspinner"
                        color="#888888"
                        size={60} />
                </div> :
                <div className={style.table}>
                    <div>Использованно компаний</div>
                    <div>{infoState.usedCompanyCount}</div>
                    <div>Лимит по компаниям</div>
                    <div> {infoState.companyLimit}</div>
                </div>
            }
        </div>
    )
}