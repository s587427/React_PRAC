import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Expenses from './pages/Expenses.jsx'
import Invoices from './pages/Invoices/Invoices.jsx'
import InvoicesDetail from './pages/Invoices/InvoicesDetail.jsx'
import Notfound from './pages/NotFound.jsx'
import Book from './concepts/demo/Book.jsx'


/**
 * 索引路線，沒有接收到任何參數顯示此選項
 *1.放在父路由裡面 
 *2.索引路由是父路由的默認子路由
 *3.當父路由匹配但其他子路由都不匹配時，索引路由匹配
 *4.當用戶尚未單擊導航列表中的一項時，會呈現索引路由。
 *5.沒有path 因為索引路由共享父路徑             
 */


export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav>
        <Link to="/" className="m-5">Home</Link>
        <Link to="/invoices" className="m-5">Invoices</Link>
        <Link to="/expenses" className="m-5">Expenses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="expenses" element={<Expenses />} />
        {/* Invoices使用嵌套路由 */}
        <Route path="invoices" element={<Invoices />}>
          <Route index
            element={
              <main className="p-5">
                <p>Select an invoice</p>
              </main>
            }
          />
          {/* {路由組件傳參數:invoiceId} */}
          <Route path=":invoiceId" element={<InvoicesDetail />} />
        </Route>
        {/* 星號代表上述沒匹配則匹被這個路由組件 */}
        <Route path="*" element={<Notfound />} />
      </Routes>

    </div>
  )
}

const Home = () => {
  return (
    <>
      <h1 className="mt-5">This is Home</h1>
      <Book />
    </>
  )
}
