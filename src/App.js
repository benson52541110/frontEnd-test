import AgeGroupPriceList from "./UI/AgeGroupPriceList";
import "./App.css";

function App() {
	return (
		<div className="p-10 App">
			<div className="flex flex-col gap-12">
				<AgeGroupPriceList onChange={(result) => console.log(result)} />
			</div>
		</div>
	);
}

export default App;
