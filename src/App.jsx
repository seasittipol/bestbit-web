import { Flip, ToastContainer } from "react-toastify"
import Router from "./routes"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router />
      <ToastContainer position='bottom-right' autoClose={3000} theme='colored' transition={Flip} />
    </>
  )
}

export default App
