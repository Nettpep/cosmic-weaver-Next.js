# 🚀 Quick Admin Setup Script

## สำหรับ Supabase SQL Editor

### Step 1: สร้าง Admin User

```sql
-- แก้ไข email และ password ตรงนี้
DO $$
DECLARE
  admin_email TEXT := 'admin@cosmicweaver.com'; -- เปลี่ยนตรงนี้
  admin_password TEXT := 'YourStrongPassword123!'; -- เปลี่ยนตรงนี้
BEGIN
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    jsonb_build_object('role', 'admin'),
    now(),
    now(),
    '',
    '',
    '',
    ''
  );
  
  RAISE NOTICE 'Admin user created: %', admin_email;
END $$;
```

### Step 2: Enable RLS Policies

```sql
-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can view published posts
CREATE POLICY "Public can view published posts"
ON blog_posts FOR SELECT
USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins can do everything"
ON blog_posts FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories"
ON categories FOR SELECT
USING (true);

CREATE POLICY "Admins can modify categories"
ON categories FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Enable RLS on tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view tags"
ON tags FOR SELECT
USING (true);

CREATE POLICY "Admins can modify tags"
ON tags FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Enable RLS on blog_post_tags
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view post tags"
ON blog_post_tags FOR SELECT
USING (true);

CREATE POLICY "Admins can modify post tags"
ON blog_post_tags FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);
```

### Step 3: Verify Setup

```sql
-- ตรวจสอบว่า admin user ถูกสร้างแล้ว
SELECT 
  email, 
  raw_user_meta_data->>'role' as role,
  created_at
FROM auth.users
WHERE raw_user_meta_data->>'role' = 'admin';

-- ตรวจสอบ RLS policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

---

## 🎯 หลังรัน SQL แล้ว

1. ไปที่ `http://localhost:3000/admin/login`
2. Login ด้วย email/password ที่ตั้งไว้
3. เริ่มเขียนบทความได้เลย!

---

## 🔧 Troubleshooting

### ถ้า Login ไม่ได้

```sql
-- ตรวจสอบ user
SELECT * FROM auth.users WHERE email = 'admin@cosmicweaver.com';

-- ลบ user เก่า (ถ้าต้องการเริ่มใหม่)
DELETE FROM auth.users WHERE email = 'admin@cosmicweaver.com';

-- สร้างใหม่ด้วย script ด้านบน
```

### ถ้าบันทึกบทความไม่ได้

```sql
-- ตรวจสอบว่า RLS เปิดอยู่
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'blog_posts';

-- ถ้า rowsecurity = false ให้รัน:
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
```

### ถ้าต้องการเพิ่ม admin อีกคน

```sql
-- เปลี่ยน email และ password
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'another.admin@example.com', -- เปลี่ยนตรงนี้
  crypt('AnotherPassword123!', gen_salt('bf')), -- เปลี่ยนตรงนี้
  now(),
  jsonb_build_object('role', 'admin'),
  now(),
  now(),
  '', '', '', ''
);
```

---

## ✅ Checklist

- [ ] รัน SQL สร้าง Admin User
- [ ] รัน SQL Enable RLS
- [ ] รัน SQL Verify Setup
- [ ] ตั้งค่า `GEMINI_API_KEY` ใน `.env.local`
- [ ] ทดสอบ Login ที่ `/admin/login`
- [ ] ทดสอบสร้างบทความ
- [ ] ทดสอบ AI Features

---

**เสร็จแล้ว! 🎉**
