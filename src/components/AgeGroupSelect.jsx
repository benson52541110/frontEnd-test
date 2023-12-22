import React, { useEffect, useState } from "react";

function AgeGroupSelect({ ageGroup, onAgeGroupChange, isOverlap }) {
	const [startAge, setStartAge] = useState(ageGroup[0]);
	const [endAge, setEndAge] = useState(ageGroup[1]);

	useEffect(() => {
		setStartAge(ageGroup[0]);
		setEndAge(ageGroup[1]);
	}, [ageGroup]);

	const handleStartAgeChange = (e) => {
		const newStartAge = Number(e.target.value);
		setStartAge(newStartAge);
		onAgeGroupChange([newStartAge, endAge]);
	};

	const handleEndAgeChange = (e) => {
		const newEndAge = Number(e.target.value);
		setEndAge(newEndAge);
		onAgeGroupChange([startAge, newEndAge]);
	};

	return (
		<div className="flex flex-col flex-1 w-1/4 p-2">
			<h3 className="text-left text-gray-400">年齡</h3>
			<div className="flex pt-2">
				<select
					className={`flex-1 border ${isOverlap ? "border-red-500" : ""}`}
					value={startAge}
					onChange={handleStartAgeChange}
				>
					{Array.from({ length: 21 }, (_, i) => (
						<option key={i} value={i} disabled={i > endAge}>
							{i}
						</option>
					))}
				</select>

				<div className="px-2 py-4 text-center text-gray-500 bg-gray-200 border-gray-200">
					~
				</div>

				<select
					className={`flex-1 border ${isOverlap ? "border-red-500" : ""}`}
					value={endAge}
					onChange={handleEndAgeChange}
				>
					{Array.from({ length: 21 }, (_, i) => (
						<option key={i} value={i} disabled={i < startAge}>
							{i}
						</option>
					))}
				</select>
			</div>
			{isOverlap && (
				<div className="px-2 py-1 text-sm text-left text-red-500 bg-red-100">
					年齡區間不可重疊
				</div>
			)}
		</div>
	);
}

export default AgeGroupSelect;
