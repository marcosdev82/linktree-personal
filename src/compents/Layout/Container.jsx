export function Container({ children }) {
	return (
		<main className="mt-14 flex h-[calc(100dvh-56px)] flex-row justify-start overflow-hidden bg-gray-100 pl-14">
			{children}
		</main>
	);
}