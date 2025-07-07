export default {
  name: 'colorPalette',
  title: '🎨 Site Geneli Renk Paleti',
  type: 'document',
  description: 'Sitedeki TÜM renkleri buradan yönet. Bir rengi burada güncellediğinde, o rengin kullanıldığı her yer otomatik olarak güncellenir.',
  icon: () => '🎨',
  fields: [
    {
      name: 'title',
      title: 'Palet Adı',
      type: 'string',
      description: 'Bu paleti tanımlamak için (örn: "Ana Renk Paleti")',
      validation: Rule => Rule.required()
    },
    {
      name: 'navbarStyles',
      title: 'Navbar Kapsayıcı Stilleri',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'backgroundColor', title: 'Arka Plan Rengi', type: 'string', initialValue: '#ffffff' },
        { name: 'borderColor', title: 'Alt Çizgi Rengi', type: 'string', initialValue: '#EEEEEE' }
      ]
    },
    {
      name: 'logoColor',
      title: 'Logo Yazı Rengi',
      type: 'string',
      description: 'Sadece yazı tipindeki logolar için geçerlidir.',
      initialValue: '#222222'
    },
    {
      name: 'mainMenuLinkStyles',
      title: 'Ana Menü Link Stilleri',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'normal', title: 'Normal Yazı Rengi', type: 'string' },
        { name: 'hover', title: 'Hover Yazı Rengi', type: 'string' },
        { name: 'active', title: 'Aktif Sayfa Yazı Rengi', type: 'string' }
      ],
      initialValue: {
        normal: '#939598',
        hover: '#292728',
        active: '#292728'
      }
    },
    {
      name: 'dropdownStyles',
      title: 'Dropdown Menü Stilleri',
      type: 'array',
      description: 'Her dropdown seviyesi için detaylı renk ayarları.',
      of: [{
        type: 'object', // <-- EKSİK OLAN VE HATAYA SEBEP OLAN KISIM BURASIYDI
        fields: [
          { name: 'level', title: 'Seviye', type: 'number', description: 'Hangi seviye için ayar yapılıyor (1, 2, 3, 4)' },
          { name: 'backgroundColor', title: 'Arka Plan Rengi', type: 'string' },
          { name: 'borderColor', title: 'Eleman Arası Çizgi Rengi', type: 'string', description: 'Opsiyonel, istersen boş bırak.' },
          { name: 'textColorNormal', title: 'Link - Normal Yazı Rengi', type: 'string' },
          { name: 'bgColorHover', title: 'Link - Hover Arka Plan Rengi', type: 'string'},
          { name: 'textColorActive', title: 'Link - Aktif Yazı Rengi', type: 'string', description: 'Bulunulan sayfanın linki için.' },
          { name: 'bgColorActive', title: 'Link - Aktif Arka Plan Rengi', type: 'string', description: 'Bulunulan sayfanın linki için.' }
        ],
        preview: {
          select: { level: 'level', bg: 'backgroundColor', text: 'textColorNormal' },
          prepare({ level, bg, text }) {
            return { title: `Seviye ${level || 'X'} Ayarları`, subtitle: `Arkaplan: ${bg || '...'}, Yazı: ${text || '...'}` }
          }
        }
      }],
      initialValue: [
        { level: 1, backgroundColor: '#292728', borderColor: '#555555', textColorNormal: '#ffffff', bgColorHover: '#939598', textColorActive: '#ffffff', bgColorActive: '#000000' },
        { level: 2, backgroundColor: '#939598', borderColor: '#A9A9A9', textColorNormal: '#ffffff', bgColorHover: '#bcbec0', textColorActive: '#ffffff', bgColorActive: '#292728' },
        { level: 3, backgroundColor: '#bcbec0', borderColor: '#C9C9C9', textColorNormal: '#333333', bgColorHover: '#e6e7e8', textColorActive: '#ffffff', bgColorActive: '#292728' }
      ]
    }
  ]
}