import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Post from "./Post";
import { allPosts } from "./reducer";

export default function AllPosts() {
	const posts = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	React.useEffect(() => {
		if (posts.length === 0) {
			fetch("http://localhost:3002/")
				.then((response) => response.json())
				.then((data) => dispatch(allPosts(data)));
		}
	}, []);
	return (
		<>
			<h2>Posts</h2>
			<Link to="/">Back to home</Link>
			<div className="post-container">
				{posts.length > 0 &&
					posts.map(({ name, _id, text }, index) => (
						<div key={_id} className="post">
							<Post name={name} id={_id} text={text} index={index} />
						</div>
					))}
			</div>
		</>
	);
}
