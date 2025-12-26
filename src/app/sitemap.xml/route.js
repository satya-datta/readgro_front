// app/sitemap.xml/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://readgro.com";
  const backendUrl = "http://localhost:5000";

  const staticPaths = ["", "about", "contact", "courses", "packages"];

  let courses = [];
  let packages = [];

  try {
    const coursesRes = await fetch(
      `${backendUrl}/getspecific_course/courses-ids`
    );
    if (coursesRes.ok) {
      courses = await coursesRes.json();
    }
  } catch (err) {
    console.error("Failed to fetch courses:", err);
  }

  try {
    const packagesRes = await fetch(`${backendUrl}/getpackage/packages-ids`);
    if (packagesRes.ok) {
      packages = await packagesRes.json();
    }
  } catch (err) {
    console.error("Failed to fetch packages:", err);
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticPaths.forEach((path) => {
    sitemap += `  <url><loc>${baseUrl}/${path}</loc></url>\n`;
  });

  courses.forEach((course) => {
    sitemap += `  <url><loc>${baseUrl}/courses/${course.course_id}</loc></url>\n`;
  });

  packages.forEach((pkg) => {
    sitemap += `  <url><loc>${baseUrl}/packages/${pkg.package_id}</loc></url>\n`;
  });

  sitemap += `</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
