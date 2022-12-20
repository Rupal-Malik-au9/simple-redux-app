import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { AddPostForm } from "./AddPostForm";
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import "./style.css";

export default function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						exact
						path="/posts"
						element={
							<>
								<h2>AllPosts</h2>
								<AddPostForm />
								<br />
								<AllPosts />
							</>
						}
					/>
					<Route
						exact
						path="/"
						element={
							<div>
								<h2>navbar</h2>
								<Link to="/posts"> All posts</Link>
							</div>
						}
					/>
					<Route exact path="/posts/:postId" element={<SinglePost />} />
				</Routes>
			</div>
		</Router>
	);
}
