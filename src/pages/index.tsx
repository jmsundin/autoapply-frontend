import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import JobSearchForm from "@/components/JobSearchForm";
import axios from "axios";

export default function Home() {
	const [formData, setFormData] = useState(null);

	const convertDateRangeToObject = (dateRange: string) => {
		return {
			"all time": dateRange === "all time",
			month: dateRange === "month",
			week: dateRange === "week",
			"24 hours": dateRange === "24 hours",
		};
	};

	const onSubmit = async (data) => {
		const url = `https://sharing-jackal-stunning.ngrok-free.app/api/config?username=${data.username}`;
		const dateRangeObject = convertDateRangeToObject(data.date);
		const updatedData = {
			...data,
			date: dateRangeObject,
			positions: data.positions
				.split("\n")
				.map((pos) => pos.trim())
				.filter(Boolean),
			locations: data.locations
				.split("\n")
				.map((loc) => loc.trim())
				.filter(Boolean),
			company_blacklist: data.company_blacklist
				.split("\n")
				.map((company) => company.trim())
				.filter(Boolean),
			title_blacklist: data.title_blacklist
				.split("\n")
				.map((title) => title.trim())
				.filter(Boolean),
			location_blacklist: data.location_blacklist
				.split("\n")
				.map((loc) => loc.trim())
				.filter(Boolean),
		};

		setFormData(updatedData);
		try {
			const response = await axios.post(url, {
				...updatedData,
			});
			console.log("Response:", response.data);
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Autoapply Form</h1>
			<JobSearchForm onSubmit={onSubmit} />
			{formData && (
				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-2">Form Data:</h2>
					<pre className="bg-black-100 p-4 rounded-lg overflow-auto">
						{JSON.stringify(formData, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
