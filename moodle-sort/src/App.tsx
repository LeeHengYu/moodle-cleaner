import { Button, Switch } from "@nextui-org/react";
import "./App.css";

function App() {
  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        console.log("hello");
      },
    });
  };

  return (
    <div>
      <Button onClick={onClick} color="primary" className="mx-3">
        Click Me
      </Button>
      <Switch defaultSelected aria-label="Apply" size="md">
        Apply Filtering
      </Switch>
    </div>
  );
}

export default App;
