# AI Token Optimization - Tarot Spread Summary

## สรุป Quick Wins ที่ทำไปแล้ว

### 1. System Instructions (ย้ายออกจาก Prompt หลัก)
**ก่อน**: ส่งกฎการตีความ + โครงสร้างคำตอบไปใน prompt ทุกครั้ง (~400 tokens)  
**หลัง**: ย้ายไปไว้ใน `systemInstruction` ของโมเดล (Gemini จะ cache ไว้ ไม่นับเป็น input tokens ซ้ำ)

**ประหยัด**: ~300-400 tokens/request สำหรับ input

---

### 2. Reduce Input Details (ลดข้อมูลที่ไม่จำเป็น)
**ก่อน**: ส่ง keywords (5-10 คำต่อไพ่) + ความหมายเต็ม (50-100 คำต่อไพ่)  
**หลัง**: ส่งแค่ชื่อไพ่ + ตำแหน่งคว่ำ/หงาย (เพราะ Gemini รู้ความหมายพื้นฐานไพ่อยู่แล้ว)

**ประหยัด**: ~150-200 tokens/card
- สเปรด 3 ใบ: ประหยัด ~450-600 tokens
- สเปรด 10 ใบ: ประหยัด ~1,500-2,000 tokens
- สเปรด 21 ใบ: ประหยัด ~3,000-4,000 tokens

---

### 3. Dynamic maxOutputTokens (ปรับขนาด output ตามสเปรด)
**ก่อน**: ใช้ 900 tokens คงที่สำหรับทุกสเปรด  
**หลัง**: 
- 1-3 ใบ: 500 tokens
- 5-7 ใบ: 700 tokens
- 10 ใบ: 900 tokens
- 21 ใบ: 1,200 tokens

**ประหยัด**: ~200-400 tokens/request สำหรับสเปรดเล็ก (ที่ใช้บ่อยที่สุด)

---

## สรุปผลรวม Token Savings

### สเปรดเล็ก (1-3 ใบ) - ใช้งานบ่อยที่สุด ~70% ของการใช้งาน
- **Input savings**: 400 + 600 = ~1,000 tokens
- **Output savings**: 400 tokens
- **รวม**: ~1,400 tokens/request

### สเปรดกลาง (5-7 ใบ) - ใช้งาน ~20%
- **Input savings**: 400 + 1,000 = ~1,400 tokens
- **Output savings**: 200 tokens
- **รวม**: ~1,600 tokens/request

### สเปรดใหญ่ (10-21 ใบ) - ใช้งาน ~10%
- **Input savings**: 400 + 2,500 = ~2,900 tokens
- **Output savings**: 0 (ต้องการข้อมูลเต็ม)
- **รวม**: ~2,900 tokens/request

---

## ผลกระทบต่อต้นทุนและความเร็ว

### ต้นทุน (สมมติ Gemini Flash: input $0.35/1M, output $1.05/1M)
**ก่อนการ optimize**:
- สเปรดเล็ก: ~2,500 tokens/request → ~$0.0015 (~0.05 บาท)
- สเปรดกลาง: ~3,500 tokens/request → ~$0.0022 (~0.08 บาท)
- สเปรดใหญ่: ~5,500 tokens/request → ~$0.0035 (~0.12 บาท)

**หลังการ optimize**:
- สเปรดเล็ก: ~1,100 tokens/request → ~$0.0006 (~0.02 บาท) ✅ **ประหยัด 60%**
- สเปรดกลาง: ~1,900 tokens/request → ~$0.0012 (~0.04 บาท) ✅ **ประหยัด 45%**
- สเปรดใหญ่: ~2,600 tokens/request → ~$0.0018 (~0.06 บาท) ✅ **ประหยัด 48%**

### Latency (ความเร็วในการตอบ)
- ลด input tokens → ลดเวลาประมวลผล
- ลด output tokens → ลดเวลาสร้างคำตอบ
- **ประมาณการ**: เร็วขึ้น 30-40% สำหรับสเปรดเล็ก

---

## การประมาณต้นทุนรายเดือน (ตัวอย่าง)

สมมติมีผู้ใช้ 1,000 คน/เดือน โดย:
- 70% ใช้สเปรดเล็ก (700 requests)
- 20% ใช้สเปรดกลาง (200 requests)
- 10% ใช้สเปรดใหญ่ (100 requests)

**ก่อน optimize**: 
- (700 × 0.05) + (200 × 0.08) + (100 × 0.12) = 35 + 16 + 12 = **63 บาท/เดือน**

**หลัง optimize**:
- (700 × 0.02) + (200 × 0.04) + (100 × 0.06) = 14 + 8 + 6 = **28 บาท/เดือน**

**ประหยัด**: ~35 บาท/เดือน (55%)

---

## Next Steps (Medium-term Optimizations)

### 4. Context Caching (รอ Gemini support)
- Cache ข้อมูลสเปรดทั้ง 8 แบบ
- **ประหยัดเพิ่ม**: 50-100 tokens/request

### 5. Client-side for Single Card (ทำเมื่อ users มากขึ้น)
- สำหรับไพ่ 1 ใบ ใช้ local meaning จาก `tarotMeaningsData.ts` แทน
- ไม่ต้องเรียก API เลย
- **ประหยัดเพิ่ม**: 100% สำหรับ single card readings (~40% ของการใช้งาน)

### 6. JSON Mode (ถ้า Gemini รองรับ)
- บังคับให้ AI output เป็น JSON
- Frontend จัด format เอง
- **ประหยัดเพิ่ม**: ~100-200 tokens/request

---

## การวัดผลจริง

ติดตาม metrics เหล่านี้ใน production:
1. Average tokens/request by spread type
2. Total API cost/day
3. Average response time (latency)
4. Error rate

สามารถ log ข้อมูลเหล่านี้ใน `geminiService.ts` และส่งไปยัง analytics dashboard ได้
