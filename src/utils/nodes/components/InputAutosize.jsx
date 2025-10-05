import { useState, useEffect, useRef } from "react";

const InputAutosize = (props) => {
	const inputRef = useRef(null);

	const [content, setContent] = useState(props.defaultValue);

	useEffect(() => {
		if (!inputRef.current) return;

		inputRef.current.style.minWidth = `${(content.length - 7) * 10}px`;
		if (content.length <= 7) inputRef.current.style.minWidth = "125px";
	}, [inputRef, content]);

	return <input
		defaultValue={content}
		ref={inputRef}
		onChange={(e) => setContent(e.target.value)}
		spellCheck="false"
		{...props}
	/>
}

export default InputAutosize;
