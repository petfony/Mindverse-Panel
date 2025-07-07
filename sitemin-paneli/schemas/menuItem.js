export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Menu Adı',
      type: 'string',
      description: 'Arayüzde görünecek olan menü adı. Örn: Hakkımızda, İletişim',
      validation: Rule => Rule.required()
    },
    {
      name: 'href',
      title: 'Link Adresi',
      type: 'string',
      description: 'Tıklandığında gidilecek sayfa. Örn: /hakkimizda, /iletisim',
    },
    {
      name: 'orderRank',
      title: 'Sıralama',
      type: 'number',
      description: 'Menülerin soldan sağa doğru sırası (1, 2, 3...).',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'isActive',
      title: 'Menü Aktif mi?',
      type: 'boolean',
      description: 'Bu menü arayüzde gösterilsin mi?',
      initialValue: true
    },
    {
      name: 'parentMenu',
      title: 'Üst Menü',
      type: 'reference',
      to: [{ type: 'menuItem' }],
      description: 'Eğer bu bir alt menüyse, hangi menünün altında olacağını seç.',
    },
    {
      name: 'hasDropdown',
      title: 'Dropdown Var mı?',
      type: 'boolean',
      description: 'Bu menünün alt menüleri var mı? (Bu alanı işaretlemek, alt menüleri göstermeye yarar)',
      initialValue: false
    },
    // --- GERİ EKLEDİĞİMİZ ALAN ---
    {
      name: 'level',
      title: 'Menü Seviyesi',
      type: 'number',
      description: 'Menünün hiyerarşideki seviyesi (1: Ana, 2: Alt, 3: Alt-Alt...). Genelde otomatik ayarlanır.',
      initialValue: 1,
      validation: Rule => Rule.min(1)
    },
    // --- YENİ SEO ALANLARI ---
    {
      name: 'seo',
      title: 'SEO Bilgileri (Google için)',
      type: 'object',
      description: 'Bu menü linki için arama motoru optimizasyonu. Arayüzde görünmez.',
      options: {
        collapsible: true, // Katlanabilir yapar
        collapsed: true,   // Başlangıçta kapalı gelir
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Başlık',
          type: 'string',
          description: 'Google arama sonuçlarında görünecek başlık (50-60 karakter önerilir).',
          validation: Rule => Rule.max(60).warning('60 karakteri geçmemeye çalışın.')
        },
        {
          name: 'metaDescription',
          title: 'Meta Açıklama',
          type: 'text',
          rows: 3,
          description: 'Google arama sonuçlarında başlığın altında görünecek açıklama (150-160 karakter önerilir).',
          validation: Rule => Rule.max(160).warning('160 karakteri geçmemeye çalışın.')
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      parent: 'parentMenu.name',
      order: 'orderRank'
    },
    prepare({ title, parent, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: parent ? `Üst Menü: ${parent}` : 'Ana Menü'
      }
    }
  }
}