import "./App.css";
import PosNegBarChart from './Components/BarChart';
import Header from './Components/Header';

function App() {

  return (
    <>
      <h1>InsightECR</h1>
      <PosNegBarChart />
      <Header title="Container Title" />
    </>
  );
}

export default App;
