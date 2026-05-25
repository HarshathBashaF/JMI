import useDarkMode from "./hooks/useDarkMode";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { dark, setDark } = useDarkMode();

  return <AppRoutes dark={dark} setDark={setDark} />;
}

export default App;