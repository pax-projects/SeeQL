import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Settings = () => {
	const settingsTabType = Object.freeze({
		DB: Symbol("database"),
		NODES_AND_LOGIC: Symbol("nodes&logic"),
		APPEARANCE: Symbol("appearance"),
	});

	const [tab, setTab] = useState(settingsTabType.DB);

	const { register, handleSubmit, reset, formState, getValues, watch } = useForm({
		defaultValues: {
			database: "",
			host: "",
			port: "",
			name: "",
			username: "",
			password: "",
			ssl_tls: "",
			auth_method: ""
		}
	});

	const { dirtyFields, isDirty } = formState;
	const values = watch();

	useEffect(() => {
		(async () => {
			const result = await window.electronAPI.loadJson({
				project_name: "project_name",
				type: "settings"
			});

			if (result.success && result.data) {
				console.log(result.data)
				reset(result.data);
			}
		})();
	}, []);

	// WARNING: Has to be after the load data useEffect
	useEffect(() => {
		(async () => {
			await window.electronAPI.saveJson({
				project_name: "project_name",
				type: "settings",
				data: getValues()
			});
		})();
	}, [isDirty, values, dirtyFields]);

	return (
		<div id="settings">
			<nav className="flex-row-around">
				<p
					className={tab.description === settingsTabType.DB.description ? "selected" : ""}
					onClick={() => setTab(settingsTabType.DB)}
				>Database connection</p>
				<p
					className={tab.description === settingsTabType.NODES_AND_LOGIC.description ? "selected" : ""}
					onClick={() => setTab(settingsTabType.NODES_AND_LOGIC)}
				>Nodes & Logic</p>
				<p
					className={tab.description === settingsTabType.APPEARANCE.description ? "selected" : ""}
					onClick={() => setTab(settingsTabType.APPEARANCE)}
				>Appearance</p>
			</nav>

			<div className="content">
				{tab.description === settingsTabType.DB.description && (
					<form onSubmit={(e) => (e.preventDefault())}>
						<section className="flex-row">
							<div>
								<h3>Database type</h3>
								<dl>
									<dt>Specify which database engine you're using.</dt>
								</dl>
							</div>
							<select {...register("database")}>
								<option value="postgre_sql">PostgreSQL</option>
								<option value="my_sql">MySQL</option>
								<option value="maria_db">MariaDB</option>
								<option value="sql_ite">SQLite</option>
								<option value="microsoft_sql_server">Microsoft SQL Server (T-SQL)</option>
								<option value="oracle">Oracle (PL/SQL)</option>
							</select>
						</section>

						<section className="flex-row">
							<div>
								<h3>HOST</h3>
								<dl>
									<dt>The address where the database server is hosted.</dt>
								</dl>
							</div>
							<input type="text" placeholder="e.g. 127.0.0.1 | localhost" {...register("host")} />
						</section>

						<section className="flex-row">
							<div>
								<h3>Port</h3>
								<dl>
									<dt>The network port through which the database server accepts connections.</dt>
								</dl>
							</div>
							<input
								type="number"
								placeholder="e.g. 1234"
								{...register("port")}
								onKeyDown={(e) => {
									if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
										e.preventDefault();
									}
								}}
							/>
						</section>

						<section className="flex-row">
							<div>
								<h3>Database name</h3>
								<dl>
									<dt>The specific database schema you want to connect to on the server.</dt>
								</dl>
							</div>
							<input type="text" placeholder="e.g. my_database" {...register("name")} />
						</section>

						<section className="flex-row">
							<div>
								<h3>Username</h3>
								<dl>
									<dt>The username with permission to access the database.</dt>
								</dl>
							</div>
							<input type="text" placeholder="e.g. admin" {...register("username")} />
						</section>

						<section className="flex-row">
							<div>
								<h3>Password</h3>
								<dl>
									<dt>The password associated with the username.</dt>
								</dl>
							</div>
							<input type="password" placeholder="e.g. root" {...register("password")} />
						</section>

						<section className="flex-row">
							<div>
								<h3>SSL/TLS (Optional)</h3>
								<dl>
									<dt>Specifies if the connection should be encrypted.</dt>
								</dl>
							</div>
							<input type="text" placeholder="e.g. Enabled/Disabled" {...register("ssl_tls")} />
						</section>

						<section className="flex-row">
							<div>
								<h3>Authentication Method (Optional)</h3>
								<dl>
									<dt>Defines the authentication mechanism if it differs from standard username/password.</dt>
								</dl>
							</div>
							<input type="text" placeholder="e.g. Password, Key File, OAuth" {...register("auth_method")} />
						</section>
					</form>
				)}
			</div>
		</div>
	);
};

export default Settings;
