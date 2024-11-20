import { chromium } from "playwright";
import "../db/conn.js";
import Vulnerability from "../models/commonScrape.js"; // Adjust import as necessary

export async function scrapeMicrosoftData() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://msrc.microsoft.com/update-guide/vulnerability", {
      timeout: 60000,
    });

    await page.waitForSelector(".ms-List-surface"); // Wait for the list to load

    const vulnerabilities = await scrapeVulnerabilities(page);
    console.log("Extracted Microsoft Vulnerabilities:", vulnerabilities);

    // Create a set of existing CVE IDs for quick lookup
    const existingCVEs = new Set(await Vulnerability.find().distinct("CVE"));

    const newVulnerabilities = vulnerabilities.filter(
      (vulnerability) => !existingCVEs.has(vulnerability.CVE)
    );

    if (newVulnerabilities.length > 0) {
      const vulnerabilityPromises = newVulnerabilities.map(
        async (vulnerability) => {
          const vulnData = new Vulnerability({
            CVE: vulnerability.CVE,
            title: vulnerability.title,
            severity: vulnerability.severity,
            publishedDate: vulnerability.publishedDate, // Keep as string
            documentId: null, // Allow null for documentId
            detailLink: vulnerability.CVELink, // Use the CVELink extracted from href
            updateDate: vulnerability.updateDate || null, // Allow null for updateDate
            source: "Microsoft",
          });

          return vulnData.save(); // Save the vulnerability
        }
      );

      await Promise.all(vulnerabilityPromises); // Wait for all saves to complete
      console.log(
        "Microsoft vulnerabilities saved:",
        newVulnerabilities.length
      );
    } else {
      console.log("No new Microsoft vulnerabilities to save.");
    }
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
}

async function scrapeVulnerabilities(page) {
  return await page.evaluate(() => {
    const data = [];
    const cells = document.querySelectorAll(".ms-List-cell"); // Get all cells directly

    cells.forEach((cell) => {
      const fields = cell.querySelector(".ms-DetailsRow-fields");
      if (fields) {
        const publishedDate =
          fields.querySelector('[data-automation-key="releaseDate"]')
            ?.innerText || "No date";
        const updateDate =
          fields.querySelector('[data-automation-key="latestRevisionDate"]')
            ?.innerText || null; // Allow null
        const CVE =
          fields.querySelector('[data-automation-key="cveNumber"] a')
            ?.innerText || "No CVE"; // Extract CVE title
        const titleLink =
          fields.querySelector('[data-automation-key="cveNumber"] a')?.href ||
          "No link"; // Extract CVE link
        const title =
          fields.querySelector('[data-automation-key="cveTitle"]')?.innerText ||
          "No title";
        const severity =
          fields.querySelector('[data-automation-key="severity"]')?.innerText ||
          "No severity"; // Add default value if needed

        data.push({
          CVE,
          title,
          severity,
          publishedDate,
          updateDate,
          CVELink: titleLink, // Store the CVE link
        });
      }
    });

    return data;
  });
}

// Start the scraping process
scrapeMicrosoftData();
