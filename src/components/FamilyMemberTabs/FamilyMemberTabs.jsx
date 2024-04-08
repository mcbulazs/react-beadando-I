import Tab from "./components/Tab";
import React, { useState, useEffect } from "react";

const FamilyMemberTabs = ({ activeTab, setActiveTab, usersData }) => {
	function changeTab(index) {
		setActiveTab(index);
	}
	function createTab() {
		setActiveTab(Object.keys(usersData).length);
	}
	return (
		<div className="flex flex-row my-1">
			<div className="bg-gray-300 rounded-md flex m-1 flex-wrap">
				{Object.keys(usersData).map((key) => (
					<Tab
						key={key}
						name={
							usersData[key].name == "" ? "Family member" : usersData[key].name
						}
						isActive={parseInt(key) == activeTab}
						actionListener={() => changeTab(key)}
					/>
				))}
			</div>
			<div className="bg-gray-300 rounded-md m-1 h-8 aspect-square p-1 flex justify-center">
				<span
					onClick={createTab}
					className="select-none cursor-pointer align-middle text-l"
				>
					➕
				</span>
			</div>
		</div>
	);
};

export default FamilyMemberTabs;
