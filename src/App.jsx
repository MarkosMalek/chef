import "./App.css";
import Header from "./layout/header";
import MainComponent from "./features/mainComponent";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <MainComponent />
      </div>
    </>
  );
}

export default App;
