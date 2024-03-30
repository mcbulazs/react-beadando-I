const BasicInput = ({ name, placeholder, desc, type, value, changeFunc }) => {
	return (
		<>
			<label className="block text-sm font-medium text-gray-700">{name}</label>
			<input
				type={type}
				value={value}
				className="p-2 shadow-sm h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				placeholder={placeholder}
				onChange={changeFunc}
			/>
			<p className="text-sm text-gray-500 mb-4">{desc}</p>
		</>
	);
};

export default BasicInput;
