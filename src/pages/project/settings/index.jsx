import { useState } from "react";

const Settings = () => {
	const settingsTabType = Object.freeze({
		DB: Symbol("database"),
		NODES_AND_LOGIC: Symbol("nodes&logic"),
		APPEARANCE: Symbol("appearance"),
	});

	const [tab, setTab] = useState(settingsTabType.DB);


	return (<div id="settings">
		<nav className="flex-row-around">
			<p
				className={(tab.description == settingsTabType.DB.description) ? "selected": ""}
				onClick={() => setTab(settingsTabType.DB)}
			>Database connection</p>
			<p
				className={(tab.description == settingsTabType.NODES_AND_LOGIC.description) ? "selected": ""}
				onClick={() => setTab(settingsTabType.NODES_AND_LOGIC)}
			>Nodes & Logic</p>
			<p
				className={(tab.description == settingsTabType.APPEARANCE.description) ? "selected": ""}
				onClick={() => setTab(settingsTabType.APPEARANCE)}
			>Appearance</p>
		</nav>

		<div className="content">
			{
				(tab.description == settingsTabType.DB.description)
				&& <div>
					<section className="flex-row">
						<div>
							<h3>Database type</h3>
							<dl>
								<dt>Specify which database engine you're using.</dt>
							</dl>
						</div>

						<select name="" id="">
							<option value="postgre_sql">PostgreSQL</option>
						</select>

					</section>
					<section className="flex-row">
						<div>
							<h3>HOST</h3>
							<dl>
								<dt>The address where the database server is hosted.</dt>
							</dl>
						</div>

						<input type="text" placeholder="e.g. 127.0.0.1"/>

					</section>
					<section className="flex-row">
						<div>
							<h3>Port</h3>
							<dl>
								<dt>The network port through which the database<br/>server accepts connections.</dt>
							</dl>
						</div>

						<input type="number" placeholder="e.g. 1234"/>

					</section>
					<section className="flex-row">
						<div>
							<h3>Database name</h3>
							<dl>
								<dt>The specific database schema you want to<br/>connect to on the server.</dt>
							</dl>
						</div>

						<input type="text" placeholder="e.g. my_database"/>

					</section>
					{/**/}
					<section className="flex-row">
						<div>
							<h3>Username</h3>
							<dl>
								<dt>The username with permission to access the database.</dt>
							</dl>
						</div>

						<input type="text" placeholder="e.g. admin"/>

					</section>
					<section className="flex-row">
						<div>
							<h3>Password</h3>
							<dl>
								<dt>The password associated with the username.</dt>
							</dl>
						</div>

						<input type="text" placeholder="e.g. root"/>

					</section>
					<section className="flex-row">
						<div>
							<h3>SSL/TLS (Optional)</h3>
							<dl>
								<dt>Specifies if the connection should be encrypted<br/>(required by some remote databases).</dt>
							</dl>
						</div>

						<input type="text" placeholder="e.g. Enabled/Disabled"/>

					</section>
					<section className="flex-row">
						<div>
							<h3>Authentication Method (Optional)</h3>
							<dl>
								<dt>Defines the authentication mechanism if it<br/>differs from standard username/password.</dt>
							</dl>
						</div>

						<input type="text" placeholder="e.g. Password, Key File, OAuth"/>

					</section>
				</div>
			}
			{
				(tab.description == settingsTabType.NODES_AND_LOGIC.description)
				&& <section className="flex-row">
					<div>
						<h3>Editor Nodes & Logic</h3>
						<dl>
							<dt>Define how your editor works under the hood.</dt>
						</dl>
					</div>

				</section>
			}
			{
				(tab.description == settingsTabType.APPEARANCE.description)
				&& <section className="flex-row">
					<div>
						<h3>Editor appearance</h3>
						<dl>
							<dt>Customize how your editor looks and feels.</dt>
						</dl>
					</div>

				</section>
			}
		</div>
	</div>)
}

export default Settings;