import { Outlet } from 'react-router-dom'

/**
 * Layout компонент (опционально)
 * 
 * Можно использовать для общей обёртки страниц:
 * - Шапка (Header)
 * - Подвал (Footer)
 * - Навигация
 * 
 * Для использования оберните routes в router.tsx:
 * 
 * {
 *   element: <App />,
 *   children: [
 *     { path: '/', element: <Home /> },
 *     { path: '/about', element: <About /> },
 *   ]
 * }
 */
export default function App() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}