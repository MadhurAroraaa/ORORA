import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { DataProvider } from './context/DataContext'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const Providers = ({ children }) => {
  const content = (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )

  if (!PUBLISHABLE_KEY) {
    if (import.meta.env.DEV) {
      console.warn('Clerk key missing. Auth UI disabled.')
    }
    return content
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {content}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        <Providers>
          <App />
        </Providers>
      </CartProvider>
    </DataProvider>
  </StrictMode>,
)
