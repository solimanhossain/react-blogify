import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Portal({ children }) {
    const mountElement = document.getElementById("portal");
    const elementDiv = document.createElement("div");

    useEffect(() => {
        mountElement.appendChild(elementDiv);

        return () => mountElement.removeChild(elementDiv);
    }, [elementDiv, mountElement]);

    return createPortal(children, elementDiv);
}
