# 🌟 Cosmic Weaver CMS - Quick Start

## ✅ สิ่งที่สร้างเสร็จแล้ว

### 1. 🔐 Authentication System
- ✅ หน้า Login (`/admin/login`)
- ✅ Protected Admin Layout
- ✅ Auto-redirect ถ้าไม่ได้ login
- ✅ Session management

### 2. 📝 Blog Management
- ✅ หน้า Blog List (`/admin/blog`)
  - แสดงรายการบทความทั้งหมด
  - แยกสถานะ (เผยแพร่/แบบร่าง)
  - ปุ่มแก้ไข/ลบ
- ✅ หน้า Editor (`/admin/blog/new`, `/admin/blog/[id]`)
  - Form ครบทุกฟิลด์
  - Live Preview
  - Auto-save slug
  - Publish toggle

### 3. 🤖 AI Features (Powered by Gemini 2.0 Flash)
- ✅ **AI Co-Author**
  - ขยายเนื้อหา
  - คิดจุดหักมุม
  - ปรับโทนลึกลับ
- ✅ **AI Metadata Generator**
  - สร้าง Slug
  - สร้าง Excerpt
  - แนะนำ Tags
- ✅ **The Watcher's Insight Generator**
  - สร้างข้อความลึกลับ
  - สไตล์ "ผู้เฝ้ามอง"

### 4. 🔒 Security
- ✅ Row-Level Security (RLS) policies
- ✅ Admin role checking
- ✅ Protected API routes

### 5. 📚 Documentation
- ✅ คู่มือการติดตั้ง (`docs/ADMIN_SETUP.md`)
- ✅ Troubleshooting guide
- ✅ Security best practices

---

## 🚀 การเริ่มต้นใช้งาน (3 ขั้นตอน)

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
npm install @google/generative-ai
```

### ขั้นตอนที่ 2: ตั้งค่า Environment Variables

เพิ่มใน `.env.local`:

```env
# Google Gemini API (ใหม่)
GEMINI_API_KEY=your_gemini_api_key_here
```

**วิธีขอ API Key:**
1. ไปที่ https://makersuite.google.com/app/apikey
2. คลิก "Create API Key"
3. Copy มาใส่

### ขั้นตอนที่ 3: สร้าง Admin User

**วิธีง่าย (ผ่าน Supabase Dashboard):**

1. ไปที่ **Supabase Dashboard > Authentication > Users**
2. คลิก **"Add User"**
3. กรอก:
   - Email: `admin@cosmicweaver.com` (หรืออะไรก็ได้)
   - Password: `your_strong_password`
4. คลิก **"Create User"**
5. คลิกที่ user ที่สร้าง
6. ไปที่ **"Raw User Meta Data"**
7. เพิ่ม:
   ```json
   {
     "role": "admin"
   }
   ```
8. Save

**วิธีเร็ว (ผ่าน SQL):**

รันใน **SQL Editor**:

```sql
-- เปลี่ยน email และ password ตรงนี้
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@cosmicweaver.com', -- เปลี่ยนตรงนี้
  crypt('your_password', gen_salt('bf')), -- เปลี่ยนตรงนี้
  now(),
  '{"role": "admin"}',
  now(),
  now()
);
```

---

## 🎯 ทดสอบระบบ

### 1. รัน Dev Server

```bash
npm run dev
```

### 2. เข้าสู่ระบบ

1. ไปที่ `http://localhost:3000/admin/login`
2. กรอก Email/Password ที่สร้างไว้
3. ควรเข้าไปที่หน้า `/admin/blog`

### 3. ทดสอบสร้างบทความ

1. คลิก **"เขียนบทความใหม่"**
2. กรอกชื่อบทความ: "ทดสอบระบบ"
3. กรอกเนื้อหา: "นี่คือการทดสอบระบบ CMS"
4. คลิก **"💾 บันทึก"**
5. ควรกลับไปหน้า list และเห็นบทความที่สร้าง

