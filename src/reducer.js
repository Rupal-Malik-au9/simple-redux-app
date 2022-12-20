import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [];
// name is same as the key used in store
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		allPosts(state, action) {
			state = action.payload;
			return state;
		},
		// action's name used when action is dispatched in the code
		postsAdded(state, action) {
			// action contains all info about new posts
			axios
				.post("http://localhost:3002/add", action.payload)
				.then((response) => {
					const data = response.data;
					return data;
				})
				// Catch and print errors if any
				.catch((error) => console.error("error on adding new post", error));
			state.push(action.payload);
		},
		postUpdated(state, action) {
			const { _id: id, name, text } = action.payload;
			const existingPost = state.find((post) => post._id === id);
			if (existingPost) {
				existingPost._id = id;
				existingPost.name = name;
				existingPost.text = text;
			}
			axios
				.put(`http://localhost:3002/${id}`, existingPost)
				.then((response) => {
					const data = response.data;
					return data;
				})
				// Catch and print errors if any
				.catch((error) => console.error("error on adding new post", error));
		},
		postDeleted(state, action) {
			const { id } = action.payload;
			axios
				.delete(`http://localhost:3002/${id}`)
				.then((response) => {
					const data = response.data;
					return data;
				})
				// Catch and print errors if any
				.catch((error) => console.error("error on deleting the post", error));
			return state.filter((post) => post._id !== id);
		},
	},
});
export const { allPosts, postsAdded, postUpdated, postDeleted } =
	postsSlice.actions;

export default postsSlice.reducer;
