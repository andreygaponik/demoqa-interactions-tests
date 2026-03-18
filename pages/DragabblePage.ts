import { type Page, type Locator } from '@playwright/test';

export class DragabblePage {
	readonly page: Page;
	readonly mainHeader: Locator;
	readonly containerRestrictedTab: Locator;
	readonly containerRestrictedTabPanel: Locator;
	readonly containmentWrapper: Locator;
	readonly dragabble: Locator;

	constructor(page: Page) {
		this.page = page;

		this.containerRestrictedTab = page.getByRole('tab', {
			name: 'Container Restricted',
		});
		this.containerRestrictedTabPanel = page.getByRole('tabpanel', {
			name: 'Container Restricted',
		});
		this.mainHeader = page.getByRole('heading', { name: 'Dragabble' });
		this.containmentWrapper = this.containerRestrictedTabPanel.locator(
			'#containmentWrapper',
		);
		this.dragabble = this.containmentWrapper.locator('.draggable');
	}

	async goTo() {
		await this.page.goto('/dragabble');
		await this.containerRestrictedTab.click();
	}

	async getDragabbleBoundingBox() {
		return await this.dragabble.boundingBox();
	}

	async getContainmentWrapperBoundingBox() {
		return await this.containmentWrapper.boundingBox();
	}

	async dragAndDrop(options?: {
		targetPosition?: { x: number; y: number };
		force?: boolean;
	}) {
		await this.dragabble.dragTo(this.containmentWrapper, options);
	}
}
