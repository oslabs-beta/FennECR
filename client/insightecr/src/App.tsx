import "./App.css";
import PosNegBarChart from './Components/BarChart';
import Header from './Components/Header';
import NavDrawer from './Components/NavigationDrawer'

function App() {

  return (
    <>
      <h1>InsightECR</h1>
      <PosNegBarChart />
      <Header title="Bar Chart" />
      <Header title="Pie Chart" />
      <Header title="Detail Card" />
      <NavDrawer />
    </>
  );
}

export default App;
