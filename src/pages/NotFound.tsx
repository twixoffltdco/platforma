import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="text-xl text-slate-600">Страница не найдена</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-medium rounded-lg hover:opacity-90 transition"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
