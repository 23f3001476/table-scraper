import { chromium } from 'playwright';

async function scrapeTables() {
  const browser = await chromium.launch({ headless: true });
  let grandTotal = 0;
  
  const seeds = [78,79,80,81,82,83,84,85,86,87];
  
  for (const seed of seeds) {
    console.log(`Scraping seed ${seed}...`);
    const page = await browser.newPage();
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);
    
    await page.waitForSelector('table');
    
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const num = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const seedSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += seedSum;
    console.log(`Seed ${seed} sum: ${seedSum.toFixed(2)}`);
    
    await page.close();
  }
  
  console.log(`\n🎉 GRAND TOTAL: ${grandTotal.toFixed(2)}`);
  await browser.close();
}

scrapeTables();


