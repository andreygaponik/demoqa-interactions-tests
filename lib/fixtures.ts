import { test as base } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';
import { DragabblePage } from '../pages/DragabblePage';

export type AppFixtures = {
	blockAds: void;
	droppablePage: DroppablePage;
	dragabblePage: DragabblePage;
};

export const test = base.extend<AppFixtures>({
	blockAds: [
		async ({ page }, use) => {
			await page.route('**/*', route => {
				const url = new URL(route.request().url());

				const adHosts = [
					'googleads.g.doubleclick.net',
					'securepubads.g.doubleclick.net',
					'googletagservices.com',
					'pagead2.googlesyndication.com',
					'ad.plus',
					'analytics.google.com',
				];

				if (adHosts.some(host => url.hostname.includes(host))) {
					route.abort();
				} else {
					route.continue();
				}
			});

			await use();
		},
		{ auto: true },
	],
	droppablePage: async ({ page }, use) => {
		const droppablePage = new DroppablePage(page);
		await droppablePage.goTo();

		await use(droppablePage);
	},
	dragabblePage: async ({ page }, use) => {
		const dragabblePage = new DragabblePage(page);
		await dragabblePage.goTo();

		await use(dragabblePage);
	},
});

export { expect } from '@playwright/test';
