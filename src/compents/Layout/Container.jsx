export function Container({ children }) {
	return (
		<main className="flex min-h-screen flex-row  justify-start bg-gray-100 pl-14 pt-14">
			{children}
		</main>
	);
}