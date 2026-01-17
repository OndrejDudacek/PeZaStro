<template>
	<header>
		<h1>PEZASTRO</h1>
		<p>vydáváš se za: {{ logedInAs }}</p>
	</header>
	<div class="wrapper">
		<aside>
			<nav>
				<ul>
					<li>
						<RouterLink id="linkDashboard" to="/">Dashboard</RouterLink>
					</li>
					<li>
						<RouterLink id="linkCustomer" to="/customer">Zákazníci</RouterLink>
					</li>
					<li>
						<RouterLink id="linkContract" to="/contract">Zakázky</RouterLink>
					</li>
					<li>
						<RouterLink id="linkLocation" to="/location">Lokace</RouterLink>
					</li>
				</ul>
			</nav>
		</aside>
		<main>
			<RouterView />
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const logedInAs = ref("unknown");
</script>

<style scoped lang="scss">
header {
	padding: var(--spacing-m);
	background-color: var(--color-background);
	display: flex;
	justify-content: space-between;
}

.wrapper {
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;

	aside {
		height: 100%;
		padding: var(--spacing-m) 0;
		background-color: var(--color-background);
		nav > ul {
			display: flex;
			flex-direction: column;
			list-style: none;

			li {
				a {
					display: flex;
					width: 100%;
					min-width: 8rem;
					padding: var(--spacing-m);
					border-left: 0.3rem var(--color-border) solid;
					background-image: linear-gradient(
						to right,
						var(--color-container),
						var(--color-background)
					);
				}

				a:hover {
					text-shadow: 0 0 20px white;
					background-image: linear-gradient(
						to right,
						var(--color-border),
						var(--color-background)
					);
				}

				a.router-link-active {
					border-left: 0.5rem var(--color-border) solid;
				}
			}
		}
	}

	main {
		padding: var(--spacing-xl);
	}
}
</style>
