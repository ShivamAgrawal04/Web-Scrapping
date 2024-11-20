import { chromium } from "playwright";
import { connectDB } from "../db/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

import Vulnerability from "../models/vulnerabilities.js"; // Adjust import as necessary

connectDB();

export async function scrapeHPData() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://support.hp.com/us-en/security-bulletins", {
      timeout: 60000,
    });

    await page.waitForSelector("table tbody tr");

    const vulnerabilities = await scrapeVulnerabilities(page);
    console.log("Extracted Vulnerabilities:", vulnerabilities);

    // Create a set of existing CVEs for quick lookup
    const existingCVEs = new Set(
      await Vulnerability.find().distinct("CVE") // Check against CVE
    );

    const newVulnerabilities = vulnerabilities.filter(
      (vulnerability) => !existingCVEs.has(vulnerability.CVE) // Check against CVE
    );

    if (newVulnerabilities.length > 0) {
      const vulnerabilityPromises = newVulnerabilities.map(
        async (vulnerability) => {
          const vulnData = new Vulnerability({
            CVE: vulnerability.CVE,
            title: vulnerability.title,
            severity: vulnerability.severity,
            publishedDate: vulnerability.publishedDate, // Keep as string
            documentId: vulnerability.documentId || null, // Allow null for documentId
            detailLink: vulnerability.titleLink,
            updateDate: vulnerability.updateDate || null, // Allow null for updateDate
            source: "HP",
          });

          return vulnData.save(); // Save the vulnerability
        }
      );

      await Promise.all(vulnerabilityPromises); // Wait for all saves to complete
      console.log("Vulnerabilities saved:", newVulnerabilities.length);
    } else {
      console.log("No new vulnerabilities to save.");
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
    const elements = document.querySelectorAll("table tbody tr");

    elements.forEach((element) => {
      const documentId =
        element.querySelector("td:nth-child(3)")?.innerText || null; // Allow null
      const title =
        element.querySelector("td:nth-child(2)")?.innerText || "No title";
      const titleLink =
        element.querySelector("td:nth-child(2) a")?.href || "No title";
      const severity =
        element.querySelector("td:nth-child(1)")?.innerText || "No severity";
      const CVE =
        element.querySelector("td:nth-child(4)")?.innerText || "NO CVE";
      const publishedDate =
        element.querySelector("td:nth-child(5)")?.innerText || "No date";
      const updateDate =
        element.querySelector("td:nth-child(6)")?.innerText || null; // Allow null

      data.push({
        CVE,
        documentId,
        title,
        severity,
        publishedDate,
        updateDate,
        titleLink,
      });
    });

    return data;
  });
}

// Start the scraping process
scrapeHPData();
