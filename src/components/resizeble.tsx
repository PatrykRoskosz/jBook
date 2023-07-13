import { useState, useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
	direction: "horizontal" | "vertical";
	children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth * 0.75);
	let resizableProps: ResizableBoxProps;

	useEffect(() => {
		let timer: any;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				setWindowHeight(window.innerHeight);
				setWindowWidth(window.innerWidth);
				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75);
				}
			}, 100);
		};
		window.addEventListener("resize", listener);

		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [width]);

	if (direction === "horizontal") {
		resizableProps = {
			className: "resize-horizontal",
			minConstraints: [windowWidth * 0.2, Infinity],
			maxConstraints: [windowWidth * 0.75, Infinity],
			height: Infinity,
			width: width,
			resizeHandles: ["e"],
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			maxConstraints: [Infinity, windowHeight * 0.9],
			minConstraints: [Infinity, 24],
			width: Infinity,
			height: 300,
			resizeHandles: ["s"],
		};
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
