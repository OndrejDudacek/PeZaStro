<template>
	<div v-if="isBlankLayout" class="blank-layout">
		<Suspense><RouterView /></Suspense>
	</div>

	<div v-else class="app-layout">
		<header>
			<h1>PEZASTRO</h1>
			<section>
				<p>vydáváš se za: {{ userStore.username }}</p>
				<Button icon="logout" @click="logout" />
			</section>
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
							<RouterLink id="linkLocation" to="/location">Lokace</RouterLink>
						</li>
						<li>
							<RouterLink id="linkContract" to="/contract">Zakázky</RouterLink>
						</li>
						<li>
							<RouterLink id="jobContract" to="/job">Práce</RouterLink>
						</li>
					</ul>
				</nav>
			</aside>
			<main>
				<Suspense><RouterView /></Suspense>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import { userService } from "./services/userService";
import Button from "./components/Button.vue";

const route = useRoute();
const isBlankLayout = computed(() => route.meta.layout === "blank");

const router = useRouter();

const userStore = useUserStore();

const logout = () => {
	const succes = userService.logout();
	if (!succes) {
		console.error("Error with loging out");
		return;
	}

	router.push({ name: "login" });
};
</script>

<style scoped lang="scss">
.app-layout {
	header {
		padding: var(--spacing-m);
		background-color: var(--color-background);
		display: flex;
		justify-content: space-between;
		align-items: center;

		section {
			display: flex;
			gap: var(--spacing-m);
			align-items: center;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		height: calc(100vh - calc(calc(2 * var(--spacing-m)) + 2rem));
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
			width: 100%;
			max-width: 100%;
			overflow-y: auto;
		}
	}
}
</style>
