import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner'; // ✅ Correct import
import App from "./App";
import './index.css';
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster richColors position="top-center" /> {/* Optional config */}
      </BrowserRouter>
    </Provider>

);
