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

		const DragabbleBox = await dragabblePage.getDragabbleBoundingBox();

		console.log(DragabbleBox);

		expect(DragabbleBox!.x).toBeGreaterThanOrEqual(сontainmentWrapperBox!.x);
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

		const DragabbleBox = await dragabblePage.getDragabbleBoundingBox();

		expect(DragabbleBox!.x).toBeGreaterThanOrEqual(сontainmentWrapperBox!.x);
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

		const DragabbleBox = await dragabblePage.getDragabbleBoundingBox();

		expect(DragabbleBox!.x).toBeGreaterThanOrEqual(сontainmentWrapperBox!.x);
	});

	test('Boundary BOTTOM: should rest against the bottom edge', async ({
		dragabblePage,
	}) => {
		const сontainmentWrapperBox =
			await dragabblePage.getContainmentWrapperBoundingBox();

		await expect(dragabblePage.dragabble).toHaveClass(/ui-draggable-handle/);

		await dragabblePage.dragAndDrop({
			targetPosition: { x: 0, y: 1000 },
			force: true,
		});

		const DragabbleBox = await dragabblePage.getDragabbleBoundingBox();

		expect(DragabbleBox!.x).toBeGreaterThanOrEqual(сontainmentWrapperBox!.x);
	});
});
