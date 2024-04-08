import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import React, { useState, useEffect } from "react";

const HouseholdSalaryCalculator = () => {
	const [activeTab, setActiveTab] = useState(-1);
	const [usersData, setUsersData] = useState(() => {
		const data = localStorage.getItem("usersData");
		return data ? JSON.parse(data) : {};
	});
	useEffect(() => {
		if (Object.keys(usersData).length > 0) {
			setActiveTab(Object.keys(usersData).length - 1);
		}
	}, []);
	useEffect(() => {
		localStorage.setItem("usersData", JSON.stringify(usersData));
	}, [usersData]);
	function remove(index) {
		const updatedUsersData = { ...usersData };
		delete updatedUsersData[index];
		setUsersData(updatedUsersData);
		setActiveTab(Object.keys(updatedUsersData).length - 1);
	}
	return (
		<>
			<header className="w-3/12">
				<FamilyMemberTabs
					activeTab={activeTab}
					usersData={usersData}
					setActiveTab={(index) => setActiveTab(index)}
				/>
			</header>
			<main className="w-6/12 flex flex-row gap-1">
				{activeTab >= 0 && (
					<SalaryCalculator
						removeFunc={() => remove(activeTab)}
						index={activeTab}
						usersData={usersData}
						setUsersData={(object) => setUsersData(object)}
					/>
				)}
				{Object.keys(usersData)?.length > 1 && (
					<HouseholdSummary
						setActiveTab={(index) => setActiveTab(index)}
						activeTab={activeTab}
						usersData={usersData}
					/>
				)}
			</main>
		</>
	);
};

export default HouseholdSalaryCalculator;