### 4. ทดสอบ AI Features

1. สร้างบทความใหม่
2. เขียนเนื้อหาสั้นๆ 1 ย่อหน้า
3. คลิก **"✨ AI Assist"**
4. เลือก "ขยายเนื้อหา"
5. คลิก **"สร้างด้วย AI"**
6. ควรเห็น AI เสนอเนื้อหาเพิ่ม

---

## 📁 ไฟล์ที่สร้างใหม่

```
app/
├── admin/
│   ├── layout.tsx              # Admin layout + auth
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── blog/
│       ├── page.tsx            # Blog list
│       ├── new/
│       │   └── page.tsx        # New post
│       └── [id]/
│           └── page.tsx        # Edit post
├── api/
│   └── ai-blog-tools/
│       └── route.ts            # AI API endpoint

components/
└── admin/
    ├── BlogEditor.tsx          # Main editor component
    └── AIAssistant.tsx         # AI assistant modal

supabase/
└── migrations/
    └── 20260206_admin_rls_policies.sql  # RLS policies

docs/
└── ADMIN_SETUP.md              # คู่มือฉบับเต็ม

README_CMS.md                   # ไฟล์นี้
```

---

## 🎨 UI Features

### หน้า Blog List
- ✅ Table view แสดงบทความ
- ✅ สถานะ badge (เผยแพร่/แบบร่าง)
- ✅ หมวดหมู่ badge
- ✅ วันที่เผยแพร่
- ✅ ปุ่มแก้ไข/ลบ
- ✅ ปุ่มสร้างบทความใหม่

### หน้า Editor
- ✅ Form fields ครบทุกอย่าง
- ✅ Auto-generate slug
- ✅ Live preview panel
- ✅ AI assist buttons
- ✅ Publish toggle
- ✅ Save button

### AI Assistant Modal
- ✅ 3 โหมด (Content, Metadata, Watcher)
- ✅ Loading state
- ✅ Error handling
- ✅ Apply button
- ✅ Close button

---

## 🔧 การปรับแต่ง

### เปลี่ยน AI Model

แก้ไขใน `app/api/ai-blog-tools/route.ts`:

```typescript
// เปลี่ยนจาก Gemini เป็น OpenAI
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// แก้ไข model.generateContent() เป็น openai.chat.completions.create()
```

### เพิ่ม Category Selector

แก้ไขใน `components/admin/BlogEditor.tsx`:

```typescript
// เพิ่ม state
const [categoryId, setCategoryId] = useState('');
const [categories, setCategories] = useState([]);

// Fetch categories
useEffect(() => {
  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data);
  };
  fetchCategories();
}, []);

// เพิ่ม select field
<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>{cat.name}</option>
  ))}
</select>
```

---

## ❓ FAQ

**Q: ทำไมต้องใช้ Gemini 2.0 Flash?**  
A: เร็ว, ถูก, และรองรับภาษาไทยดี

**Q: สามารถใช้ฟรีได้นานแค่ไหน?**  
A: Gemini มี free tier 15 requests/minute, 1,500 requests/day

**Q: ถ้าไม่ต้องการ AI จะลบยังไง?**  
A: ลบ `AIAssistant.tsx` และ `app/api/ai-blog-tools/route.ts` แล้วเอาปุ่ม AI ออกจาก `BlogEditor.tsx`

**Q: จะเพิ่ม Rich Text Editor (WYSIWYG) ยังไง?**  
A: ติดตั้ง `react-quill` หรือ `tiptap` แทน textarea

---

## 🎉 เสร็จสมบูรณ์!

ระบบ CMS พร้อมใช้งานแล้ว! 

**Next Steps:**
1. รัน migration สำหรับ RLS
2. สร้าง admin user
3. ทดสอบ login
4. ทดสอบสร้างบทความ
5. ทดสอบ AI features

**คู่มือเต็ม:** อ่านใน `docs/ADMIN_SETUP.md`

---

**Happy Writing! ✨**
