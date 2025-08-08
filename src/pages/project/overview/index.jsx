import { useState } from "react";
import { useForm } from "react-hook-form";

import ReactMarkdown  from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


const Overview = () => {
	const [isEditing, setIsEditing] = useState(false);

	const { register, handleSubmit, getValues } = useForm({
		defaultValues: {
			overview: "# No overview\nPlease, start writing your project overview by clicking on the edit mode button right down!\n\n---\n\nHere vanilla _MarkDown_ is used.\nTo write code blocks follow theses steps:\n1. Write _three_ backslashes: **`**.\n2. Write the language you're writing with, example: js, sql, php...\n>**WARNING:** No space are allowed between the backslashes and the language name!\n3. Press enter and start writing your code.\n4. Close by 3 backslashes again.\n\n### Here an example:\n ```py\nprint(\"Hello, World!\")\n```"
		}
	});

	const onSubmit = (data) => {
		return
	};

	return (
		<div id="overview">
			{
				!isEditing 
				? <div>
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
							{getValues("overview")}
						</ReactMarkdown>

						<button onClick={() => setIsEditing(true)}>Edit overview</button>
				</div>
				: <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
					<textarea
						{...register("overview", { required: true, maxLength: 500 })}
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

export default Overview;