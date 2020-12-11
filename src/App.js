import './App.css';

import Header from "./components/Header/Header";
import Workspace from "./components/Workspace/Workspace";
import Viewer from "./containers/Viewer/Viewer";

const App = () => {
  return (
    <>
      <Header />
      <Workspace>
        <Viewer />
      </Workspace>
    </>
  );
}

export default App;
