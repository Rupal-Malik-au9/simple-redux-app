import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function SinglePost() {
	const { postId } = useParams();
	const posts = useSelector((state) => state.posts);
	const post = posts.find((post) => post._id === postId);

	return (
		<div className="single-post-wrapper">
			<h3>{post.name}</h3>
			<p>{post.text}</p>
			<br />
			<br />
			<Link to="/posts">Back to posts</Link>
		</div>
	);
}
