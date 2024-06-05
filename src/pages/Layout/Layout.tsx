import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'


export const Layout: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}