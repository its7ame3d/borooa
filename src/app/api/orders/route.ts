import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/mailer";

const MAX_TOTAL_ATTACHMENT_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  const craft = String(formData.get("craft") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const details = String(formData.get("details") || "").trim();

  if (!craft || !budget || !name || !phone) {
    return NextResponse.json({ error: "يرجى تعبئة جميع الحقول المطلوبة." }, { status: 400 });
  }

  const imageEntries = formData.getAll("images").filter((v): v is File => v instanceof File);

  let totalBytes = 0;
  const images: { filename: string; buffer: Buffer; contentType: string }[] = [];
  for (const file of imageEntries) {
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "حجم الصور المرفقة كبير جداً." }, { status: 400 });
    }
    images.push({
      filename: file.name || "image.jpg",
      buffer: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "application/octet-stream",
    });
  }

  sendOrderEmail({ craft, budget, name, phone, city, details, images }).catch((error) => {
    console.error("Failed to send order email:", error);
  });

  return NextResponse.json({ ok: true });
}
