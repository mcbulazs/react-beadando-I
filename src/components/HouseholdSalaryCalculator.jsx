import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
	return (
		<>
			<header>
				<FamilyMemberTabs />
			</header>
			<main>
				<SalaryCalculator name="Kis Imre" />

				<HouseholdSummary />
			</main>
		</>
	);
};

export default HouseholdSalaryCalculator;
