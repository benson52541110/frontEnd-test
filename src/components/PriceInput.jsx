import React, { useState, useEffect } from "react";

function PriceInput() {
	const [inputValue, setInputValue] = useState(""); // 用于存储实际输入的值
	const [formattedValue, setFormattedValue] = useState(""); // 用于存储格式化后的显示值
	const [isNull, setIsNull] = useState(false);

	useEffect(() => {
		setFormattedValue(addComma(inputValue));
	}, [inputValue]);

	function handleInputChange(e) {
		const rawValue = e.target.value.replace(/,/g, "");
		setInputValue(rawValue);
	}

	function handleInputBlur() {
		setIsNull(true);
	}

	function addComma(number) {
		if (!number) return "";

		const parts = number.toString().split(".");

		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		return parts.join(".");
	}

	return (
		<div className="flex flex-col w-1/4 p-2">
			<h3 className="text-left text-gray-400">入住費用(每人每晚)</h3>
			<div className="flex pt-2">
				<div className="px-2 py-4 text-center text-gray-500 bg-gray-200 border-gray-200">
					TWD
				</div>
				<input
					type="text"
					value={formattedValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					className={`flex-1 border ${isNull ? "border-red-500" : ""}`}
				/>
			</div>
			{isNull && !inputValue && (
				<div className="px-2 py-1 text-sm text-left text-red-500 bg-red-100">
					不可以為空白
				</div>
			)}
			<div className="text-right text-gray-500">輸入 0 表示免費</div>
		</div>
	);
}

export default PriceInput;
