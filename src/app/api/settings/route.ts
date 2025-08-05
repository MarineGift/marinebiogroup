import { NextRequest, NextResponse } from 'next/server'

// 임시 데이터 저장소 (실제로는 데이터베이스 사용)
let settings = {
  siteTitle: 'KICT Group',
  siteDescription: '혁신적인 ICT 솔루션으로 미래를 선도합니다',
  contactPhone: '+1 (703) 123-4567',
  contactEmail: 'contact@kictgroup.com',
  address: '1952 Gallows Rd, Vienna, VA 22182, United States',
  businessHours: '월-금 09:00-18:00 (토,일,공휴일 휴무)',
  socialMedia: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  },
  seo: {
    metaTitle: 'KICT Group - 혁신적인 ICT 솔루션',
    metaDescription: '첨단 기술과 창의적 사고로 고객의 성공을 위한 최적의 ICT 솔루션을 제공합니다.',
    metaKeywords: 'ICT, 시스템개발, IT컨설팅, 클라우드, 웹개발, 모바일앱'
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromName: 'KICT Group',
    fromEmail: 'contact@kictgroup.com'
  },
  maintenance: {
    isEnabled: false,
    message: '시스템 점검 중입니다. 잠시 후 다시 시도해주세요.',
    startTime: null,
    endTime: null
  },
  analytics: {
    googleAnalyticsId: '',
    facebookPixelId: '',
    isEnabled: false
  },
  updatedAt: '2025-01-01T00:00:00.000Z'
}

// GET: 설정 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    if (section) {
      // 특정 섹션만 반환
      const sectionData = settings[section as keyof typeof settings]
      if (sectionData === undefined) {
        return NextResponse.json(
          { success: false, message: '요청한 설정 섹션을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        section,
        settings: sectionData
      })
    }

    // 전체 설정 반환
    return NextResponse.json({
      success: true,
      settings
    })
  } catch (error) {
    console.error('GET /api/settings error:', error)
    return NextResponse.json(
      { success: false, message: '설정을 가져오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 설정 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, ...updates } = body

    if (section) {
      // 특정 섹션 업데이트
      if (settings[section as keyof typeof settings] === undefined) {
        return NextResponse.json(
          { success: false, message: '요청한 설정 섹션을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }

      // Object.assign을 사용하여 안전하게 업데이트
      const currentSectionData = settings[section as keyof typeof settings]
      const updatedSectionData = Object.assign(
        {},
        typeof currentSectionData === 'object' && currentSectionData !== null ? currentSectionData : {},
        updates
      )

      settings = {
        ...settings,
        [section]: updatedSectionData,
        updatedAt: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        section,
        settings: settings[section as keyof typeof settings],
        message: `${section} 설정이 업데이트되었습니다.`
      })
    }

    // 전체 설정 업데이트 (섹션별로 병합)
    const allowedUpdates = [
      'siteTitle',
      'siteDescription', 
      'contactPhone',
      'contactEmail',
      'address',
      'businessHours'
    ]

    const filteredUpdates: Partial<typeof settings> = {}
    allowedUpdates.forEach(key => {
      if (updates[key] !== undefined) {
        filteredUpdates[key as keyof typeof settings] = updates[key]
      }
    })

    // 중첩 객체 업데이트
    if (updates.socialMedia) {
      filteredUpdates.socialMedia = {
        ...settings.socialMedia,
        ...updates.socialMedia
      }
    }

    if (updates.seo) {
      filteredUpdates.seo = {
        ...settings.seo,
        ...updates.seo
      }
    }

    if (updates.email) {
      filteredUpdates.email = {
        ...settings.email,
        ...updates.email
      }
    }

    if (updates.maintenance) {
      filteredUpdates.maintenance = {
        ...settings.maintenance,
        ...updates.maintenance
      }
    }

    if (updates.analytics) {
      filteredUpdates.analytics = {
        ...settings.analytics,
        ...updates.analytics
      }
    }

    settings = {
      ...settings,
      ...filteredUpdates,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      settings,
      message: '설정이 업데이트되었습니다.'
    })
  } catch (error) {
    console.error('PUT /api/settings error:', error)
    return NextResponse.json(
      { success: false, message: '설정 업데이트에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 설정 초기화 또는 백업
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, backupData } = body

    switch (action) {
      case 'reset':
        // 기본 설정으로 초기화
        const defaultSettings = {
          siteTitle: 'KICT Group',
          siteDescription: '혁신적인 ICT 솔루션으로 미래를 선도합니다',
          contactPhone: '+1 (703) 123-4567',
          contactEmail: 'contact@kictgroup.com',
          address: '1952 Gallows Rd, Vienna, VA 22182, United States',
          businessHours: '월-금 09:00-18:00 (토,일,공휴일 휴무)',
          socialMedia: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
          },
          seo: {
            metaTitle: 'KICT Group - 혁신적인 ICT 솔루션',
            metaDescription: '첨단 기술과 창의적 사고로 고객의 성공을 위한 최적의 ICT 솔루션을 제공합니다.',
            metaKeywords: 'ICT, 시스템개발, IT컨설팅, 클라우드, 웹개발, 모바일앱'
          },
          email: {
            smtpHost: 'smtp.gmail.com',
            smtpPort: 587,
            smtpUser: '',
            smtpPassword: '',
            fromName: 'KICT Group',
            fromEmail: 'contact@kictgroup.com'
          },
          maintenance: {
            isEnabled: false,
            message: '시스템 점검 중입니다. 잠시 후 다시 시도해주세요.',
            startTime: null,
            endTime: null
          },
          analytics: {
            googleAnalyticsId: '',
            facebookPixelId: '',
            isEnabled: false
          },
          updatedAt: new Date().toISOString()
        }
        
        settings = defaultSettings
        
        return NextResponse.json({
          success: true,
          settings,
          message: '설정이 기본값으로 초기화되었습니다.'
        })

      case 'backup':
        // 현재 설정 백업 반환
        return NextResponse.json({
          success: true,
          backup: {
            ...settings,
            backupDate: new Date().toISOString()
          },
          message: '설정 백업이 생성되었습니다.'
        })

      case 'restore':
        // 백업 데이터로 복원
        if (!backupData) {
          return NextResponse.json(
            { success: false, message: '복원할 백업 데이터가 없습니다.' },
            { status: 400 }
          )
        }

        const { backupDate, ...restoreData } = backupData
        settings = {
          ...restoreData,
          updatedAt: new Date().toISOString()
        }

        return NextResponse.json({
          success: true,
          settings,
          message: `설정이 ${backupDate ? new Date(backupDate).toLocaleString('ko-KR') : '백업 데이터'}로 복원되었습니다.`
        })

      default:
        return NextResponse.json(
          { success: false, message: '지원하지 않는 액션입니다.' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('POST /api/settings error:', error)
    return NextResponse.json(
      { success: false, message: '설정 작업에 실패했습니다.' },
      { status: 500 }
    )
  }
}