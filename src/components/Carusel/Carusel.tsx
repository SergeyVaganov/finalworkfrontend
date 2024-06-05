import { ReactElement, useEffect, useRef, useState } from 'react'
import style from './Carusel.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore'
import { getCarusel } from '../../store/slices/caruselSlice'


export const GAP_ITEMS = 30
const Duration = 500

export const Carusel = ({ children }: { children: ReactElement[] }) => {
    const widthWindow = useAppSelector(state => state.caruselSt.windowCarusel)
    const countBlocks = useAppSelector(state => state.caruselSt.countBlocks)
    const stepOffset = useAppSelector(state => state.caruselSt.step)
    const dispatch = useAppDispatch()
    const windowRef = useRef<HTMLDivElement | null>(null)
    const cartsRef = useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = useState<number>(0)
    const [transitionDuration, setTransitionDuration] = useState<number>(500)
    const [step, setStep] = useState<number>(0)

    useEffect(() => {
        const resize = () => {
            const window = windowRef.current?.offsetWidth!
            if (window >= 900) {
                const st = ((window - (3 * GAP_ITEMS)) / 3 + GAP_ITEMS)
                dispatch(getCarusel({ windowCarusel: window, countBlocks: 3, step: st }))
            }
            if ((window < 900) && (window >= 500)) {
                const st = ((window - (2 * GAP_ITEMS)) / 2 + GAP_ITEMS)
                dispatch(getCarusel({ windowCarusel: window, countBlocks: 2, step: st }))
            }
            if (window < 500) {
                dispatch(getCarusel({ windowCarusel: window, countBlocks: 1, step: window }))
            }
        }
        resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    useEffect(() => {
        setOffset((GAP_ITEMS / 2) - stepOffset)
        setStep(0)
    }, [widthWindow, countBlocks])

    useEffect(() => {
        setOffset((GAP_ITEMS / 2) - stepOffset * (step + 1))
        if (step > children.length - 1) {
            setTimeout(() => {
                setTransitionDuration(0)
                setStep(0)
            }, Duration)
        }
        if (step < 0) {
            setTimeout(() => {
                setTransitionDuration(0)
                setStep(children.length - 1)
            }, Duration)
        }
    }, [step])

    useEffect(() => {
        if (transitionDuration === 0) {
            setTimeout(() => { setTransitionDuration(Duration) }, Duration * 0.1)
        }
    }, [transitionDuration])


    const heandler = (param: boolean) => {
        if (param) {
            setStep((prev) => prev + 1)
        } else {
            setStep((prev) => prev - 1)
        }
    }

    return (
        <div className={style.carusel}>
            <div className={style.arrow} onClick={() => heandler(false)}>
                <img src="/img/slider/arrow1.svg" alt="arrow" />
            </div>
            <div ref={windowRef} className={style.window}>
                <div
                    ref={cartsRef}
                    className={style.carts}
                    style={{ gap: `gap:${GAP_ITEMS}px`, transform: `translateX(${offset}px)`, transitionDuration: `${transitionDuration}ms` }}>
                    {children[children.length - 1]}
                    {children}
                    {children.slice(0, countBlocks)}
                </div>
            </div>
            <div className={style.arrow} onClick={() => heandler(true)}>
                <img src="/img/slider/arrow2.svg" alt="arrow" />
            </div>
        </div>
    )
}