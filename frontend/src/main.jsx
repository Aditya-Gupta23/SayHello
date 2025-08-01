import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "stream-chat-react/dist/css/v2/index.css";
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"
const queryClient = new QueryClient()
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
