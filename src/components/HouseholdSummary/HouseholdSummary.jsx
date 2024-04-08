const HouseholdSummary = ({ usersData, activeTab, setActiveTab }) => {
	return (
		<div className="w-1/2 bg-gray-300 p-8 rounded-lg">
			<h1 className="uppercase font-bold text-center mb-">
				Háztartás összsített jövedelme
			</h1>
			<table className="w-full">
				<thead>
					<tr className="bg-gray-200">
						<th className="px-4 py-2 text-left">Családtag neve</th>
						<th className="px-4 py-2 text-left">Nettó bér</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(usersData).map((key) => (
						<tr
							key={key}
							onClick={() => setActiveTab(key)}
							className={`${
								activeTab == key ? "bg-gray-500" : "bg-white"
							} select-none cursor-pointer hover:bg-gray-200`}
						>
							<td className="px-4 py-2 border border-gray-300">
								{usersData[key]?.name || "Family member"}
							</td>
							<td className="px-4 py-2 border border-gray-300">
								{usersData[key]?.netto} Ft
							</td>
						</tr>
					))}
					<tr className="bg-white">
						<td className="px-4 py-2 border border-gray-300">Összesen:</td>
						<td className="px-4 py-2 border border-gray-300">
							{Object.keys(usersData).reduce((sum, key2) => {
								return sum + parseInt(usersData[key2]?.netto);
							}, 0)}{" "}
							Ft
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default HouseholdSummary;
