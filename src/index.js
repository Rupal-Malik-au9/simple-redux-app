import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import postsReducer from "./reducer";

import App from "./App";

// store
// TODO: add preloaded state
const clientStore = configureStore({
	reducer: { posts: postsReducer },
});
console.log(document, "document from index.js");
console.log(ReactDOM, "reactDOM");

// root element
const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(ReactDOM, "reactDOM");
// passing store into Provider
root.render(
	<Provider store={clientStore}>
		<App />
	</Provider>
);

// inside Real DOM or HTML DOM, root exists as node and ReactDOM.createRoot converts the (structure in) VIrtuualDOM/REactDOM into HTML.
