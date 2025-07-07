export default {
  name: 'navbarSettings',
  title: '⚙️ Navbar Ayarları',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    {
      name: 'title',
      title: 'Ayar Adı',
      type: 'string',
      description: 'Bu ayarları tanımlamak için (örn: "Ana Navbar Ayarları")',
      validation: Rule => Rule.required()
    },
    // Görünüm ve Boyutlandırma
    {
      name: 'navbarHeight',
      title: 'Navbar Yüksekliği (px)',
      type: 'number',
      description: 'Navbar\'ın yüksekliği. Logo boyutu da buna göre otomatik ayarlanacak. (Min: 70, Max: 120)',
      initialValue: 94,
      validation: Rule => Rule.min(70).max(120)
    },
    {
      name: 'isTransparent',
      title: 'Şeffaf Arka Plan',
      type: 'boolean',
      description: 'Navbar arka planı şeffaf olsun mu?',
      initialValue: false
    },
    {
      name: 'transparencyLevel',
      title: 'Şeffaflık Seviyesi (%)',
      type: 'number',
      description: '0 = Tam şeffaf, 100 = Tam opak',
      initialValue: 90,
      validation: Rule => Rule.min(0).max(100),
      hidden: ({document}) => !document?.isTransparent
    },
    // Logo Ayarları
    {
      name: 'logoType',
      title: 'Logo Türü',
      type: 'string',
      options: { list: [{title: '📝 Yazı', value: 'text'}, {title: '🖼️ Resim', value: 'image'}] },
      initialValue: 'text',
    },
    {
      name: 'logoText',
      title: 'Logo Metni',
      type: 'string',
      initialValue: 'Prof. Dr. Sultan Doğan',
      hidden: ({document}) => document?.logoType !== 'text'
    },
    {
      name: 'logoImage',
      title: 'Logo Resmi',
      type: 'image',
      hidden: ({document}) => document?.logoType !== 'image'
    },
    {
      name: 'logoHeightPercentage',
      title: 'Logo Yüksekliği (Navbar\'a Oranı %)',
      type: 'number',
      description: 'Logo, navbar yüksekliğinin yüzde kaçını kaplasın? Örn: 50. Bu sayede navbar büyüyünce logo da büyür.',
      initialValue: 50,
      validation: Rule => Rule.min(10).max(90)
    },
    {
      name: 'logoLink',
      title: 'Logo Linki',
      type: 'string',
      initialValue: '/'
    },
  ],
  preview: {
    select: { title: 'title', height: 'navbarHeight' },
    prepare({title, height}) {
      return { title: title || 'Navbar Ayarları', subtitle: `Yükseklik: ${height || '...'}px` }
    }
  }
}