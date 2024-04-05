import Tab from "./components/Tab";
import React, { useState } from "react";

const FamilyMemberTabs = () => {
	const [names, setNames] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	function changeTab(index) {
		setActiveTab(index);
		console.log("Tab changed to: " + index);
	}
	function createTab() {
		setNames([...names, "New Member"]);
	}
	return (
		<div className="flex flex-row my-1">
			<div className="bg-gray-300 rounded-md flex m-1 flex-wrap">
				{names.map((elem, index) => (
					<Tab
						key={index}
						name={elem}
						isActive={index == activeTab}
						actionListener={() => changeTab(index)}
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
