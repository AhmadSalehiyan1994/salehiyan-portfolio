import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getProjectBySlug } from "@/lib/content";

export const runtime = "nodejs";

function wrapText(text: string, maxChars: number) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    current = word;
  }
  if (current) lines.push(current);
  return lines;
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const page = pdf.addPage([612, 792]);
  const { width, height } = page.getSize();

  const margin = 54;
  let y = height - margin;

  const drawHeading = (text: string) => {
    page.drawText(text, { x: margin, y, size: 18, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
    y -= 26;
  };

  const drawSub = (text: string) => {
    page.drawText(text, { x: margin, y, size: 11, font, color: rgb(0.25, 0.25, 0.25) });
    y -= 18;
  };

  const drawSectionTitle = (text: string) => {
    y -= 6;
    page.drawText(text, { x: margin, y, size: 12, font: fontBold, color: rgb(0.15, 0.15, 0.15) });
    y -= 18;
  };

  const drawParagraph = (text: string) => {
    const lines = wrapText(text, 96);
    for (const line of lines) {
      page.drawText(line, { x: margin, y, size: 10.5, font, color: rgb(0.2, 0.2, 0.2) });
      y -= 14;
    }
    y -= 6;
  };

  const drawBullets = (items: string[]) => {
    for (const item of items) {
      const lines = wrapText(item, 92);
      const first = lines.shift() || "";
      page.drawText(`• ${first}`, { x: margin, y, size: 10.5, font, color: rgb(0.2, 0.2, 0.2) });
      y -= 14;
      for (const line of lines) {
        page.drawText(`  ${line}`, { x: margin, y, size: 10.5, font, color: rgb(0.2, 0.2, 0.2) });
        y -= 14;
      }
    }
    y -= 6;
  };

  drawHeading(project.title);
  drawSub(`${project.domain} • ${project.timeline}`);
  drawSub(project.impactLabel);

  drawSectionTitle("Context");
  drawParagraph(project.description);

  drawSectionTitle("Problem");
  drawParagraph(project.problem);

  drawSectionTitle("What I did");
  drawParagraph(project.role);

  drawSectionTitle("Result");
  drawParagraph(project.outcome);

  drawSectionTitle("What changed");
  drawBullets(project.proofPoints);

  drawSectionTitle("Deliverables");
  drawBullets(project.deliverables);

  drawSectionTitle("Tools / methods");
  drawParagraph(project.stack.join(", "));

  const bytes = await pdf.save();
  const filename = `case-study-${project.slug}.pdf`;

  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename=\"${filename}\"`,
      "cache-control": "public, max-age=3600",
    },
  });
}
