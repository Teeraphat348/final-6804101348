# Software Testing Final Exam — Playwright (TypeScript) on SauceDemo

ระบบที่ทดสอบ: https://www.saucedemo.com/ (Username `standard_user` / Password `secret_sauce`)

## วิธีรัน
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
node scripts/make-summary.js   # สร้าง reports/test-summary.md จาก reports/results.json จริง
```

## โครงสร้างการทดสอบ
| ไฟล์ | ชื่อ Test | ประเภท |
|---|---|---|
| tests/unit/UT-01.spec.ts | UT-01.1 / UT-01.2 / UT-01.3 | UI Component Testing (Login Form) |
| tests/unit/UT-02.spec.ts | UT-02 | UI Component Testing (ปุ่ม Add to cart / Remove) |
| tests/integration/IT-01.spec.ts | IT-01 | Top-Down Integration + Stub |
| tests/integration/IT-02.spec.ts | IT-02 | Bottom-Up Integration + Driver |
| tests/system/ST-01.spec.ts | ST-01 | System Testing (ซื้อสินค้า 2 รายการ) |
| tests/system/ST-02.spec.ts | ST-02 | System Testing (Checkout Validation & Recovery) |

> บทที่ 1 เป็นการทดสอบ UI แบบ Black-box ผ่าน Browser จึงเป็น UI Component/Functional Testing
> ไม่ใช่ Unit Testing ของฟังก์ชันภายในโดยตรง เพราะไม่สามารถเข้าถึง Source Code ภายในของ SauceDemo

## IT-01: Top-Down Integration Testing ด้วย Stub
- **Real:** หน้า Login ของ SauceDemo จริง การกรอกข้อมูล การกด Login และการเปลี่ยน URL เป็น `inventory.html`
- **Stub:** หน้า Inventory ที่ถูกแทนที่ด้วย HTML จำลองผ่าน `page.setContent()` ซึ่งแสดงข้อความ
  `Mock Inventory Ready` และสินค้าจำลอง `Mock Backpack`, `Mock Bike Light`
- Stub นี้เป็นการจำลอง DOM ระดับ Browser หลัง Login จริง ไม่ใช่การแทน Internal Module ของ SauceDemo

## IT-02: Bottom-Up Integration Testing ด้วย Driver
- **Driver:** ฟังก์ชัน `driverOpenInventory()` ทำหน้าที่เตรียมสถานะ Login ด้วย `BrowserContext.addCookies()`
  (Cookie `session-username=standard_user` บนโดเมน `www.saucedemo.com`) แล้วเปิด `/inventory.html` โดยตรง
  โดยไม่ผ่าน Login Form
- **Real:** หน้า Inventory (6 สินค้า) การเพิ่มสินค้า Cart Badge และหน้า Shopping Cart ทั้งหมดเป็นของจริงบน SauceDemo
