import Message from "../Message";

export function Container({ children }) {
	return (
		<main className="mt-14 h-[calc(100dvh-56px)] overflow-hidden bg-gray-100 pl-14">
			 <Message message="This is a flash message" type="success" />
			{children}
		</main> 
	);
}