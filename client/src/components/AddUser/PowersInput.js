import React, { useState } from "react";

const PowersInput = (props) => {
	const [listState, setState] = useState([]);



	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...listState];
		list[index][name] = value;
		setState(list);
		// lifting up powers to parent component
		props.updatePowers(listState)
	};

	// handle click event of the Remove button
	const handleRemoveClick = (i) => {
		const list = [...listState];
		const newlist = [].concat(list)
		newlist.splice(i, 1);
		setState(newlist);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setState([...listState, { text: '' }]);
	};
	return (
		<>
			<div className="btn" onClick={handleAddClick}>Add a power</div>
			{listState.map((x, i) => {
				return (
					<div key={i}>
						<div  className="input-box">
							<input
								name="text"
								placeholder={'Enter power'}
								value={x.text}
								onChange={e => handleInputChange(e, i)}
							/>

							<div
								className="btn"
								onClick={() => handleRemoveClick(i)}
							>
								Remove
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default PowersInput;