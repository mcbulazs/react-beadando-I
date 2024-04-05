import BasicInput from "./components/BasicInput";
import BasicButton from "./components/BasicButton";
import InlineButton from "./components/InlineButton";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState } from "react";
import PopupDialog from "./components/PopupDialog";

const SalaryCalculator = ({ name }) => {
	const [sliderState, setSliderState] = useState(100);
	const [checkBoxes, setCheckBoxes] = useState({
		under25: false,
		freshMarried: false,
		taxRelief: false,
		familyRelief: false,
	});
	const [popupOpen, setPopupOpen] = useState(false);
	//const [bruttoValue, setBruttoValue] = useState(0);
	const [marriageDate, setMarriageDate] = useState("");
	const [data, setData] = useState({
		name: name,
		brutto: 0,
		sliderValue: 0,
	});
	const [eltartott, setEltartott] = useState(0); // nem tudom hogy van angolul
	const [kedvezmenyezett, setKedvezmenyezett] = useState(0);
	function resetSlider() {
		setSliderState(100);
	}
	function recalcBrutto(e) {
		const newValue = Math.round(data.brutto * e.target.value);
		setData({ ...data, brutto: newValue, sliderValue: newValue });
		resetSlider();
	}
	function changeName(e) {
		setData({ ...data, name: e.target.value });
	}
	function changeBrutto(e) {
		resetSlider();
		setData({ ...data, brutto: e.target.value, sliderValue: e.target.value });
	}
	function sliderChange(e, value) {
		setSliderState(value);
		const newValue = Math.round((data.sliderValue * value) / 100);
		//setBruttoValue(newValue);
		setData({ ...data, brutto: newValue });
		//cant change data, bcs it will be overwritten by the next state
	}
	function calcNetto() {
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
		}
		if (checkBoxes.familyRelief) {
			if (kedvezmenyezett == 1) {
				tax -= 10000 * eltartott;
			} else if (kedvezmenyezett == 2) {
				tax -= 20000 * eltartott;
			} else if (kedvezmenyezett >= 3) {
				tax -= 33000 * eltartott;
			}
		}
		if (tax < 0) {
			tax = 0;
		}
		let netto = brutto - tax;
		if (checkBoxes.freshMarried && calcMarriageDiscount()) {
			netto += 5000;
		}
		return netto;
	}
	function changeMarrigeDate(date) {
		setMarriageDate(date);
	}
	function calcMarriageDiscount() {
		let date = new Date(marriageDate);
		date.setFullYear(date.getFullYear() + 2);
		let now = new Date();
		if (date > now) {
			return true;
		}
		return false;
	}
	return (
		<div className="bg-gray-300 w-full min-w-64 p-8 rounded-lg">
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
				value={data.brutto}
				changeFunc={changeBrutto}
			/>
			<div className="px-5">
				<Slider
					className="px-5"
					onChange={sliderChange}
					min={50}
					defaultValue={100}
					value={sliderState}
					max={150}
					step={5}
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
				<span>
					<FormControlLabel
						onChange={(e) => {
							setCheckBoxes({ ...checkBoxes, freshMarried: e.target.checked });
							if (e.target.checked) {
								setPopupOpen(true);
							}
						}}
						control={<Switch />}
						checked={checkBoxes.freshMarried}
						label="Friss házasok kedvezménye"
					/>
					{checkBoxes.freshMarried && (
						<button
							onClick={() => setPopupOpen(true)}
							className="text-xs bg-blue-600 text-white rounded-lg p-1 mt-2"
						>
							Dátum módosítása
						</button>
					)}
					{checkBoxes.freshMarried && marriageDate && (
						<p
							className={`inline-block  text-xs text-white rounded-lg p-1 mt-2  ${
								calcMarriageDiscount() ? "bg-green-400" : "bg-red-400"
							}`}
						>
							{calcMarriageDiscount() ? "Jogosult" : "Nem jogosult"}
						</p>
					)}
				</span>
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
				{checkBoxes.familyRelief && (
					<div className="flex align-center flex-row text-xs">
						<InlineButton
							content="-"
							onClick={() => {
								if (eltartott > 0) setEltartott(eltartott - 1);
							}}
						/>
						<span> {eltartott} </span>
						<InlineButton
							content="+"
							onClick={() => {
								setEltartott(eltartott + 1);
							}}
						/>
						Eltarott, ebből kedvezményezett:
						<InlineButton
							content="-"
							onClick={() => {
								if (kedvezmenyezett > 0)
									setKedvezmenyezett(kedvezmenyezett - 1);
							}}
						/>
						<span>{kedvezmenyezett}</span>
						<InlineButton
							content="+"
							onClick={() => {
								if (kedvezmenyezett < eltartott)
									setKedvezmenyezett(kedvezmenyezett + 1);
							}}
						/>
					</div>
				)}
			</FormGroup>
			<PopupDialog
				value={marriageDate}
				valueFunc={(date) => {
					setMarriageDate(date);
				}}
				state={popupOpen}
				handleClose={(saved) => {
					setPopupOpen(false);
					if (saved !== true) {
						setCheckBoxes({ ...checkBoxes, freshMarried: false });
					}
				}}
			/>
			<div className="mx-auto w-24 font-bold text-center bg-cyan-400 rounded-md mt-10">
				{calcNetto()} Ft
			</div>
		</div>
	);
};

export default SalaryCalculator;
