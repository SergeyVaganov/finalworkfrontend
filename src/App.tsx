import { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Layout } from './pages/Layout/Layout';
import { FAQ } from "./pages/FAQ/Faq"
import { Price } from "./pages/Price/Price"
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { RequestDataPage } from "./pages/RequestDataPage/RequestDataPage";
import { DocumentPage } from "./pages/DocumentPage/DocumentPage";
import { useAppSelector } from './hooks/hooksStore'


export interface IRoutes {
  name: string,
  href: string,
  element: FunctionComponent | null
}

export const listRouteNavbar: IRoutes[] = [
  { name: 'Главная', href: '/', element: Main },
  { name: 'Тарифы', href: '/price', element: Price },
  { name: 'FAQ', href: '/faq', element: FAQ }]

function App() {

  const auth = useAppSelector(state => state.authSt.authorized)


  const getElement = (fc: FunctionComponent | null) => {
    if (!fc) { return (<></>) }
    return fc({})
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {listRouteNavbar.map((route) => {
          return <Route key={route.name} index={route.name === 'Главная' ? true : false}
            path={route.href} element={getElement(route.element)} />
        })}
        <Route
          path="signin"
          element={<SignInPage />} />
        <Route
          path="signup"
          element={<SignUpPage />} />
        <Route
          path="request"
          element={auth ? (<RequestDataPage />) : (<Navigate replace to="/signin" />)} />
        {/* <Route
            path="request"
            element={<RequestDataPage />}
          /> */}
        {/* <Route
            path="documents"
            element={<DocumentPage />}
          /> */}
        <Route
          path="documents"
          element={auth ? (<DocumentPage key={Date.now()} />) : (<Navigate replace to="/signin" />)} />
      </Route>
    </Routes>
  );
}

export default App;
