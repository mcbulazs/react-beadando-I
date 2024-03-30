const BasicButton = ({ text, actionListener, value }) => {
	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={actionListener}
			value={value}
		>
			{text}
		</button>
	);
};
export default BasicButton;
