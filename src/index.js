import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient()
root.render(
  <BrowserRouter>
  <QueryClientProvider client={client}>
  <SnackbarProvider maxSnack={3}>

    <App />
  </SnackbarProvider>
  </QueryClientProvider>
  </BrowserRouter>
);