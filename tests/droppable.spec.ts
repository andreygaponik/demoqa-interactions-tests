import { test, expect } from '../lib/fixtures';

test.describe('Droppable Page: Simple', () => {
	test('Initial State: should display all required elements correctly', async ({
		droppablePage,
	}) => {
		await expect(droppablePage.mainHeader).toBeVisible();
		await expect(droppablePage.droppable).toBeVisible();
		await expect(droppablePage.draggable).toBeVisible();
	});

	test('Smoke: should drop when dragged to the center', async ({
		droppablePage,
	}) => {
		// Checking that an element is initialized
		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		await droppablePage.dragAndDrop();

		await expect(droppablePage.droppable).toHaveClass(/ui-state-highlight/);
		await expect(droppablePage.droppable).toHaveText('Dropped!');
	});

	test('Potential Problem: text should remain "Dropped!" after moving the block away', async ({
		droppablePage,
	}) => {
		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		await droppablePage.dragAndDrop();

		await expect(droppablePage.droppable).toHaveText('Dropped!');

		await droppablePage.dragAndDrop({
			targetPosition: { x: 300, y: 300 },
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Dropped!');
		await expect(droppablePage.droppable).toHaveClass(/ui-state-highlight/);
	});

	// --- BOUNDARY VALUE TESTS ---

	test('Boundary LEFT: should drop at x: -1', async ({ droppablePage }) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		// -1 - Touching the left border
		await droppablePage.dragAndDrop({
			targetPosition: { x: -1, y: droppableBox!.height / 2 },
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Dropped!');
	});

	test('Boundary LEFT: should NOT drop at x: -2', async ({ droppablePage }) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		await droppablePage.dragAndDrop({
			targetPosition: { x: -2, y: droppableBox!.height / 2 },
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Drop Here');
	});

	test('Boundary TOP: should drop at y: 0', async ({ droppablePage }) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		// 0 - Touching the upper border
		await droppablePage.dragAndDrop({
			targetPosition: { x: droppableBox!.width / 2, y: 0 },
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Dropped!');
	});

	test('Boundary TOP: should NOT drop at y: -1', async ({ droppablePage }) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		await droppablePage.dragAndDrop({
			targetPosition: { x: droppableBox!.width / 2, y: -1 },
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Drop Here');
	});

	test('Boundary RIGHT: should drop at x: width - 2', async ({
		droppablePage,
	}) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		// -2 - Touching the right border
		await droppablePage.dragAndDrop({
			targetPosition: {
				x: droppableBox!.width - 2,
				y: droppableBox!.height / 2,
			},
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Dropped!');
	});

	test('Boundary RIGHT: should NOT drop at x: width - 1', async ({
		droppablePage,
	}) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		await droppablePage.dragAndDrop({
			targetPosition: {
				x: droppableBox!.width - 1,
				y: droppableBox!.height / 2,
			},
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Drop Here');
	});

	test('Boundary BOTTOM: should drop at y: height - 2', async ({
		droppablePage,
	}) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		// -2 - Touching the lower border
		await droppablePage.dragAndDrop({
			targetPosition: {
				x: droppableBox!.width / 2,
				y: droppableBox!.height - 2,
			},
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Dropped!');
	});

	test('Boundary BOTTOM: should NOT drop at y: height - 1', async ({
		droppablePage,
	}) => {
		const droppableBox = await droppablePage.getDroppableBoundingBox();

		await expect(droppablePage.draggable).toHaveClass(/ui-draggable-handle/);

		await droppablePage.dragAndDrop({
			targetPosition: {
				x: droppableBox!.width / 2,
				y: droppableBox!.height - 1,
			},
			force: true,
		});

		await expect(droppablePage.droppable).toHaveText('Drop Here');
	});
});
