import { useEffect } from "react";
import { useContext, useState } from "react";
import AppContent from "./components/AppContent";
import LoadingPage from "./components/LoadingPage";
import LayoutContext from "./contexts/Layout";
function App() {
  const { clientHeight } = useContext(LayoutContext);
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    if (!Number.isNaN(clientHeight)) {
      setTimeout(() => {
        setIsloaded(true);
      }, 10000);
    } else {
      setIsloaded(false);
    }
  }, [clientHeight]);
  return (
    <div>
      {isLoaded && <AppContent />}
      {!isLoaded && <LoadingPage />}
    </div>
  );
}
export default App;
