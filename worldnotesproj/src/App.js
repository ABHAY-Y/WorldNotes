import NotesArea from "./components/NotesArea";
import Regilog from "./components/Regilog";
import Footer from "./components/Footer";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Fragment } from "react";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Fragment><NotesArea/><Footer/></Fragment>}/>
          <Route path="/Register" element={<Regilog/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
