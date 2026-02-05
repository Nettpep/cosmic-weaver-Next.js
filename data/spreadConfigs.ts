import { SpreadConfig } from '@/types/tarot';

export const spreadConfigs: Record<string, SpreadConfig> = {
    single: {
        type: 'single',
        name: 'Daily Reading',
        nameThai: 'ดูดวงรายวัน',
        description: 'Draw a single card for daily guidance and insight',
        descriptionThai: 'จั่วไพ่ 1 ใบเพื่อรับคำแนะนำและข้อมูลเชิงลึกสำหรับวันนี้',
        cardCount: 1,
        difficulty: 'beginner',
        icon: '🌅',
        positions: [
            {
                index: 0,
                label: 'Today\'s Message',
                labelThai: 'ข้อความวันนี้',
                description: 'What energy or guidance do you need today?',
                x: 50,
                y: 50
            }
        ]
    },

    'two-choices': {
        type: 'two-choices',
        name: 'Two Choices',
        nameThai: 'สองทางเลือก',
        description: 'Compare two options or perspectives',
        descriptionThai: 'เปรียบเทียบสองทางเลือกหรือมุมมอง',
        cardCount: 2,
        difficulty: 'beginner',
        icon: '⚖️',
        positions: [
            {
                index: 0,
                label: 'Option A',
                labelThai: 'ทางเลือก A',
                description: 'The first path or perspective',
                x: 35,
                y: 50
            },
            {
                index: 1,
                label: 'Option B',
                labelThai: 'ทางเลือก B',
                description: 'The second path or perspective',
                x: 65,
                y: 50
            }
        ]
    },

    'past-present-future': {
        type: 'past-present-future',
        name: 'Past-Present-Future',
        nameThai: 'อดีต-ปัจจุบัน-อนาคต',
        description: 'See how past influences lead to current situation and future outcome',
        descriptionThai: 'ดูว่าอดีตมีผลต่อสถานการณ์ปัจจุบันและผลลัพธ์ในอนาคตอย่างไร',
        cardCount: 3,
        difficulty: 'beginner',
        icon: '⏳',
        positions: [
            {
                index: 0,
                label: 'Past',
                labelThai: 'อดีต',
                description: 'Past influences and foundations',
                x: 25,
                y: 50
            },
            {
                index: 1,
                label: 'Present',
                labelThai: 'ปัจจุบัน',
                description: 'Current situation and energy',
                x: 50,
                y: 50
            },
            {
                index: 2,
                label: 'Future',
                labelThai: 'อนาคต',
                description: 'Likely outcome and direction',
                x: 75,
                y: 50
            }
        ]
    },

    'situation-challenge-advice': {
        type: 'situation-challenge-advice',
        name: 'Situation-Challenge-Advice',
        nameThai: 'สถานการณ์-ความท้าทาย-คำแนะนำ',
        description: 'Understand your situation, identify challenges, and receive guidance',
        descriptionThai: 'เข้าใจสถานการณ์ ระบุความท้าทาย และรับคำแนะนำ',
        cardCount: 3,
        difficulty: 'beginner',
        icon: '🎯',
        positions: [
            {
                index: 0,
                label: 'Situation',
                labelThai: 'สถานการณ์',
                description: 'The current situation',
                x: 25,
                y: 50
            },
            {
                index: 1,
                label: 'Challenge',
                labelThai: 'ความท้าทาย',
                description: 'The obstacle or challenge',
                x: 50,
                y: 50
            },
            {
                index: 2,
                label: 'Advice',
                labelThai: 'คำแนะนำ',
                description: 'Guidance and recommended action',
                x: 75,
                y: 50
            }
        ]
    },

    horseshoe: {
        type: 'horseshoe',
        name: 'Horseshoe Spread',
        nameThai: 'เกือกม้า',
        description: 'A comprehensive 5-card spread for deeper insight',
        descriptionThai: 'การดูดวง 5 ใบแบบครอบคลุมเพื่อข้อมูลเชิงลึก',
        cardCount: 5,
        difficulty: 'intermediate',
        icon: '🔮',
        positions: [
            {
                index: 0,
                label: 'Past',
                labelThai: 'อดีต',
                description: 'Past influences',
                x: 20,
                y: 70
            },
            {
                index: 1,
                label: 'Present',
                labelThai: 'ปัจจุบัน',
                description: 'Current situation',
                x: 35,
                y: 40
            },
            {
                index: 2,
                label: 'Hidden Influences',
                labelThai: 'อิทธิพลที่ซ่อนอยู่',
                description: 'Unseen factors',
                x: 50,
                y: 30
            },
            {
                index: 3,
                label: 'Advice',
                labelThai: 'คำแนะนำ',
                description: 'Recommended approach',
                x: 65,
                y: 40
            },
            {
                index: 4,
                label: 'Outcome',
                labelThai: 'ผลลัพธ์',
                description: 'Likely outcome',
                x: 80,
                y: 70
            }
        ]
    },

    chakra: {
        type: 'chakra',
        name: 'Seven Chakras',
        nameThai: 'เจ็ดจักระ',
        description: 'Check the energy balance of your seven chakras',
        descriptionThai: 'ตรวจสอบความสมดุลพลังงานของเจ็ดจักระ',
        cardCount: 7,
        difficulty: 'intermediate',
        icon: '🧘',
        positions: [
            {
                index: 0,
                label: 'Root Chakra',
                labelThai: 'จักระฐาน (มูลาธาร)',
                description: 'Foundation, security, survival',
                x: 50,
                y: 90
            },
            {
                index: 1,
                label: 'Sacral Chakra',
                labelThai: 'จักระอุทร (สวาธิษฐาน)',
                description: 'Creativity, sexuality, emotions',
                x: 50,
                y: 75
            },
            {
                index: 2,
                label: 'Solar Plexus',
                labelThai: 'จักระสุริยะ (มณีปุระ)',
                description: 'Personal power, confidence',
                x: 50,
                y: 60
            },
            {
                index: 3,
                label: 'Heart Chakra',
                labelThai: 'จักระหัวใจ (อนาหตะ)',
                description: 'Love, compassion, connection',
                x: 50,
                y: 45
            },
            {
                index: 4,
                label: 'Throat Chakra',
                labelThai: 'จักระลำคอ (วิสุทธิ)',
                description: 'Communication, truth, expression',
                x: 50,
                y: 30
            },
            {
                index: 5,
                label: 'Third Eye',
                labelThai: 'จักระจิกนา (อัชนา)',
                description: 'Intuition, insight, wisdom',
                x: 50,
                y: 15
            },
            {
                index: 6,
                label: 'Crown Chakra',
                labelThai: 'จักระมงกุฏ (สหัสรารา)',
                description: 'Spirituality, consciousness, enlightenment',
                x: 50,
                y: 5
            }
        ]
    },

    'celtic-cross': {
        type: 'celtic-cross',
        name: 'Celtic Cross',
        nameThai: 'ไม้กางเขนเซลติก',
        description: 'The most comprehensive traditional spread',
        descriptionThai: 'การดูดวงแบบครอบคลุมที่สุดแบบดั้งเดิม',
        cardCount: 10,
        difficulty: 'advanced',
        icon: '✨',
        positions: [
            {
                index: 0,
                label: 'Present',
                labelThai: 'ปัจจุบัน',
                description: 'Current situation',
                x: 40,
                y: 50
            },
            {
                index: 1,
                label: 'Challenge',
                labelThai: 'ความท้าทาย',
                description: 'Immediate challenge or crossing influence',
                x: 40,
                y: 50,
                rotation: 90
            },
            {
                index: 2,
                label: 'Foundation',
                labelThai: 'รากฐาน',
                description: 'Basis of the situation',
                x: 40,
                y: 70
            },
            {
                index: 3,
                label: 'Recent Past',
                labelThai: 'อดีตที่ผ่านมา',
                description: 'Recent events',
                x: 20,
                y: 50
            },
            {
                index: 4,
                label: 'Possible Future',
                labelThai: 'อนาคตที่เป็นไปได้',
                description: 'Best possible outcome',
                x: 40,
                y: 30
            },
            {
                index: 5,
                label: 'Near Future',
                labelThai: 'อนาคตใกล้',
                description: 'What\'s coming soon',
                x: 60,
                y: 50
            },
            {
                index: 6,
                label: 'Self',
                labelThai: 'ตัวคุณ',
                description: 'Your attitude and approach',
                x: 75,
                y: 85
            },
            {
                index: 7,
                label: 'Environment',
                labelThai: 'สิ่งแวดล้อม',
                description: 'External influences',
                x: 75,
                y: 65
            },
            {
                index: 8,
                label: 'Hopes/Fears',
                labelThai: 'ความหวัง/ความกลัว',
                description: 'Inner emotions',
                x: 75,
                y: 45
            },
            {
                index: 9,
                label: 'Outcome',
                labelThai: 'ผลลัพธ์',
                description: 'Final outcome',
                x: 75,
                y: 25
            }
        ]
    },

    astrological: {
        type: 'astrological',
        name: 'Astrological Spread',
        nameThai: 'โหราศาสตร์',
        description: 'A comprehensive spread based on the 12 houses of astrology',
        descriptionThai: 'การดูดวงแบบครอบคลุมตามบ้าน 12 หลังของโหราศาสตร์',
        cardCount: 21,
        difficulty: 'advanced',
        icon: '♈',
        positions: [
            // Center card
            {
                index: 0,
                label: 'Querent (Center)',
                labelThai: 'ผู้ถาม (ศูนย์กลาง)',
                description: 'The essence of you',
                x: 50,
                y: 50
            },
            // 12 houses in a circle
            {
                index: 1,
                label: '1st House - Self',
                labelThai: 'บ้านที่ 1 - ตัวตน',
                description: 'Identity, appearance, first impressions',
                x: 75,
                y: 50
            },
            {
                index: 2,
                label: '2nd House - Possessions',
                labelThai: 'บ้านที่ 2 - ทรัพย์สิน',
                description: 'Money, values, resources',
                x: 73,
                y: 65
            },
            {
                index: 3,
                label: '3rd House - Communication',
                labelThai: 'บ้านที่ 3 - การสื่อสาร',
                description: 'Communication, siblings, short trips',
                x: 65,
                y: 73
            },
            {
                index: 4,
                label: '4th House - Home',
                labelThai: 'บ้านที่ 4 - บ้าน',
                description: 'Home, family, roots',
                x: 50,
                y: 75
            },
            {
                index: 5,
                label: '5th House - Creativity',
                labelThai: 'บ้านที่ 5 - ความคิดสร้างสรรค์',
                description: 'Creativity, romance, children',
                x: 35,
                y: 73
            },
            {
                index: 6,
                label: '6th House - Health',
                labelThai: 'บ้านที่ 6 - สุขภาพ',
                description: 'Health, work, daily routines',
                x: 27,
                y: 65
            },
            {
                index: 7,
                label: '7th House - Partnerships',
                labelThai: 'บ้านที่ 7 - ความสัมพันธ์',
                description: 'Partnerships, marriage, contracts',
                x: 25,
                y: 50
            },
            {
                index: 8,
                label: '8th House - Transformation',
                labelThai: 'บ้านที่ 8 - การเปลี่ยนแปลง',
                description: 'Transformation, shared resources, mysteries',
                x: 27,
                y: 35
            },
            {
                index: 9,
                label: '9th House - Philosophy',
                labelThai: 'บ้านที่ 9 - ปรัชญา',
                description: 'Philosophy, travel, higher learning',
                x: 35,
                y: 27
            },
            {
                index: 10,
                label: '10th House - Career',
                labelThai: 'บ้านที่ 10 - อาชีพ',
                description: 'Career, public image, ambitions',
                x: 50,
                y: 25
            },
            {
                index: 11,
                label: '11th House - Community',
                labelThai: 'บ้านที่ 11 - ชุมชน',
                description: 'Friends, groups, aspirations',
                x: 65,
                y: 27
            },
            {
                index: 12,
                label: '12th House - Subconscious',
                labelThai: 'บ้านที่ 12 - จิตใต้สำนึก',
                description: 'Subconscious, spirituality, hidden enemies',
                x: 73,
                y: 35
            },
            // 8 additional significator cards
            {
                index: 13,
                label: 'Sun - Vitality',
                labelThai: 'ดวงอาทิตย์ - พลัง',
                description: 'Core vitality and life force',
                x: 85,
                y: 50
            },
            {
                index: 14,
                label: 'Moon - Emotions',
                labelThai: 'ดวงจันทร์ - อารมณ์',
                description: 'Emotional state',
                x: 15,
                y: 50
            },
            {
                index: 15,
                label: 'Mercury - Mind',
                labelThai: 'ดาวพุธ - จิตใจ',
                description: 'Mental processes',
                x: 50,
                y: 15
            },
            {
                index: 16,
                label: 'Venus - Love',
                labelThai: 'ดาวศุกร์ - ความรัก',
                description: 'Love and relationships',
                x: 50,
                y: 85
            },
            {
                index: 17,
                label: 'Mars - Action',
                labelThai: 'ดาวอังคาร - การกระทำ',
                description: 'Drive and action',
                x: 80,
                y: 30
            },
            {
                index: 18,
                label: 'Jupiter - Expansion',
                labelThai: 'ดาวพฤหัส - การขยาย',
                description: 'Growth and expansion',
                x: 20,
                y: 30
            },
            {
                index: 19,
                label: 'Saturn - Structure',
                labelThai: 'ดาวเสาร์ - โครงสร้าง',
                description: 'Limitations and structure',
                x: 80,
                y: 70
            },
            {
                index: 20,
                label: 'Spirit - Guidance',
                labelThai: 'จิตวิญญาณ - คำแนะนำ',
                description: 'Spiritual guidance',
                x: 20,
                y: 70
            }
        ]
    }
};

export const spreadsList = Object.values(spreadConfigs);

export default spreadConfigs;
