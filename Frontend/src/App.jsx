import useDarkMode from "./hooks/useDarkMode";
import useVisitorTracking from "./hooks/useVisitorTracking";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { dark, setDark } = useDarkMode();
  useVisitorTracking();

  return <AppRoutes dark={dark} setDark={setDark} />;
}

export default App;