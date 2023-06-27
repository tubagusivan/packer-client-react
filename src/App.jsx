import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  )
}

export default App