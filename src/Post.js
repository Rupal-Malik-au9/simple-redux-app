import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postDeleted, postUpdated } from "./reducer";
export default function Post({ id, name, text, index }) {
	const paraRef = React.createRef();
	const dispatch = useDispatch();
	const [toggle, setToggleButton] = useState(true);
	const [editingMode, setEditingMode] = useState(false);
	const [newName, setNewName] = useState(name);
	const [newText, setNewText] = useState(text);

	const handleClick = () => {
		if (paraRef.current) {
			if (paraRef.current.style.display === "none") {
				paraRef.current.style.display = "inline";
				setToggleButton(false);
			} else {
				paraRef.current.style.display = "none";
				setToggleButton(true);
			}
		}
	};

	const handleEdit = () => {
		console.log({ _id: id, name: newName, text: newText }, "lklklkl");
		dispatch(postUpdated({ _id: id, name: newName, text: newText }));
		setEditingMode(false);
	};

	const handleDelete = () => {
		dispatch(postDeleted({ id: id }));
	};
	return (
		<>
			{editingMode ? (
				<>
					<label>Name </label>
					<input
						name="name"
						type="text"
						value={newName}
						placeholder={"Enter name"}
						onChange={(e) => setNewName(e.target.value)}
					/>
					<br />
					<br />
					<br />
					<label>Text </label>
					<textarea
						rows="5"
						name="text"
						type="text"
						value={newText}
						placeholder={"Enter text"}
						onChange={(e) => setNewText(e.target.value)}
					/>
					<br />
				</>
			) : (
				<>
					<Link to={`/posts/${id}`}>
						<h3>
							<span>{index + 1} </span>
							{name}
						</h3>
					</Link>
					<p className="post-para">
						{text.length !== 0 && text.slice(0, 50)}
						<span ref={paraRef} style={{ display: "none" }}>
							{text.slice(50)}
						</span>
					</p>
					<button style={{ cursor: "pointer" }} onClick={handleClick}>
						{toggle ? "Read more" : "Show less"}
					</button>
					<button
						style={{ cursor: "pointer" }}
						onClick={() => setEditingMode(true)}
					>
						edit
					</button>
				</>
			)}
			{editingMode && (
				<button style={{ cursor: "pointer" }} onClick={handleEdit}>
					save
				</button>
			)}
			<button style={{ cursor: "pointer" }} onClick={handleDelete}>
				delete
			</button>
		</>
	);
}
