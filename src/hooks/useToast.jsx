import { toast } from "react-toastify";

const useToast = () => {
	// Calling toast method by passing string
	const displayToast = (type, message) => {
		if (type === "OK") {
			toast.success("The operation was successful.", {
				position: "bottom-left",
				autoClose: 3000,
			});
		} else if (type === "warning") {
			toast.warning(message, {
				position: "bottom-left",
				autoClose: 5000,
			});
		} else {
			toast.error(message, {
				position: "bottom-left",
				autoClose: 10000,
			});
		}
	}

	return displayToast;
}

export { useToast };