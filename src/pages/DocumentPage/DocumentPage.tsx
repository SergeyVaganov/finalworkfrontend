import { FunctionComponent, useState } from 'react'
import style from './DocumentPage.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { pageInc, pageSet, clearDocs } from '../../store/slices/documentsSlice'
import { useEffect } from 'react'
import { fetchDocuments } from '../../store/slices/documentsSlice'
import { Document } from '../../components/Document/Document'
import { SlideSearch } from '../../components/SlideSearch/SlideSearch'
import { CaruselSearch } from '../../components/CaruselSearch/CaruseSearchl';
import Loader from 'react-ts-loaders'


export interface IHistogrammData {
    date: Date;
    total: number;
    risk: number;
}

export const DocumentPage: FunctionComponent = () => {

    const histogramm = useAppSelector(state => state.histogrammSt)
    const tokenAccess = useAppSelector(state => state.authSt.accessToken)
    const documents = useAppSelector(state => state.docSt)
    const dispatch = useAppDispatch()
    const [histogrammData, setHistogrammData] = useState<IHistogrammData[]>([])

    useEffect(() => {
        const listResult = (): IHistogrammData[] => {
            const histo = histogramm.data
            const listRisk = histo.filter((el) => el.histogramType === 'riskFactors')[0]
            const listTotal = histo.filter((el) => el.histogramType === 'totalDocuments')[0]
            const dateRisc = listRisk.data.map((el) => el.date)
            const dateTotal = listTotal.data.map((el) => el.date)
            let histoList: { date: Date, total: number, risk: number }[] = [];
            let index = new Set<string>([...dateRisc, ...dateTotal])
            index.forEach((id: string) => {
                histoList.push({
                    'date': new Date(id),
                    'total': listTotal.data.filter((el) => el.date === id)[0].value || 0,
                    'risk': listRisk.data.filter((el) => el.date === id)[0].value || 0
                })
            })
            const histoListSort = histoList.sort((x, y) => { return (x.date > y.date) ? 1 : -1 })
            return histoListSort
        }
        if (histogramm.data.length > 0) {
            setHistogrammData(listResult())
        }
    }, [histogramm.data])

    useEffect(() => {
        if (histogramm.items.length > 0) {
            dispatch(clearDocs())
            const listDocumentID = histogramm.items.map((item) => item.encodedId)
            const end = listDocumentID.length < 10 ? listDocumentID.length : 10
            const ids = listDocumentID.slice(0, end)
            dispatch(fetchDocuments({ accessToken: tokenAccess, ids: ids }))
        }
    }, [histogramm.items])

    useEffect(() => {
        if ((histogramm.items.length > 0) && (documents.page !== 0)) {
            const listDocumentID = histogramm.items.map((item) => item.encodedId)
            const end = listDocumentID.length < (documents.page + 1) * documents.limit ? listDocumentID.length : (documents.page + 1) * documents.limit
            const ids = listDocumentID.slice(documents.page * documents.limit, end)
            dispatch(fetchDocuments({ accessToken: tokenAccess, ids: ids }))
        }
    }, [documents.page])


    const diseble = () => {
        if (histogramm.items.length === 0) { return 'hidden' }
        if (histogramm.items.length <= documents.docs.length) { return 'hidden' }
        if (documents.loading === true) { return 'hidden' }
        return 'visible'
    }

    const onclick = () => {
        dispatch(pageInc())
    }

    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <div>
                    <h1 style={{ paddingBottom: '15px' }}>Ищем. Скоро будут результаты</h1>
                    <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
                </div>
                <div>
                    <object type="image/svg+xml" data="img/gallery/search.svg">
                    </object>
                </div>
            </div>
            <div className={style.histo}>
                <div>
                    <h2>Общая сводка</h2>
                    <p>Найдено {histogramm.items.length || 0} вариантов</p>
                </div>
                <div className={style.table}>
                    {histogramm.loading ?
                        <div className={style.loader}>
                            <Loader
                                type="dotspinner"
                                color="#888888"
                                size={60} />
                        </div>
                        :
                        <CaruselSearch minMaxSlide={{ max: 150, min: 135 }} gap={0} heightSlide={160}>
                            {histogrammData.map((slide) => { return (<SlideSearch key={slide.date.toLocaleString()} {...slide} />) })}
                        </CaruselSearch>
                    }
                </div>
            </div>
            <div className={style.documents}>
                <h2>Список документов</h2>
                <div className={style.listDoc}>
                    {documents.loading ?
                        <div className={style.documentsloader}>
                            <Loader
                                type="dotspinner"
                                color="#888888"
                                size={100}
                            /></div>
                        :
                        documents.docs.map((doc) => {
                            return (<div><Document key={doc.ok.id} {...doc} /></div>)
                        })
                    }
                </div>
                <button style={{ visibility: `${diseble()}` }} onClick={onclick}>Показать еще</button>
            </div>
        </div >
    )
}