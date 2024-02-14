import AuthContextProvider from "./features/auth/contexts/AuthContext"
import Router from "./routes"

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App
