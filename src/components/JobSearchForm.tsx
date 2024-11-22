import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { SubmitHandler } from "react-hook-form";
import { userAgent } from "next/server";

interface JobSearchFormProps {
	onSubmit: SubmitHandler<any>;
}

const JobSearchForm = ({ onSubmit }: JobSearchFormProps) => {
	interface FormValues {
		username: string;
		remote: boolean;
		generate_resume: boolean;
		experienceLevel: {
			internship: boolean;
			entry: boolean;
			associate: boolean;
			"mid-senior level": boolean;
			director: boolean;
			executive: boolean;
		};
		jobTypes: {
			"full-time": boolean;
			contract: boolean;
			"part-time": boolean;
			temporary: boolean;
			internship: boolean;
			other: boolean;
			volunteer: boolean;
		};
		date: string;
		positions: string;
		locations: string;
		apply_once_at_company: boolean;
		distance: number;
		company_blacklist: string;
		title_blacklist: string;
		location_blacklist: string;
		job_applicants_threshold: {
			min_applicants: number;
			max_applicants: number;
		};
		llm_model_type: string;
		llm_model: string;
	}

	const { control, handleSubmit, register } = useForm<FormValues>({
		defaultValues: {
			username: "jon_sundin",
			remote: true,
			generate_resume: false,
			experienceLevel: {
				internship: false,
				entry: true,
				associate: true,
				"mid-senior level": false,
				director: false,
				executive: false,
			},
			jobTypes: {
				"full-time": true,
				contract: true,
				"part-time": true,
				temporary: true,
				internship: false,
				other: false,
				volunteer: false,
			},
			date: "month",
			positions: `sales engineer\nsoftware engineer`,
			locations: `San Diego\nlos angeles`,
			apply_once_at_company: true,
			distance: 100,
			company_blacklist: "sony\napple",
			title_blacklist: `janitor\ncook\n`,
			location_blacklist: "venus\njupiter",
			job_applicants_threshold: {
				min_applicants: 0,
				max_applicants: 90,
			},
			llm_model_type: "openai",
			llm_model: "gpt-4o-mini",
		},
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 text-foreground"
		>
			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="username">
					Username
				</Label>
				<Input
					type="text"
					id="username"
					{...register("username")}
					className="bg-background text-foreground border-input"
					placeholder="Enter your username"
				/>
			</div>
			<div className="space-y-2">
				<Label className="text-foreground">Remote</Label>
				<Controller
					name="remote"
					control={control}
					defaultValue={true}
					render={({ field }) => (
						<Switch
							checked={field.value}
							onCheckedChange={field.onChange}
							className="bg-background"
						/>
					)}
				/>
			</div>
			<div className="space-y-2">
				<Label className="text-foreground">Generate Resume</Label>
				<Controller
					name="generate_resume"
					control={control}
					defaultValue={false}
					render={({ field }) => (
						<Switch
							checked={field.value}
							onCheckedChange={field.onChange}
							className="bg-background"
						/>
					)}
				/>
			</div>

			<div className="space-y-2">
				<Label className="text-foreground">Experience Level</Label>
				<div className="grid grid-cols-2 gap-2">
					{[
						"internship",
						"entry",
						"associate",
						"mid-senior level",
						"director",
						"executive",
					].map((level) => (
						<div
							key={level}
							className="flex items-center space-x-2"
						>
							<Checkbox
								id={`experienceLevel.${level}`}
								{...register(
									`experienceLevel.${level}` as `experienceLevel.${keyof FormValues["experienceLevel"]}`
								)}
								className="border-input bg-background"
							/>
							<Label
								className="text-foreground"
								htmlFor={`experienceLevel.${level}`}
							>
								{level}
							</Label>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<Label>Job Types</Label>
				<div className="grid grid-cols-2 gap-2">
					{[
						"full-time",
						"contract",
						"part-time",
						"temporary",
						"internship",
						"other",
						"volunteer",
					].map((type) => (
						<div key={type} className="flex items-center space-x-2">
							<Checkbox
								id={`jobTypes.${type}`}
								{...register(
									`jobTypes.${type}` as `jobTypes.${keyof FormValues["jobTypes"]}`
								)}
								className="border-input bg-background"
							/>
							<Label htmlFor={`jobTypes.${type}`}>{type}</Label>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<Label>Date Range</Label>
				<Controller
					name="date"
					control={control}
					defaultValue="month"
					render={({ field }) => (
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
						>
							{["all time", "month", "week", "24 hours"].map(
								(option) => (
									<div
										key={option}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={option}
											id={`date.${option}`}
											className="border-input bg-background"
										/>
										<Label htmlFor={`date.${option}`}>
											{option}
										</Label>
									</div>
								)
							)}
						</RadioGroup>
					)}
				/>
			</div>

			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="positions">
					Positions (one per line)
				</Label>
				<Textarea
					id="positions"
					{...register("positions")}
					defaultValue={`sales engineer
software engineer in testing
software developer in testing
quality assurance engineer
software tester
automation testing engineer
software engineer in automation testing`}
					className="h-32 bg-background text-foreground border-input"
				/>
			</div>

			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="locations">
					Locations (one per line)
				</Label>
				<Textarea
					id="locations"
					{...register("locations")}
					defaultValue={`San Diego
            California
            Orange County California
            Los Angeles
            San Jose California
            Austin
            Seattle
            Minneapolis
            Denver
            Portland
            Boston
            New York
            Florida
            Virginia
            San Francisco, CA
            Dallas, TX
            Atlanta, GA
            Washington, D.C.
            Chicago, IL
            Raleigh, NC
            Salt Lake City, UT`}
					className="h-48 bg-background text-foreground border-input"
				/>
			</div>

			<div className="space-y-2">
				<Label>Apply Once at Company</Label>
				<Controller
					name="apply_once_at_company"
					control={control}
					defaultValue={true}
					render={({ field }) => (
						<Switch
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>
			</div>

			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="distance">
					Distance (miles)
				</Label>
				<Input
					type="number"
					id="distance"
					{...register("distance")}
					defaultValue={100}
					className="bg-background text-foreground border-input"
				/>
			</div>

			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="company_blacklist">
					Company Blacklist (one per line)
				</Label>
				<Textarea
					id="company_blacklist"
					{...register("company_blacklist")}
					className="h-32 bg-background text-foreground border-input"
				/>
			</div>
			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="title_blacklist">
					Title Blacklist (one per line)
				</Label>
				<Textarea
					id="title_blacklist"
					{...register("title_blacklist")}
					className="h-32 bg-background text-foreground border-input"
				/>
			</div>

      <div className="space-y-2">
        <Label className="text-foreground" htmlFor="location_blacklist">
          Location Blacklist (one per line)
        </Label>
        <Textarea
          id="location_blacklist"
          {...register("location_blacklist")}
          className="h-32 bg-background text-foreground border-input"
        />
      </div>

			<div className="space-y-2">
				<Label className="text-foreground">
					Job Applicants Threshold
				</Label>
				<div className="flex space-x-4">
					<div>
						<Label
							className="text-foreground"
							htmlFor="min_applicants"
						>
							Min Applicants
						</Label>
						<Input
							type="number"
							id="min_applicants"
							{...register(
								"job_applicants_threshold.min_applicants"
							)}
							defaultValue={0}
							className="bg-background text-foreground border-input"
						/>
					</div>
					<div>
						<Label
							className="text-foreground"
							htmlFor="max_applicants"
						>
							Max Applicants
						</Label>
						<Input
							type="number"
							id="max_applicants"
							{...register(
								"job_applicants_threshold.max_applicants"
							)}
							defaultValue={90}
							className="bg-background text-foreground border-input"
						/>
					</div>
				</div>
			</div>
			<div className="space-y-2">
				<Label className="text-foreground">LLM Model Type</Label>
				<Controller
					name="llm_model_type"
					control={control}
					defaultValue="openai"
					render={({ field }) => (
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
						>
							{["openai", "other"].map((option) => (
								<div
									key={option}
									className="flex items-center space-x-2"
								>
									<RadioGroupItem
										value={option}
										id={`llm_model_type.${option}` as const}
										className="border-input bg-background"
									/>
									<Label
										className="text-foreground"
										htmlFor={`llm_model_type.${option}`}
									>
										{option}
									</Label>
								</div>
							))}
						</RadioGroup>
					)}
				/>
			</div>

			<div className="space-y-2">
				<Label className="text-foreground" htmlFor="llm_model">
					LLM Model
				</Label>
				<Input
					type="text"
					id="llm_model"
					{...register("llm_model")}
					defaultValue="gpt-4o-mini"
					className="bg-background text-foreground border-input"
				/>
			</div>

			<Button
				type="submit"
				className="bg-primary text-primary-foreground hover:bg-primary/90"
			>
				Submit
			</Button>
		</form>
	);
};

export default JobSearchForm;
