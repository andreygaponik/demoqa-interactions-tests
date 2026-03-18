import { type Page, type Locator } from '@playwright/test';

export class DroppablePage {
	readonly page: Page;
	readonly mainHeader: Locator;
	readonly droppable: Locator;
	readonly draggable: Locator;

	constructor(page: Page) {
		this.page = page;

		const simpleTabPanel = page.getByRole('tabpanel', { name: 'Simple' });

		this.mainHeader = page.getByRole('heading', { name: 'Droppable' });
		this.droppable = simpleTabPanel.locator('#droppable');
		this.draggable = simpleTabPanel.locator('#draggable');
	}

	async goTo() {
		await this.page.goto('/droppable');
	}

	async getDroppableBoundingBox() {
		return await this.droppable.boundingBox();
	}

	async dragAndDrop(options?: {
		targetPosition?: { x: number; y: number };
		force?: boolean;
	}) {
		await this.draggable.dragTo(this.droppable, options);
	}
}
