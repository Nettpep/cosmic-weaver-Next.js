import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, mode, content, title, tone } = body;

    if (!content || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    let prompt = '';
    let result: any = {};

    // Co-Author Mode
    if (action === 'co_author') {
      if (mode === 'expand') {
        prompt = `คุณคือนักเขียนบทความเชิงปรัชญาและจักรวาลวิทยา กรุณาขยายเนื้อหาต่อไปนี้ให้ยาวขึ้นและน่าสนใจขึ้น แต่คงสไตล์ลึกลับและกระตุ้นความคิด

หัวข้อ: ${title}
เนื้อหาปัจจุบัน:
${content}

กรุณาขยายเนื้อหาเพิ่มอีก 2-3 ย่อหน้า โดยเพิ่มรายละเอียดที่น่าสนใจ ตัวอย่างที่เข้าใจง่าย และข้อคิดที่กระตุ้นความคิด`;

      } else if (mode === 'plot_twist') {
        prompt = `คุณคือนักเขียนที่เชี่ยวชาญการสร้างจุดหักมุมและมุมมองใหม่ที่น่าตื่นเต้น กรุณาเสนอจุดหักมุมหรือมุมมองที่น่าประหลาดใจสำหรับบทความนี้

หัวข้อ: ${title}
เนื้อหาปัจจุบัน:
${content}

เขียนย่อหน้าใหม่ที่นำเสนอมุมมองหรือข้อมูลที่น่าตื่นเต้นและไม่คาดคิด ที่จะทำให้ผู้อ่านต้องคิดต่อ`;

      } else if (mode === 'tone_adjust') {
        prompt = `คุณคือนักเขียนที่เชี่ยวชาญการเขียนในสไตล์ลึกลับและน่าพรั่นพรึง แบบ "ผู้เฝ้ามอง" หรือ "ผู้ชักใยเบื้องหลัง" กรุณาปรับโทนเนื้อหาต่อไปนี้ให้มีบรรยากาศลึกลับและน่าเกรงขามมากขึ้น

เนื้อหาเดิม:
${content}

เขียนใหม่ให้มีโทนที่:
- ลึกลับและน่าพรั่นพรึง
- ใช้ภาษาที่ชวนให้นึกถึง "ผู้รู้ทุกสิ่ง"
- กระตุ้นความรู้สึกว่ามีสิ่งที่ซ่อนอยู่`;
      }

      const response = await model.generateContent(prompt);
      const text = response.response.text();

      result = {
        suggestion: text,
        note: mode === 'expand' ? 'AI ขยายเนื้อหาให้แล้ว' :
              mode === 'plot_twist' ? 'AI สร้างจุดหักมุมให้แล้ว' :
              'AI ปรับโทนให้ลึกลับขึ้นแล้ว'
      };
    }

    // Metadata Mode
    else if (action === 'metadata') {
      prompt = `วิเคราะห์บทความต่อไปนี้แล้วสร้าง metadata ให้

หัวข้อ: ${title}
เนื้อหา:
${content.substring(0, 1000)}...

กรุณาสร้าง:
1. slug (URL-friendly, ภาษาไทยหรืออังกฤษ, สั้นๆ)
2. excerpt (คำโปรยสั้น 1-2 ประโยค)
3. tags (3-5 แท็กที่เกี่ยวข้อง ภาษาไทย)

ตอบกลับในรูปแบบ JSON:
{
  "slug": "...",
  "excerpt": "...",
  "tags": ["...", "..."]
}`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      
      // Parse JSON from response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        result = {
          slug: title.toLowerCase().replace(/\s+/g, '-').substring(0, 50),
          excerpt: text.substring(0, 200),
          tags: ['ทั่วไป']
        };
      }
    }

    // Watcher's Insight Mode
    else if (action === 'watcher') {
      prompt = `คุณคือ "ผู้พิทักษ์" (The Watcher) ผู้ที่มองเห็นความจริงที่ซ่อนอยู่เบื้องหลัง กรุณาสร้าง "สารจากผู้พิทักษ์" สำหรับบทความนี้

หัวข้อ: ${title}
เนื้อหาสรุป:
${content.substring(0, 500)}...

สร้างประโยคสั้น 1-2 ประโยคที่:
- พูดในมุมของ "ผู้เฝ้ามอง" ที่รู้ความจริง
- ลึกลับและกระตุ้นความคิด
- ไม่สปอยล์เนื้อหา แต่ชี้นำความคิด
- ใช้ภาษาไทยที่สวยงามและน่าประทับใจ

ตัวอย่างสไตล์: "มนุษย์มักคิดว่าตัวเองกำลังมองดูดวงดาว แท้จริงแล้วคือดวงดาวต่างหากที่กำลังมองลึกเข้ามาในใจของพวกเขา"`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();

      result = {
        insight: text.trim().replace(/^["']|["']$/g, '')
      };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'AI processing failed' },
      { status: 500 }
    );
  }
}
