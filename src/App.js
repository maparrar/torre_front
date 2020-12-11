import './App.css';

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Viewer from "./containers/Viewer/Viewer";

function App() {
  return (
    <>
      <Header />
      <Body>
        <Viewer />
      </Body>
    </>
  );
}

export default App;
