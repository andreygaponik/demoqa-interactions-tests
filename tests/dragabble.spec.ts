import { test, expect } from '../lib/fixtures';

test.describe('Draggable Page: Container Restricted', () => {
	test('Initial State: should display all required elements correctly', async ({
		dragabblePage,
	}) => {
		await expect(dragabblePage.mainHeader).toBeVisible();
		await expect(dragabblePage.containmentWrapper).toBeVisible();
		await expect(dragabblePage.dragabble).toBeVisible();
	});

	test('Boundary LEFT: should rest against the left edge and not go beyond it', async ({
		dragabblePage,
	}) => {
		const сontainmentWrapperBox =
			await dragabblePage.getContainmentWrapperBoundingBox();

		await expect(dragabblePage.dragabble).toHaveClass(/ui-draggable-handle/);

		await dragabblePage.dragAndDrop({
			targetPosition: { x: -50, y: 0 },
			force: true,
		});

		const dragabbleBox = await dragabblePage.getDragabbleBoundingBox();

		console.log(dragabbleBox);

		expect(dragabbleBox!.x).toBeGreaterThanOrEqual(сontainmentWrapperBox!.x);
	});

	test('Boundary TOP: should rest against the top edge and not extend beyond it', async ({
		dragabblePage,
	}) => {
		const сontainmentWrapperBox =
			await dragabblePage.getContainmentWrapperBoundingBox();

		await expect(dragabblePage.dragabble).toHaveClass(/ui-draggable-handle/);

		await dragabblePage.dragAndDrop({
			targetPosition: { x: 0, y: -50 },
			force: true,
		});

		const dragabbleBox = await dragabblePage.getDragabbleBoundingBox();

		expect(dragabbleBox!.y).toBeGreaterThanOrEqual(сontainmentWrapperBox!.y);
	});

	test('Boundary RIGHT: should rest against the right edge', async ({
		dragabblePage,
	}) => {
		const сontainmentWrapperBox =
			await dragabblePage.getContainmentWrapperBoundingBox();

		await expect(dragabblePage.dragabble).toHaveClass(/ui-draggable-handle/);

		await dragabblePage.dragAndDrop({
			targetPosition: { x: 1500, y: 0 },
			force: true,
		});

		const dragabbleBox = await dragabblePage.getDragabbleBoundingBox();
		const boxRightEdge = dragabbleBox!.x + dragabbleBox!.width;
		const containerRightEdge = сontainmentWrapperBox!.x + сontainmentWrapperBox!.width;

		expect(boxRightEdge).toBeLessThanOrEqual(containerRightEdge);
	});

	test('Boundary BOTTOM: should rest against the bottom edge', async ({
		dragabblePage,
	}) => {
		const сontainmentWrapperBox = await dragabblePage.getContainmentWrapperBoundingBox();

		await expect(dragabblePage.dragabble).toHaveClass(/ui-draggable-handle/);

		await dragabblePage.dragAndDrop({
			targetPosition: { x: 0, y: 1000 },
			force: true,
		});

		const dragabbleBox = await dragabblePage.getDragabbleBoundingBox();
		const boxBottomEdge = dragabbleBox!.y + dragabbleBox!.height;
		const containerBottomEdge = сontainmentWrapperBox!.y + сontainmentWrapperBox!.height;

		expect(boxBottomEdge).toBeLessThanOrEqual(containerBottomEdge);
	});
});
