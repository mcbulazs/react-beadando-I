import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
	return (
		<>
			<header className="w-3/12">
				<FamilyMemberTabs />
			</header>
			<main className="w-3/12 flex flex-row">
				<SalaryCalculator />
			</main>
		</>
	);
};

export default HouseholdSalaryCalculator;
