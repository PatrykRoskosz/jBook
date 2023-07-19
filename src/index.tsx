import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";

const rootElement = document.querySelector("#root") as HTMLElement;
const root = createRoot(rootElement);
const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};

root.render(<App />);
