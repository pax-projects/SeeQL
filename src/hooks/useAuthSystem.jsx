const useAuthSystem = () => {
	return [sessionStorage.getItem("id") !== null];
}

export { useAuthSystem };