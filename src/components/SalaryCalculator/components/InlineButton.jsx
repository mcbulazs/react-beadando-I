const InlineButton = ({ content, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`aspect-square h-4 bg-blue-600 text-white rounded-full mx-1 ${className}`}
		>
			{content}
		</button>
	);
};
export default InlineButton;
