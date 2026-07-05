const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexPath = path.join(rootDir, 'index.html');
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const toolsGridPath = path.join(rootDir, 'new_tools_grid.txt');

// 1. UPDATE INDEX.HTML
if (fs.existsSync(indexPath) && fs.existsSync(toolsGridPath)) {
  let indexHTML = fs.readFileSync(indexPath, 'utf8');
  const newGridHTML = fs.readFileSync(toolsGridPath, 'utf8');
  
  // Find where the tools grid ends (look for the closing div of the grid)
  // The grid looks like: <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem;">
  
  const gridStart = indexHTML.indexOf('margin-top: 3rem;">');
  if (gridStart !== -1) {
    // Find the end of this grid. Since it's just a bunch of <a> tags inside, 
    // we can find the end of the last <a> tag before the closing </div> of the grid.
    
    // Actually, I can just append it before the `</section>` of the tools section.
    // Let's find: `      </div>\n    </section>` or something similar.
    // It's safer to find the </div> just before `</section>`
    const sectionEnd = indexHTML.indexOf('</section>');
    const insertionPoint = indexHTML.lastIndexOf('</div>', sectionEnd);
    
    if (insertionPoint !== -1) {
      indexHTML = indexHTML.slice(0, insertionPoint) + newGridHTML + '\n      ' + indexHTML.slice(insertionPoint);
      fs.writeFileSync(indexPath, indexHTML);
      console.log('Updated index.html with new calculators');
    }
  }
}

// 2. REGENERATE SITEMAP.XML
const dateStr = new Date().toISOString().split('T')[0];
const pages = [
  '/',
  '/about.html',
  '/contact.html',
  '/privacy.html',
  '/terms.html',
  '/tools/paycheck-calculator.html',
  '/tools/mortgage-calculator.html',
  '/tools/sales-tax-calculator.html',
  '/tools/tip-calculator.html',
  '/tools/bmi-calculator.html',
  '/tools/age-calculator.html',
  '/tools/gpa-calculator.html',
  '/tools/percentage-calculator.html',
  '/tools/word-counter.html',
  '/tools/car-loan-calculator.html',
  '/tools/compound-interest-calculator.html',
  '/tools/retirement-estimator.html',
  '/tools/salary-to-hourly-calculator.html',
  '/tools/discount-sales-calculator.html',
  '/tools/bmr-calculator.html',
  '/tools/auto-depreciation-calculator.html',
  '/tools/roi-calculator.html',
  '/tools/date-duration-calculator.html',
  '/tools/pregnancy-due-date-calculator.html',
  '/tools/loan-amortization-calculator.html'
];

let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>\\n';
sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n';

for (const page of pages) {
  sitemapXML += '  <url>\\n';
  sitemapXML += '    <loc>https://calculora.bongshai.com' + page + '</loc>\\n';
  sitemapXML += '    <lastmod>' + dateStr + '</lastmod>\\n';
  if (page === '/') {
    sitemapXML += '    <priority>1.0</priority>\\n';
  } else if (page.startsWith('/tools/')) {
    sitemapXML += '    <priority>0.8</priority>\\n';
  } else {
    sitemapXML += '    <priority>0.5</priority>\\n';
  }
  sitemapXML += '  </url>\\n';
}
sitemapXML += '</urlset>';

fs.writeFileSync(sitemapPath, sitemapXML);
console.log('Regenerated sitemap.xml with 25 pages');
