import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function PopupDialog({ value, valueFunc, state, handleClose }) {
	const [marriageDate, setMarriageDate] = React.useState(value);
	function onDateChange(e) {
		setMarriageDate(e.target.value);
	}
	return (
		<Dialog
			open={state}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				onSubmit: (event) => {
					event.preventDefault();
					const formData = new FormData(event.currentTarget);
					const formJson = Object.fromEntries(formData.entries());
					const date = formJson.marrigeDate;
					console.log(date);
					valueFunc(date);
					handleClose(true);
				},
			}}
		>
			<DialogContent>
				<DialogContentText>
					A kedvezmény először a házasságkötést követő hónapra vehető igénybe és
					a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
				</DialogContentText>

				<p className="mt-4">Add meg a házasságkötés dátumát</p>
				<TextField
					autoFocus
					required
					name="marrigeDate"
					margin="dense"
					type="date"
					variant="standard"
					onChange={onDateChange}
					value={marriageDate}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit">Mentés</Button>
			</DialogActions>
		</Dialog>
	);
}
