export function Container({ children }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pl-14 pt-14">
			{children}
		</main>
	);
}