import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postsAdded } from "./reducer";

export const AddPostForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [text, setText] = useState("");

	const submitHandler = () => {
		let form = { name, text };
		dispatch(postsAdded(form));
		setName("");
		setText("");
	};

	return (
		<div>
			<h3>Add new post</h3>
			<label htmlFor="name">name: </label>
			<input
				name="name"
				type="text"
				id="name"
				value={name}
				placeholder={"Enter name"}
				onChange={(e) => setName(e.target.value)}
			/>
			<br />
			<br />
			<label htmlFor="text">text: </label>
			<textarea
				name="text"
				type="text"
				id="text"
				value={text}
				placeholder={"Enter text"}
				onChange={(e) => setText(e.target.value)}
			/>
			<br />
			<br />
			<button type="submit" onClick={submitHandler}>
				ADD
			</button>
			<br />
			<br />
		</div>
	);
};
