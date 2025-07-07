import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { client } from '../lib/sanityClient'; // Sanity client import'unuzu varsayıyorum

// --- YARDIMCI FONKSİYONLAR ---

// 1. Düz listeyi iç içe ağaç yapısına çevirir.
const buildMenuTree = (items, parentId = null) => {
  const tree = [];
  const children = items
    .filter(item => (item.parentMenu?._ref || null) === parentId)
    .sort((a, b) => a.orderRank - b.orderRank);

  if (children.length > 0) {
    children.forEach(child => {
      tree.push({
        ...child,
        children: buildMenuTree(items, child._id),
      });
    });
  }
  return tree;
};

// 2. Girintili menü elemanlarını çizen recursive bileşen (Kademeli açılma mantığıyla)
const IndentedMenuItem = ({ item, level = 0, closeMenu }) => {
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Her menünün kendi açık/kapalı durumu
  const hasChildren = item.children && item.children.length > 0;

  // Anlaştığımız renk paleti, elle yazılmış hali.
  const levelStyles = [
    { bg: 'bg-[#292728]', text: 'text-white', hover: 'hover:bg-[#403E3F]' }, // Seviye 0
    { bg: 'bg-[#939598]', text: 'text-black', hover: 'hover:bg-[#A9ABAE]' }, // Seviye 1
    { bg: 'bg-[#bcbec0]', text: 'text-black', hover: 'hover:bg-[#D1D2D4]' }, // Seviye 2
    { bg: 'bg-[#e6e7e8]', text: 'text-black', hover: 'hover:bg-[#F0F1F2]' }, // Seviye 3
  ];
  
  const currentStyle = levelStyles[level] || levelStyles[levelStyles.length - 1];

  const style = {
    paddingLeft: `${1 + (level * 1)}rem`,
    paddingRight: '1rem',
    fontSize: level === 0 ? '0.875rem' : '0.8rem',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
  };

  const handleLinkClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      return;
    }
    if (item.href) {
      router.push(item.href);
    }
    closeMenu();
  };

  const handleToggleSubMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <React.Fragment>
      <a
        href={item.href || '#'}
        onClick={handleLinkClick}
        className={`flex justify-between items-center font-medium transition-colors duration-200 cursor-pointer ${currentStyle.bg} ${currentStyle.text} ${currentStyle.hover}`}
        style={style}
      >
        <span className="flex-1 pr-2">{item.name}</span>
        {hasChildren && (
          <span className="p-2 -mr-2" onClick={handleToggleSubMenu}>
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" className={`transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`}>
              <path d="M1 1L4 3L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </a>
      {hasChildren && isSubMenuOpen && item.children.map(child => (
        <IndentedMenuItem key={child._id} item={child} level={level + 1} closeMenu={closeMenu} />
      ))}
    </React.Fragment>
  );
};


// --- ANA NAVBAR BİLEŞENİ ---
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTree, setMenuTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-menu-container]')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sadece menüleri çeken, sade effect
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const menuItems = await client.fetch(`*[_type == "menuItem" && isActive == true] | order(orderRank asc)`);
        setMenuTree(buildMenuTree(menuItems || []));
      } catch (err) {
        console.error("Navbar menüleri çekilirken hata:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);
  
  const handleDropdownToggle = (menuId) => {
    setOpenDropdown(current => (current === menuId ? null : menuId));
  };
  
  return (
    <div className="relative font-['Manrope']">
      <nav className={`h-[94px] px-4 lg:px-24 bg-white flex items-center justify-between sticky top-0 z-50 transition-shadow duration-300 border-b border-[#EEEEEE] ${scrolled ? 'shadow-md' : ''}`}>
        <div>
          <h1 className="text-2xl font-semibold text-[#222222]">
            Prof. Dr. Sultan Doğan
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-x-10">
          {loading ? <p>Yükleniyor...</p> : error ? <p>Hata.</p> : menuTree.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = router.pathname === item.href;
            const isDropdownOpen = openDropdown === item._id;

            return (
              <div 
                key={item._id} 
                className="relative" 
                data-menu-container
              >
                <div
                  className={`py-2 text-base transition-colors duration-200 flex items-center gap-1 cursor-pointer ${isActive || isDropdownOpen ? "!text-[#222222] !font-semibold" : "!text-[#6C6C6C] !font-normal"} hover:!text-[#222222]`}
                  onClick={() => hasChildren ? handleDropdownToggle(item._id) : (item.href && router.push(item.href))}
                >
                  <span>{item.name}</span>
                  {hasChildren && (
                    <span className="text-xs ml-1 mt-1 leading-none">
                      <svg width="8" height="4" viewBox="0 0 8 4" fill="none" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                        <path d="M1 1L4 3L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>

                {hasChildren && isDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                     <div className="bg-white shadow-xl rounded-md w-64 overflow-hidden">
                       {item.children.map(child => (
                         <IndentedMenuItem key={child._id} item={child} level={0} closeMenu={() => setOpenDropdown(null)} />
                       ))}
                     </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-2xl">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
    </div>
  );
}
