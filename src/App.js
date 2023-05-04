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
  const { clientHeight, screenNodesInfor } = useContext(LayoutContext);
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    if (!Number.isNaN(clientHeight) && screenNodesInfor.length > 0) {
      console.log("screenNodesInfor", screenNodesInfor);
      setTimeout(() => {
        setIsloaded(true);
      }, 1000);
    } else {
      setIsloaded(false);
    }
  }, [clientHeight, screenNodesInfor]);
  return (
    <>
      <HideScrollBarStyle isLoaded={isLoaded} />
      <AppContent />
      {!isLoaded && <LoadingPage />}
    </>
  );
}
export default App;
