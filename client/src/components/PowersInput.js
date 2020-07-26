import React, { useState } from "react";

function PowersInput() {
	const [inputList, setInputList] = useState([{ text: '' }]);

	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
		// console.log(list)
	};

	// handle click event of the Remove button
	const handleRemoveClick = index => {
		const list = [...inputList];
		console.log(list);
		list.splice(index, 1);
		console.log(list);
		setInputList(list);
		console.log(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, { text: '' }]);
	};

	return (
		<div className="powers">
			{inputList.map((x, index) => {
				return (
					<div key={index} className="box">
						<input
							name="text"
							placeholder="Enter superpower"
							value={x.firstName}
							onChange={e => handleInputChange(e, index)}
						/>
						<div className="btn-box">
							{inputList.length !== 1 && <button
								className="mr10"
								onClick={() => handleRemoveClick(index)}>Remove</button>}
							{inputList.length - 1 === index && <button onClick={handleAddClick}>Add</button>}
						</div>
					</div>
				);
			})}
			<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
		</div>
	);
}

export default PowersInput;