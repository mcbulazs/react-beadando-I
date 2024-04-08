import BasicInput from "./components/BasicInput";
import BasicButton from "./components/BasicButton";
import InlineButton from "./components/InlineButton";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState, useEffect } from "react";
import PopupDialog from "./components/PopupDialog";

const SalaryCalculator = ({ index, usersData, setUsersData, removeFunc }) => {
	const [sliderState, setSliderState] = useState(100);
	const [popupOpen, setPopupOpen] = useState(false);
	const [data, setData] = useState(() => {
		if (usersData[index]) {
			return usersData[index];
		} else {
			return {
				name: "",
				brutto: 0,
				netto: 0,
				sliderValue: 0,
				checkBoxes: {
					under25: false,
					freshMarried: false,
					taxRelief: false,
					familyRelief: false,
				},
				marriageDate: "",
				eltartott: 0,
				kedvezmenyezett: 0,
			};
		}
	});
	useEffect(() => {
		setUsersData({ ...usersData, [index]: data });
	}, [data]);
	useEffect(() => {
		if (usersData[index]) {
			setData(usersData[index]);
		} else {
			setData({
				name: "",
				brutto: 0,
				netto: 0,
				sliderValue: 0,
				checkBoxes: {
					under25: false,
					freshMarried: false,
					taxRelief: false,
					familyRelief: false,
				},
				marriageDate: "",
				eltartott: 0,
				kedvezmenyezett: 0,
			});
		}
	}, [index]);
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
		let value = parseInt(e.target.value);
		resetSlider();
		setData({ ...data, brutto: value, sliderValue: value });
	}
	function sliderChange(e, value) {
		setSliderState(value);
		const newValue = Math.round((data.sliderValue * value) / 100);
		setData({ ...data, brutto: newValue });
		//cant change data, bcs it will be overwritten by the next state
	}
	useEffect(() => {
		function calcNetto() {
			let brutto = data.brutto;
			let tax = 0;
			tax += Math.round(brutto * 0.185); // TB
			if (data.checkBoxes.under25) {
				let temp = brutto - 499952;
				if (temp > 0) {
					tax += Math.round(temp * 0.15);
				}
			} else {
				tax += Math.round(brutto * 0.15);
			}
			if (data.checkBoxes.taxRelief) {
				tax -= 77300;
			}
			if (data.checkBoxes.familyRelief) {
				if (data.kedvezmenyezett == 1) {
					tax -= 10000 * data.eltartott;
				} else if (data.kedvezmenyezett == 2) {
					tax -= 20000 * data.eltartott;
				} else if (data.kedvezmenyezett >= 3) {
					tax -= 33000 * data.eltartott;
				}
			}
			if (tax < 0) {
				tax = 0;
			}
			let netto = brutto - tax;
			if (data.checkBoxes.freshMarried && calcMarriageDiscount()) {
				netto += 5000;
			}
			return netto;
		}
		setData({ ...data, netto: calcNetto() });
	}, [
		data.brutto,
		data.checkBoxes.under25,
		data.checkBoxes.taxRelief,
		data.checkBoxes.familyRelief,
		data.checkBoxes.freshMarried,
		data.marriageDate,
		data.eltartott,
		data.kedvezmenyezett,
	]);
	function calcMarriageDiscount() {
		let date = new Date(data.marriageDate);
		date.setFullYear(date.getFullYear() + 2);
		let now = new Date();
		if (date > now) {
			return true;
		}
		return false;
	}
	return (
		<div className="bg-gray-300  min-w-64 p-8 rounded-lg">
			<div className="mb-5 flex flex-row justify-between">
				<h1 className="uppercase font-bold">
					{" "}
					{data.name} bérének kiszámítása
				</h1>
				<button className="bg-white rounded-md p-1" onClick={removeFunc}>
					🗑
				</button>
			</div>
			<BasicInput
				name="Családtag neve"
				value={data.name}
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
						setData({
							...data,
							checkBoxes: { ...data.checkBoxes, under25: e.target.checked },
						})
					}
					checked={data.checkBoxes.under25}
					control={<Switch />}
					label="25 éven alattiak SZJA mentesssége"
				/>
				<span>
					<FormControlLabel
						onChange={(e) => {
							setData({
								...data,
								checkBoxes: {
									...data.checkBoxes,
									freshMarried: e.target.checked,
								},
							});
							if (e.target.checked) {
								setPopupOpen(true);
							}
						}}
						control={<Switch />}
						checked={data.checkBoxes.freshMarried}
						label="Friss házasok kedvezménye"
					/>
					{data.checkBoxes.freshMarried && (
						<button
							onClick={() => setPopupOpen(true)}
							className="text-xs bg-blue-600 text-white rounded-lg p-1 mt-2"
						>
							Dátum módosítása
						</button>
					)}
					{data.checkBoxes.freshMarried && data.marriageDate && (
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
						setData({
							...data,
							checkBoxes: { ...data.checkBoxes, taxRelief: e.target.checked },
						})
					}
					checked={data.checkBoxes.taxRelief}
					control={<Switch />}
					label="Személyi adókedvezmény"
				/>
				<FormControlLabel
					onChange={(e) =>
						setData({
							...data,
							checkBoxes: {
								...data.checkBoxes,
								familyRelief: e.target.checked,
							},
						})
					}
					checked={data.checkBoxes.familyRelief}
					control={<Switch />}
					label="Családi kedvezmény"
				/>
				{data.checkBoxes.familyRelief && (
					<div className="flex align-center flex-row text-xs">
						<InlineButton
							content="-"
							onClick={() => {
								if (data.eltartott > 0)
									setData({ ...data, eltartott: data.eltartott - 1 });
							}}
						/>
						<span> {data.eltartott} </span>
						<InlineButton
							content="+"
							onClick={() => {
								setData({ ...data, eltartott: data.eltartott + 1 });
							}}
						/>
						Eltarott, ebből kedvezményezett:
						<InlineButton
							content="-"
							onClick={() => {
								if (data.kedvezmenyezett > 0)
									setData({
										...data,
										kedvezmenyezett: data.kedvezmenyezett - 1,
									});
							}}
						/>
						<span>{data.kedvezmenyezett}</span>
						<InlineButton
							content="+"
							onClick={() => {
								if (data.kedvezmenyezett < Math.min(data.eltartott, 3))
									setData({
										...data,
										kedvezmenyezett: data.kedvezmenyezett + 1,
									});
							}}
						/>
					</div>
				)}
			</FormGroup>
			<PopupDialog
				value={data.marriageDate}
				valueFunc={(date) => {
					setData({ ...data, marriageDate: date });
				}}
				state={popupOpen}
				handleClose={(saved) => {
					setPopupOpen(false);
					if (saved !== true) {
						setData({
							...data,
							checBoxes: { ...data.checkBoxes, freshMarried: false },
						});
					}
				}}
			/>
			<div className="mx-auto w-24 font-bold text-center bg-cyan-400 rounded-md mt-10">
				{data.netto} Ft
			</div>
		</div>
	);
};

export default SalaryCalculator;
