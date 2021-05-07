import { render } from "react-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { StartButton } from "../pages/index";

let container: HTMLDivElement;
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

it("「メモを取る」ボタンからページ遷移するか", () => {
  render(<StartButton />, container);
  const startButton = container.querySelector(`[data-testid="start-button"]`);

  act(() => {
    startButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(window.location.pathname).toEqual("/home");
});
