import BasicInput from "./components/BasicInput";
import BasicButton from "./components/BasicButton";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState } from "react";

const SalaryCalculator = ({ name }) => {
	const [checkBoxes, setCheckBoxes] = useState({
		under25: false,
		freshMarried: false,
		taxRelief: false,
		familyRelief: false,
	});

	const [bruttoValue, setBruttoValue] = useState(0);
	const [data, setData] = useState({
		name: name,
		brutto: 0,
		sliderValue: 0,
	});
	function recalcBrutto(e) {
		const newValue = Math.round(data.brutto * e.target.value);
		setData({ ...data, brutto: newValue, sliderValue: newValue });
		setBruttoValue(newValue);
	}
	function changeName(e) {
		setData({ ...data, name: e.target.value });
	}
	function changeBrutto(e) {
		setData({ ...data, brutto: e.target.value, sliderValue: e.target.value });
		setBruttoValue(e.target.value);
	}
	function sliderChange(e, value) {
		const newValue = Math.round((data.brutto * value) / 100);
		setBruttoValue(newValue);
		//cant change data, bcs it will be overwritten by the next state
	}
	function calcNetto() {
		if (data.brutto != data.sliderValue) {
			setData({ ...data, brutto: data.sliderValue });
		}
		let brutto = data.brutto;
		let tax = 0;
		tax += Math.round(brutto * 0.185); //TB
		if (checkBoxes.under25) {
			let temp = brutto - 499952;
			if (temp > 0) {
				tax += Math.round(temp * 0.15);
			}
		} else {
			tax += Math.round(brutto * 0.15);
		}
		if (checkBoxes.taxRelief) {
			tax -= 77300;
			if (tax < 0) {
				tax = 0;
			}
		}
		let netto = brutto - tax;
	}
	return (
		<div className="bg-gray-300 w-3/12 min-w-64 p-8 rounded-lg">
			<h1 className="uppercase font-bold mb-5"> {name} bérének kiszámítása</h1>
			<BasicInput
				name="Családtag neve"
				placeholder={name}
				desc="Add meg a családtag nevét!"
				type="text"
				changeFunc={changeName}
			/>
			<BasicInput
				name="Bruttó bér (Ft)"
				placeholder="250000"
				desc="Add meg a bruttó béredet forintban!"
				type="number"
				value={bruttoValue}
				changeFunc={changeBrutto}
			/>
			<div className="px-5">
				<Slider
					className="px-5"
					onChange={sliderChange}
					min={50}
					max={150}
					step={5}
					defaultValue={100}
					getAriaValueText={(value) => `${value}%`}
					marks={[
						{ value: 50, label: "50%" },
						{ value: 100, label: "100%" },
						{ value: 150, label: "150%" },
					]}
					valueLabelDisplay="auto"
				/>
			</div>
			<div className="flex justify-evenly">
				<BasicButton text="-5%" actionListener={recalcBrutto} value={0.95} />
				<BasicButton text="-1%" actionListener={recalcBrutto} value={0.99} />
				<BasicButton text="+1%" actionListener={recalcBrutto} value={1.01} />
				<BasicButton text="+5%" actionListener={recalcBrutto} value={1.05} />
			</div>
			<FormGroup className="mt-10 flex flex-col">
				<FormControlLabel
					onChange={(e) =>
						setCheckBoxes({ ...checkBoxes, under25: e.target.checked })
					}
					control={<Switch />}
					label="25 éven alattiak SZJA mentesssége"
				/>
				<FormControlLabel
					onChange={(e) =>
						setCheckBoxes({ ...checkBoxes, freshMarried: e.target.checked })
					}
					control={<Switch />}
					label="Friss házasok kedvezménye"
				/>
				<FormControlLabel
					onChange={(e) =>
						setCheckBoxes({ ...checkBoxes, taxRelief: e.target.checked })
					}
					control={<Switch />}
					label="Személyi adókedvezmény"
				/>
				<FormControlLabel
					onChange={(e) =>
						setCheckBoxes({ ...checkBoxes, familyRelief: e.target.checked })
					}
					control={<Switch />}
					label="Családi kedvezmény"
				/>
			</FormGroup>
		</div>
	);
};

export default SalaryCalculator;
