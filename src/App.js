import { useEffect } from "react";
import { useContext, useState } from "react";
import AppContent from "./components/AppContent";
import LoadingPage from "./components/LoadingPage";
import LayoutContext from "./contexts/Layout";
import { createGlobalStyle } from "styled-components";

const HideScrollBarStyle = createGlobalStyle`
  html{
    overflow:${(props) => (props.isLoaded ? "auto" : "hidden")};
  }
`;

function App() {
  const { isScreenStatisticReady } = useContext(LayoutContext);
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    if (isScreenStatisticReady) {
      setTimeout(() => {
        setIsloaded(true);
      }, 1000);
    } else {
      setIsloaded(false);
    }
  }, [isScreenStatisticReady]);
  return (
    <>
      <HideScrollBarStyle isLoaded={isLoaded} />
      <AppContent />
      {!isLoaded && <LoadingPage />}
    </>
  );
}
export default App;
