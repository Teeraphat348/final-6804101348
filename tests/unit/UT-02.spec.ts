import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge'
  }
}, async ({ page }) => {
  const addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const badge = page.locator('[data-test="shopping-cart-badge"]');

  await test.step('Login เข้าสู่ระบบ', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toHaveText('Add to cart');
  });

  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    await addBtn.click();
    await expect(removeBtn).toBeVisible();
    await expect(removeBtn).toHaveText('Remove');
    await expect(badge).toHaveText('1');
  });

  await test.step('ลบสินค้าออกจาก Cart', async () => {
    await removeBtn.click();
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toHaveText('Add to cart');
    await expect(badge).toHaveCount(0);
  });
});
