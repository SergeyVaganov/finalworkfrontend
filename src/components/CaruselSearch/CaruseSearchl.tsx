import { Children, FunctionComponent, useEffect, useRef, useState } from 'react'
import style from './CaruselSearch.module.css'
import { SlideSearch } from '../SlideSearch/SlideSearch'


type Props = {
    children: React.ReactNode[]
    minMaxSlide: { max: number, min: number }
    gap: number
    heightSlide: number
}

const DURATION = 500

export const CaruselSearch: FunctionComponent<Props> = (props) => {
    const refContainer = useRef<HTMLDivElement>(null)
    const refSlides = useRef<HTMLDivElement>(null)
    const [widthContainer, setWidthContainer] = useState<number>(0)
    const [widthItem, setWidthItem] = useState<number[]>([0, 0, 0])
    const [step, setStep] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)

    const styleSlide: React.CSSProperties = {
        minWidth: `${widthItem[0]}px`,
        maxWidth: `${widthItem[0]}px`,
        borderRight: `1px solid #029491`,
    }

    const styleSlides: React.CSSProperties = {
        gap: `${props.gap}px`,
        left: `${props.gap / 2}px`,
        transform: `translateX(${offset}px)`
    }

    const styleWindow: React.CSSProperties = {
        minWidth: `${widthItem[1] * widthItem[2]}px`,
        maxWidth: `${widthItem[1] * widthItem[2]}px`,
        height: `${props.heightSlide}px`
    }

    let slide = props.children?.map((child, index) =>
        <div className={style.slide} key={index} style={styleSlide}>{child}</div>
    )

    if (slide?.length === 0) {
        slide[0] = <div className={style.slide} style={styleSlide}><SlideSearch date={new Date()} total={0} risk={0} /></div>
    }

    useEffect(() => {
        const resize = () => {
            setWidthContainer(refContainer.current?.offsetWidth || 0)
        }
        resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    useEffect(() => {
        const length = Children.count(props.children) || 1
        const width = getSlideWidth(widthContainer, props.minMaxSlide.max, props.minMaxSlide.min, props.gap, length)
        setWidthItem(width)
        setOffset(0)
    }, [widthContainer])

    const next = () => {
        if (-step < Children.count(props.children) - widthItem[1]) {
            setStep((prev) => prev - 1)
        }
    }

    const back = () => {
        if (step !== 0) {
            setStep((prev) => prev + 1)
        }
    }

    useEffect(() => {
        setOffset(widthItem[2] * (step))
    }, [step])

    const showBtn = () => {
        const res = widthItem[1] < Children.count(props.children)
        return res
    }

    const showBtn1 = () => {
        if (step === 0) { return false }
        return true
    }

    const showBtn2 = () => {
        if (-step === Children.count(props.children) - widthItem[1]) { return false }
        return true
    }

    return (
        <>
            <div className={style.wrapper}>
                {showBtn() && <div onClick={back} className={style.btn}
                    style={{ visibility: `${showBtn1() ? 'visible' : 'hidden'}` }} >
                    <img src="img/slider/arrow1.svg" alt="" />
                </div>}
                <div className={style.title}>
                    <div>Период</div>
                    <div>Всего</div>
                    <div>Риски</div>
                </div>
                <div ref={refContainer} className={style.container} >
                    <div className={style.windows} style={styleWindow}>
                        <div ref={refSlides} className={style.slides} style={styleSlides}>
                            {slide}
                        </div>
                    </div>
                </div>
                {showBtn() && <div onClick={next} className={style.btn}
                    style={{ visibility: `${showBtn2() ? 'visible' : 'hidden'}` }} >
                    <img src='img/slider/arrow2.svg' />
                </div>}
            </div>
        </>
    )
}

function getSlideWidth(widthContainer: number, maxItem: number, minItem: number, gap: number, length: number): number[] {

    const maxWidthItem = maxItem + gap
    const minWidthItem = minItem + gap
    const minCount = Math.ceil(widthContainer / maxWidthItem)
    let result = [0, 0]
    if (minCount === 0) { result = [widthContainer - gap, 1, widthContainer] }
    if (minCount <= length) { result = [widthContainer / minCount, minCount] }
    if (minCount > length) { return [maxWidthItem - gap, length, maxWidthItem] }

    let result1 = [0, 0]
    let maxCount = Math.floor(widthContainer / minWidthItem)
    if (maxCount === 0) { return [minWidthItem - gap, 1, minWidthItem] }
    if (maxCount <= length) { result1 = [widthContainer / maxCount, maxCount] }
    if (maxCount > length) { result1 = [maxWidthItem, length] }

    if ((minWidthItem <= result[0]) && (result[0] <= maxWidthItem)) { return [result[0] - gap, result[1], result[0]] }
    if ((minWidthItem <= result1[0]) && (result1[0] <= maxWidthItem)) { return [result1[0] - gap, result1[1], result[0]] }

    const res = [maxWidthItem - gap, result[1] - 1, maxWidthItem]

    return res
}
