import { expect, test } from "@playwright/test";

test("Yagi calculator explains matching and updates directors for diameter and fiberglass boom", async ({
  page,
}) => {
  await page.goto("/tools/yagi-calculator");

  await expect(
    page.getByText(
      /本工具未计算馈点阻抗或驻波比|This tool does not calculate feedpoint impedance or SWR/i,
    ),
  ).toBeVisible({ timeout: 30_000 });

  await page.getByRole("button", { name: /专业工程模式|Pro Mode/i }).click();
  const material = page.getByRole("combobox", {
    name: /动臂材质|Boom Material/i,
  });
  await material.click();
  await page.getByRole("option", { name: /玻璃钢|Fiberglass/i }).click();

  await expect(
    page.getByText(
      /玻璃钢动臂不使用金属动臂修正|fiberglass boom needs no metal-boom correction/i,
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("spinbutton", { name: /计算修正系数|Correction Factor/i }),
  ).toBeDisabled();
  await expect(page.getByText(/8\.2 dBi/)).toBeVisible();

  const diameter = page.getByRole("spinbutton", {
    name: /振子直径|Element Diameter/i,
  });
  const directorCut = page
    .getByRole("row", { name: /Director 1/i })
    .locator("td")
    .nth(4);
  const thinCut = Number(await directorCut.textContent());
  await diameter.fill("8");
  await expect
    .poll(async () => Number(await directorCut.textContent()))
    .toBeLessThan(thinCut);

  const gap = page.getByRole("spinbutton", { name: /馈电间隙|Feed Gap/i });
  await expect(gap).toBeDisabled();
  await page.getByRole("combobox", { name: /类型|Type/i }).click();
  await page.getByRole("option", { name: /直立振子|Straight Dipole/i }).click();
  await expect(gap).toBeEnabled();
  await expect(
    page.getByText(
      /开口偶极子在八木阵列中不保证匹配|A split dipole in a Yagi is not guaranteed/i,
    ),
  ).toBeVisible();
});
