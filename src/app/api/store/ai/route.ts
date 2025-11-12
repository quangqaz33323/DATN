import authSeller from "@/app/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/configs/openai";
import OpenAI from "openai";

async function main(base64Image: string, mimeType: string) {
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `Bạn là trợ lý danh sách sản phẩm cho một cửa hàng thương mại điện tử tại Việt Nam. Công việc của bạn là phân tích hình ảnh sản phẩm và tạo dữ liệu có cấu trúc.

QUAN TRỌNG: Bạn PHẢI trả lời HOÀN TOÀN bằng TIẾNG VIỆT. Tất cả nội dung phải được viết bằng tiếng Việt.

CHỈ trả lời bằng JSON thô (không có khối mã, không có markdown, không có giải thích).

JSON phải tuân thủ nghiêm ngặt lược đồ này:

{
  "name": string, // Tên sản phẩm ngắn gọn bằng tiếng Việt (3-8 từ)
  "description": string // Mô tả chi tiết, hấp dẫn về sản phẩm bằng tiếng Việt (2-4 câu, tập trung vào đặc điểm nổi bật, chất liệu, công dụng)
}

Ví dụ output mong muốn:
{
  "name": "Bàn Gỗ Sồi Hiện Đại",
  "description": "Bàn làm việc được làm từ gỗ sồi tự nhiên, thiết kế hiện đại tối giản. Bề mặt nhẵn mịn, chống trầy xước, phù hợp cho không gian văn phòng hoặc phòng ngủ. Kích thước vừa phải, tiết kiệm diện tích nhưng vẫn đảm bảo công năng sử dụng."
}`,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Phân tích hình ảnh sản phẩm này và trả về tên và mô tả bằng TIẾNG VIỆT. Hãy đảm bảo tên ngắn gọn và mô tả chi tiết, hấp dẫn.",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${base64Image}`,
          },
        },
      ],
    },
  ];

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gemini-2.0-flash",
    messages,
  });

  const content = response.choices[0].message.content;

  if (!content) {
    return "No content";
  }

  const cleaned = content.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return NextResponse.json("Invalid JSON", { status: 400 });
  }

  return parsed;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const isSeller = await authSeller(userId?.toString());

    if (!isSeller) {
      return NextResponse.json("Seller Unauthorized", { status: 401 });
    }

    const { base46Image, mimeType } = await req.json();

    const result = await main(base46Image, mimeType);
    return NextResponse.json({ ...result }, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
