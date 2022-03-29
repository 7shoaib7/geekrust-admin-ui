// import logo from './logo.svg';
import './App.css';
import UserRecordTable from './components/UserRecordTable'
import theme from "./theme"
import { ThemeProvider } from "@mui/system";


export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <h1>Admin UI</h1> */}
        <UserRecordTable />
      </ThemeProvider>
    </div>
  );
}



