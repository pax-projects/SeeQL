import { useState } from "react";
import { useForm } from "react-hook-form";

import ReactMarkdown  from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


const Docs = () => {
	const [isEditing, setIsEditing] = useState(false);

	const { register, handleSubmit, getValues } = useForm({
		defaultValues: {
			documentation: "# No documentation\nPlease, start writing your project documentation by clicking on the edit mode button right down!\n\n---\n\nHere is an example of documentation:\n\n# print(val: any) -> None:\n>The print() function prints the specified message to the screen, or other standard output device.\n\n>The message can be a string, or any other object, the object will be converted into a string before written to the screen.\n\n>```python\n>print(\"Hello, World!\")\n>```\n\n[Source: w3schools](https://www.w3schools.com/python/ref_func_print.asp)"
		}
	});

	const onSubmit = (data) => {
		return
	};

	return (
		<div id="documentation">
			{
				!isEditing 
				? <div className="react-markdown">
					<ReactMarkdown
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										style={dracula}
										language={match[1]}
										PreTag="div"
										{...props}
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
								) : (
									<code className={className} {...props}>
										{children}
									</code>
								);
							}
						}}
						>
							{getValues("documentation")}
						</ReactMarkdown>

						<button onClick={() => setIsEditing(true)}>Edit docs</button>
				</div>
				: <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
					<textarea
						{...register("documentation", { required: true, maxLength: 500 })}
						placeholder="Tapez ici..."
					/>
					<div className="flex-row-around">
						<button type="reset" onClick={() => setIsEditing(false)}>Abort changes</button>
						<button type="submit" onClick={() => setIsEditing(false)}>Validate changes</button>
					</div>
				</form>
			}
		</div>
	);
}

export default Docs;