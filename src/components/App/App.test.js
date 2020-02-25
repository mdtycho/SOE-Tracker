import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("navigates to the correct url", () => {
    const comp = ['/signin', '/', '/home', '/account', '/admin'];
    act(() => {
        render(<App />, container);
    });
    const routes = container.getElementsByTagName("a");
    for (let i = 0; i < comp.length; i++) {
        expect(routes[i].getAttribute('href')).toEqual(comp[i]);
    }
});