const Tab = ({ name, actionListener, index, isActive }) => {
	return (
		<div
			key={index}
			onClick={actionListener}
			className={`inline-block cursor-pointer select-none rounded-md ${
				isActive ? "bg-white" : ""
			} m-1 px-1`}
		>
			{name}
		</div>
	);
};
export default Tab;
