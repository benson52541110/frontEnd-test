import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AgeGroupSelect from "../components/AgeGroupSelect";
import PriceInput from "../components/PriceInput";

function AgeGroupPriceList({ onChange }) {
	const [result, setResult] = useState([{ ageGroup: [0, 0], price: 0 }]);
	const [resultIds, setResultIds] = useState([uuidv4()]);
	const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
	const [overlap, setOverlap] = useState([]);

	useEffect(() => {
		const intervals = result.map((item) => item.ageGroup);
		const { overlap, notInclude } = getNumberIntervals(intervals);
		setOverlap(overlap);
		setIsAddButtonDisabled(notInclude.length === 0);
		onChange(result);
	}, [result, onChange]);

	function getNumberIntervals(intervals) {
		intervals.sort((a, b) => a[0] - b[0]);

		let overlap = [];
		let notInclude = [];
		let notIncludeStart = 0;

		intervals.forEach((interval, index) => {
			if (interval[0] > notIncludeStart) {
				notInclude.push([notIncludeStart, interval[0] - 1]);
			}
			notIncludeStart = interval[1] + 1;

			if (index < intervals.length - 1) {
				let nextInterval = intervals[index + 1];
				if (interval[1] >= nextInterval[0]) {
					overlap.push([
						Math.max(interval[0], nextInterval[0]),
						Math.min(interval[1], nextInterval[1]),
					]);
				}
			}
		});

		if (notIncludeStart <= 20) {
			notInclude.push([notIncludeStart, 20]);
		}

		return { overlap, notInclude };
	}

	const handleAgeGroupChange = (index, ageGroup) => {
		setResult(
			result.map((item, idx) => (idx === index ? { ...item, ageGroup } : item))
		);
	};

	const handlePriceChange = (index, price) => {
		setResult(
			result.map((item, idx) => (idx === index ? { ...item, price } : item))
		);
	};

	const addResult = () => {
		setResult(result.concat({ ageGroup: [0, 0], price: 0 }));
		setResultIds(resultIds.concat(uuidv4()));
	};

	const removeResult = (id) => {
		const index = resultIds.indexOf(id);
		if (index > -1) {
			setResult(result.filter((_, idx) => idx !== index));
			setResultIds(resultIds.filter((_, idx) => idx !== index));
		}
	};

	return (
		<>
			{result.map((entry, index) => {
				const isOverlap = overlap.some(
					(ov) => entry.ageGroup[0] <= ov[1] && entry.ageGroup[1] >= ov[0]
				);

				return (
					<div
						key={resultIds[index]}
						className="flex flex-col gap-12 border-b-2"
					>
						<div className="flex justify-between">
							<h2 className="text-left ">價格設定 - {index + 1}</h2>
							<button
								className="text-red-500 "
								onClick={() => removeResult(resultIds[index])}
							>
								X移除
							</button>
						</div>

						<div className="flex">
							<AgeGroupSelect
								ageGroup={entry.ageGroup}
								onAgeGroupChange={(ageGroup) =>
									handleAgeGroupChange(index, ageGroup)
								}
								isOverlap={isOverlap}
							/>
							<PriceInput
								price={entry.price}
								onPriceChange={(price) => handlePriceChange(index, price)}
							/>
						</div>
					</div>
				);
			})}
			<button
				className={`flex mt-12 text-green-600 font-bold hover:text-green-500 ${
					isAddButtonDisabled ? "cursor-not-allowed" : ""
				}`}
				type="button"
				onClick={addResult}
				disabled={isAddButtonDisabled}
			>
				+ 新增價格設定
			</button>
		</>
	);
}

export default AgeGroupPriceList;
