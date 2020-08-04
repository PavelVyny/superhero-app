import React, { useState } from "react";

const PowersInput = (props) => {
	const [listState, setState] = useState([]);



	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...listState];
		list[index][name] = value;
		setState(list);
		// lifting up powers to parent component (UserForm)
		props.updatePowers(listState)
	};

	// handle click event of the Remove button
	const handleRemoveClick = (i) => {
		const list = [...listState];
		const newlist = [].concat(list)
		newlist.splice(i, 1);
		setState(newlist);
		//lifting up new array of powers to the parent (UserForm)
		props.updatePowers(newlist)
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setState([...listState, { text: '' }]);
	};
	return (
		<>
			<div className="add-btn" onClick={handleAddClick}>Add a power</div>
			{listState.map((x, i) => {
				return (
					<div key={i} className="input-box">
						<input
							className="form-control form-control_child"
							name="text"
							placeholder={'Enter power'}
							value={x.text}
							onChange={e => handleInputChange(e, i)}
						/>
						<div
							className="remove-btn"
							onClick={() => handleRemoveClick(i)}
						>
							Remove
						</div>
					</div>
				);
			})}
		</>
	);
}

export default PowersInput;