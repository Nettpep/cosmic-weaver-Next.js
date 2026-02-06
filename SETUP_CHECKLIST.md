# ✅ Cosmic Weaver CMS - Setup Checklist

## 📋 Pre-Setup

- [ ] มี Supabase Project แล้ว
- [ ] มี Google Gemini API Key แล้ว (ขอได้ที่ https://makersuite.google.com/app/apikey)
- [ ] Clone/Pull code ล่าสุด

---

## 🔧 Installation (5 นาที)

### 1. ติดตั้ง Dependencies

```bash
npm install
```

✅ Package `@google/generative-ai` ถูกติดตั้งแล้วอัตโนมัติ

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` (copy จาก `env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

**วิธีหา Keys:**
- Supabase: Dashboard > Settings > API
- Gemini: https://makersuite.google.com/app/apikey

---

## 🗄️ Database Setup (5 นาที)

### Option A: ผ่าน Supabase Dashboard (แนะนำ)

1. ไปที่ **SQL Editor**
2. Copy SQL จาก `scripts/setup-admin.md` > Step 1
3. **แก้ไข email และ password**
4. Run
5. Copy SQL จาก `scripts/setup-admin.md` > Step 2
6. Run

### Option B: ผ่าน Supabase CLI

```bash
supabase db push
```

---

## 👤 สร้าง Admin User (2 นาที)

### วิธีง่าย: ผ่าน Dashboard

1. **Authentication > Users > Add User**
2. กรอก Email/Password
3. คลิกที่ user ที่สร้าง
4. **Raw User Meta Data** > เพิ่ม:
   ```json
   {"role": "admin"}
   ```
5. Save

### วิธีเร็ว: ผ่าน SQL

ดูใน `scripts/setup-admin.md` > Step 1

---

## 🧪 Testing (5 นาที)

### 1. Start Dev Server

```bash
npm run dev
```

### 2. ทดสอบ Login

- [ ] ไปที่ `http://localhost:3000/admin/login`
- [ ] Login ด้วย admin email/password
- [ ] ควรเข้าไปที่ `/admin/blog`

### 3. ทดสอบสร้างบทความ

- [ ] คลิก "เขียนบทความใหม่"
- [ ] กรอกชื่อ: "ทดสอบระบบ"
- [ ] กรอกเนื้อหา: "นี่คือการทดสอบ"
- [ ] คลิก "บันทึก"
- [ ] ควรเห็นบทความในหน้า list

### 4. ทดสอบ AI Features

- [ ] สร้างบทความใหม่
- [ ] เขียนเนื้อหา 1 ย่อหน้า
- [ ] คลิก "✨ AI Assist"
- [ ] เลือก "ขยายเนื้อหา"
- [ ] คลิก "สร้างด้วย AI"
- [ ] ควรเห็น AI เสนอเนื้อหา

### 5. ทดสอบ Preview

- [ ] เปิด "แสดงตัวอย่าง"
- [ ] ควรเห็น live preview

### 6. ทดสอบ Publish

- [ ] เลือก "เผยแพร่ทันที"
- [ ] บันทึก
- [ ] ไปดูที่หน้าบล็อกหลัก
- [ ] ควรเห็นบทความที่เผยแพร่

---

## 📁 Files Created

```
✅ app/admin/layout.tsx              # Admin layout
✅ app/admin/login/page.tsx          # Login page
✅ app/admin/blog/page.tsx           # Blog list
✅ app/admin/blog/new/page.tsx       # New post
✅ app/admin/blog/[id]/page.tsx      # Edit post
✅ app/api/ai-blog-tools/route.ts    # AI endpoint
✅ components/admin/BlogEditor.tsx   # Editor
✅ components/admin/AIAssistant.tsx  # AI modal
✅ supabase/migrations/20260206_admin_rls_policies.sql
✅ docs/ADMIN_SETUP.md               # คู่มือเต็ม
✅ scripts/setup-admin.md            # SQL scripts
✅ README_CMS.md                     # Quick start
✅ SETUP_CHECKLIST.md                # ไฟล์นี้
✅ env.example                       # Template
```

---

## 🎯 Features Implemented

### ✅ Authentication
- Login/Logout
- Session management
- Protected routes
- Role-based access (admin)

### ✅ Blog Management
- List all posts (published + drafts)
- Create new post
- Edit existing post
- Delete post
- Publish/Unpublish toggle

### ✅ Editor Features
- Title + Slug (auto-generate)
- Excerpt
- Content (textarea)
- Image URL
- Watcher's Insight
- Live Preview
- Save button

### ✅ AI Features (Gemini 2.0 Flash)
- **AI Co-Author**
  - ขยายเนื้อหา
  - คิดจุดหักมุม
  - ปรับโทนลึกลับ
- **Metadata Generator**
  - Auto Slug
  - Auto Excerpt
  - Suggest Tags
- **Watcher's Insight Generator**
  - สร้างข้อความลึกลับ

### ✅ Security
- Row-Level Security (RLS)
- Admin role checking
- Protected API routes
- Environment variables

---

## 🚀 Next Steps (Optional)

### เพิ่ม Rich Text Editor

```bash
npm install react-quill
```

### เพิ่ม Image Upload

```bash
npm install @supabase/storage-js
```

### เพิ่ม Category Management

สร้างหน้า `/admin/categories`

### เพิ่ม Analytics

ติดตั้ง Google Analytics หรือ Plausible

---

## 📚 Documentation

- **Quick Start**: `README_CMS.md`
- **Full Guide**: `docs/ADMIN_SETUP.md`
- **SQL Scripts**: `scripts/setup-admin.md`
- **Troubleshooting**: `docs/ADMIN_SETUP.md` > Troubleshooting

---

## ❓ Common Issues

### "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
➡️ ตรวจสอบ `raw_user_meta_data` ต้องมี `{"role": "admin"}`

### "เกิดข้อผิดพลาดในการบันทึก"
➡️ รัน RLS policies จาก `scripts/setup-admin.md` > Step 2

### "AI request failed"
➡️ ตรวจสอบ `GEMINI_API_KEY` ใน `.env.local`

### บันทึกแล้วแต่ไม่เห็นในหน้าบล็อก
➡️ เลือก "เผยแพร่ทันที" checkbox

---

## ✨ คุณพร้อมแล้ว!

ระบบ CMS พร้อมใช้งาน 100%

**Login ที่:** `http://localhost:3000/admin/login`

---

**Happy Writing! 🌟**

*สร้างโดย: Cosmic Weaver Team*  
*วันที่: 6 ก.พ. 2026*
