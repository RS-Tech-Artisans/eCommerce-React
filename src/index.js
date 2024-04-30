import React from "react";
import ReactDOM from "react-dom/client";

const rootContainer = document.createElement('div');
rootContainer.id = 'rootContainer';
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
root.render(<div>Hi</div>);