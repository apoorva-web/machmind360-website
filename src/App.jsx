import { useState } from 'react'
import './App.css'

const menuItems = [
  { id: 1, name: 'Mavalli Special Biryani', category: 'Biryani', price: 220, note: 'Signature · serves 1', mark: 'MB', tone: 'saffron' },
  { id: 2, name: 'Chicken Dum Biryani', category: 'Biryani', price: 180, note: 'Slow-cooked · serves 1', mark: 'CD', tone: 'brick' },
  { id: 3, name: 'Veg Biryani', category: 'Biryani', price: 140, note: 'Garden fresh · serves 1', mark: 'VB', tone: 'sage' },
  { id: 4, name: 'Chicken Kabab', category: 'Sides', price: 160, note: 'House marinade · 4 pcs', mark: 'CK', tone: 'clay' },
  { id: 5, name: 'Paneer Tikka', category: 'Sides', price: 150, note: 'Chargrilled · 6 pcs', mark: 'PT', tone: 'gold' },
  { id: 6, name: 'Masala Buttermilk', category: 'Drinks', price: 35, note: 'Chilled · 250 ml', mark: 'MB', tone: 'mint' },
]

const features = [
  { icon: 'receipt', title: 'Billing, without the bottleneck', text: 'Build accurate bills in seconds, apply discounts, and keep every payment accounted for.' },
  { icon: 'boxes', title: 'Know what is in stock', text: 'Keep ingredients and menu availability in view before a busy service catches you off guard.' },
  { icon: 'table', title: 'A clearer view of every table', text: 'See what is open, occupied, or ready to turn at a glance. Move service along smoothly.' },
  { icon: 'orders', title: 'Orders that reach the right place', text: 'Keep dine-in and takeaway orders organised from the first tap to the last plate.' },
  { icon: 'chart', title: 'Reports that make sense', text: 'Turn daily sales and item performance into a simple picture of how your restaurant is doing.' },
  { icon: 'clock', title: 'Made for the pace of service', text: 'A straightforward workflow helps your team spend less time figuring out software.' },
]

const categories = ['All items', 'Biryani', 'Sides', 'Drinks']

function Icon({ name, size = 20 }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.7,
  }

  const drawings = {
    sparkles: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    receipt: <><path d="M5 3.5h14v18l-3-2-4 2-4-2-3 2v-18Z" /><path d="M8.5 8h7M8.5 12h7M8.5 16h3.5" /></>,
    boxes: <><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5v9l8 4.5 8-4.5v-9M12 12v9" /><path d="m8 5.2 8 4.6" /></>,
    table: <><path d="M4 6h16M6 6v5h12V6M7 11v9m10-9v9M4 20h16" /><path d="M9 8.5h.01M15 8.5h.01" /></>,
    orders: <><path d="M7 4h13v17H7zM4 7H3v14h13v-1" /><path d="M10 9h7M10 13h7M10 17h4" /><path d="m10 5 1.5-2h3L16 5" /></>,
    chart: <><path d="M4 19V5m0 14h17" /><path d="m7 15 4-4 3 2 6-7" /><path d="M16 6h4v4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...common}>
      {drawings[name] || drawings.sparkles}
    </svg>
  )
}

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="#home" aria-label="MachMind360 home">
      <span className="brand-wordmark">MachMind<span>360</span></span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, copy, light = false, align = 'center' }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''} align-${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function HeroDashboard() {
  return (
    <div className="dashboard-wrap" aria-label="Illustration of the MachMind360 restaurant POS dashboard">
      <div className="dashboard-glow" />
      <div className="dashboard-window">
        <div className="dashboard-topbar">
          <div className="window-dots"><i /><i /><i /></div>
          <span className="dashboard-brand">MachMind<span>360</span></span>
          <span className="dashboard-live"><i /> SAMPLE DASHBOARD</span>
        </div>
        <div className="dashboard-body">
          <aside className="dashboard-sidebar">
            <span className="side-icon side-active"><Icon name="chart" size={17} /></span>
            <span className="side-icon"><Icon name="receipt" size={17} /></span>
            <span className="side-icon"><Icon name="table" size={17} /></span>
            <span className="side-icon"><Icon name="boxes" size={17} /></span>
          </aside>
          <div className="dashboard-main">
            <div className="dash-title-row">
              <div><small>SAMPLE SERVICE OVERVIEW</small><h3>Good afternoon, team</h3></div>
              <span className="dash-user">MB</span>
            </div>
            <div className="dash-metrics">
              <div className="dash-metric"><small>Today&apos;s sales</small><strong>₹24,680</strong><span>↑ 12.8% <i>vs. last week</i></span></div>
              <div className="dash-metric"><small>Orders served</small><strong>86</strong><span className="metric-neutral">+ 8 <i>since yesterday</i></span></div>
              <div className="dash-metric"><small>Avg. order value</small><strong>₹287</strong><span className="metric-neutral">On track <i>this week</i></span></div>
            </div>
            <div className="dash-bottom">
              <div className="sales-panel">
                <div className="panel-title"><strong>Sales overview</strong><span>This week⌄</span></div>
                <div className="chart-area">
                  <div className="chart-y"><i>₹8k</i><i>₹4k</i><i>₹0</i></div>
                  <div className="chart-bars">{[38, 57, 48, 76, 61, 91, 69].map((height, index) => <span className={index === 5 ? 'bar bar-highlight' : 'bar'} style={{ height: `${height}%` }} key={index} />)}</div>
                </div>
                <div className="chart-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
              </div>
              <div className="orders-panel">
                <div className="panel-title"><strong>Recent orders</strong><span>See all</span></div>
                <div className="order-line"><span className="order-id">#1048</span><span>Chicken Dum Biryani</span><b>₹180</b></div>
                <div className="order-line"><span className="order-id">#1047</span><span>Mavalli Special</span><b>₹220</b></div>
                <div className="order-line"><span className="order-id">#1046</span><span>Veg Biryani</span><b>₹140</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-note note-orders"><span className="note-icon"><Icon name="receipt" size={18} /></span><span><b>Order received</b><small>Table 04 · just now</small></span><i className="note-check"><Icon name="check" size={13} /></i></div>
      <div className="float-note note-stock"><span className="stock-ring">✓</span><span><b>Service, in sync</b><small>Everything in its place</small></span></div>
    </div>
  )
}

function RestaurantDemo() {
  const [category, setCategory] = useState('All items')
  const [cart, setCart] = useState({})
  const [notice, setNotice] = useState('')
  const [activeTab, setActiveTab] = useState('New order')

  const visibleItems = menuItems.filter((item) => category === 'All items' || item.category === category)
  const cartItems = menuItems.filter((item) => cart[item.id])
  const itemCount = Object.values(cart).reduce((total, count) => total + count, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * cart[item.id], 0)
  const updateCart = (id, change) => {
    setNotice('')
    setCart((current) => {
      const nextCount = (current[id] || 0) + change
      const next = { ...current }
      if (nextCount <= 0) delete next[id]
      else next[id] = nextCount
      return next
    })
  }

  const placeOrder = () => {
    if (!itemCount) {
      setNotice('Add an item to start an order.')
      return
    }
    setCart({})
    setNotice('Demo order complete — no real order was sent.')
  }

  const tables = ['01', '02', '03', '04', '05', '06']

  return (
    <div className="pos-demo" aria-label="Interactive restaurant POS demo">
      <div className="pos-topbar">
        <div className="pos-logo"><div><b>MachMind<span>360</span></b><small>RESTAURANT POS</small></div></div>
        <div className="pos-location"><Icon name="pin" size={15} /> <span className="restaurant-wordmark">Mavalli Biryani</span> <span className="location-chevron">⌄</span></div>
        <div className="pos-status"><i /> System online <span className="pos-avatar">AK</span></div>
      </div>
      <div className="pos-tabs" role="tablist" aria-label="POS screens">
        {['New order', 'Tables'].map((tab) => (
          <button className={`pos-tab${activeTab === tab ? ' pos-tab-active' : ''}`} key={tab} onClick={() => { setActiveTab(tab); setNotice('') }} role="tab" aria-selected={activeTab === tab}>{tab}</button>
        ))}
        <span className="pos-time">SERVICE PREVIEW <i /> OPEN</span>
      </div>
      {activeTab === 'New order' ? (
        <div className="pos-content">
          <div className="menu-panel">
            <div className="pos-heading"><div><span className="pos-eyebrow">MAVALLI BIRYANI · MENU</span><h3>Good food, coming up.</h3></div><span className="menu-count">6 items</span></div>
            <div className="category-list" role="group" aria-label="Filter menu by category">
              {categories.map((item) => <button key={item} className={category === item ? 'category-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="menu-grid">
              {visibleItems.map((item) => (
                <article className={`menu-item menu-${item.tone}`} key={item.id}>
                  <div className="menu-item-art"><span>{item.mark}</span><i /></div>
                  <div className="menu-item-info"><div><h4>{item.name}</h4><p>{item.note}</p></div><strong>₹{item.price}</strong></div>
                  <button className="add-item" onClick={() => updateCart(item.id, 1)} aria-label={`Add ${item.name} to order`}><Icon name="plus" size={16} /> Add to order</button>
                </article>
              ))}
            </div>
          </div>
          <aside className="cart-panel">
            <div className="cart-heading"><div><span className="pos-eyebrow">CURRENT ORDER</span><h3>Table 04 <span>·</span> Dine in</h3></div><span className="cart-options" aria-hidden="true">•••</span></div>
            <div className="cart-items">
              {cartItems.length ? cartItems.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-item-name"><b>{item.name}</b><small>₹{item.price} each</small></div>
                  <div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => updateCart(item.id, -1)}><Icon name="minus" size={13} /></button><span>{cart[item.id]}</span><button aria-label={`Add one ${item.name}`} onClick={() => updateCart(item.id, 1)}><Icon name="plus" size={13} /></button></div>
                  <strong>₹{item.price * cart[item.id]}</strong>
                </div>
              )) : <div className="empty-cart"><span className="empty-bag"><Icon name="bag" size={22} /></span><b>Your order is waiting</b><p>Add something delicious from the menu.</p></div>}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><b>₹{subtotal}</b></div>
              <div><span>GST <small>(5%)</small></span><b>₹{Math.round(subtotal * 0.05)}</b></div>
              <div className="cart-total"><span>Total</span><b>₹{subtotal + Math.round(subtotal * 0.05)}</b></div>
              <button className="place-order" onClick={placeOrder}>Send order <span>{itemCount ? `· ${itemCount} ${itemCount === 1 ? 'item' : 'items'}` : ''}</span><Icon name="arrowRight" size={17} /></button>
              {notice && <p className={`order-notice${notice.startsWith('Order') ? ' notice-success' : ''}`} role="status">{notice}</p>}
              <p className="demo-disclaimer">Demo only — no real order is placed.</p>
            </div>
          </aside>
        </div>
      ) : (
        <div className="tables-panel">
          <div className="pos-heading"><div><span className="pos-eyebrow">FLOOR OVERVIEW</span><h3>Table status</h3></div><span className="table-legend"><i /> Available <i className="legend-busy" /> Occupied</span></div>
          <div className="table-grid">{tables.map((table, index) => <div className={`table-card${[1, 3].includes(index) ? ' table-busy' : ''}`} key={table}><span className="table-number">TABLE {table}</span><span className="table-symbol"><Icon name="table" size={25} /></span><b>{[1, 3].includes(index) ? 'Occupied' : 'Available'}</b><small>{[1, 3].includes(index) ? `Order #${1042 + index}` : 'Ready for guests'}</small></div>)}</div>
          <p className="tables-note"><Icon name="sparkles" size={16} /> A quick look at the floor, so service stays in sync.</p>
        </div>
      )}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="website">
      <div className="announcement"><span className="announcement-dot" /> Thoughtful software for the way your business works <a href="#about">Meet MachMind360 <Icon name="arrow" size={13} /></a></div>
      <header className="navbar">
        <div className="nav-inner">
          <Brand />
          <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} size={21} /></button>
          <nav className={`nav-links${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
            <a href="#products" onClick={closeMenu}>Product</a>
            <a href="#features" onClick={closeMenu}>What it does</a>
            <a href="#showcase" onClick={closeMenu}>Our work</a>
            <a href="#about" onClick={closeMenu}>About</a>
          </nav>
          <a className="nav-cta" href="/pos-demo">Explore the POS <Icon name="arrow" size={16} /></a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="kicker-icon"><Icon name="sparkles" size={15} /></span> SOFTWARE THAT WORKS THE WAY YOU DO</div>
              <h1>Good business<br />runs on <em>good</em><br /><span>systems.</span></h1>
              <p className="hero-description">We make everyday work feel a little less complicated. Meet the restaurant POS built to keep service moving and business in focus.</p>
              <div className="hero-actions"><a className="button-primary" href="#products">Meet the POS <Icon name="arrowRight" size={17} /></a><a className="button-text" href="#showcase">See it in action <span className="play-icon">▶</span></a></div>
              <div className="hero-proof"><span className="proof-rule" aria-hidden="true" /><p><b>Made for real service.</b><br />Showcased at Mavalli Biryani, Dharwad.</p></div>
            </div>
            <HeroDashboard />
            <div className="hero-ornament ornament-one" /><div className="hero-ornament ornament-two" />
          </div>
          <div className="hero-bottom"><span>BUILT WITH PURPOSE</span><i /><span>DESIGNED FOR PEOPLE</span><i /><span>READY FOR EVERYDAY</span></div>
        </section>

        <section className="product-section section-pad" id="products">
          <div className="section-container">
            <SectionHeading eyebrow="THE PRODUCT" title={<>A better rhythm<br className="desktop-break" /> for your restaurant.</>} copy="Meet a restaurant POS that brings your front-of-house essentials into one calm, connected place." />
            <div className="product-intro-grid">
              <div className="product-story">
                <span className="product-stamp"><Icon name="sparkles" size={18} /></span>
                <h3>Less juggling.<br /><span>More good service.</span></h3>
                <p>Billing, orders, tables, stock and sales reports — connected in a single workflow your team can get comfortable with.</p>
                <a className="inline-link" href="#features">Take a closer look <Icon name="arrowRight" size={16} /></a>
              </div>
              <div className="product-benefits">
                <div className="benefit-row"><span className="benefit-icon"><Icon name="receipt" /></span><div><h4>One clear view of the day</h4><p>Keep orders and sales together, from the first table to closing time.</p></div><span className="benefit-number">01</span></div>
                <div className="benefit-row"><span className="benefit-icon"><Icon name="table" /></span><div><h4>Work that flows naturally</h4><p>Give the whole team a simpler way to stay on top of service.</p></div><span className="benefit-number">02</span></div>
                <div className="benefit-row"><span className="benefit-icon"><Icon name="chart" /></span><div><h4>Useful answers, not more noise</h4><p>See how the business is doing without digging through complexity.</p></div><span className="benefit-number">03</span></div>
                <a href="/pos-demo" className="benefit-demo-link">Open the full POS workspace <Icon name="arrow" size={15} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="section-container">
            <div className="features-top">
              <SectionHeading eyebrow="THE EVERYDAY, MADE EASIER" title={<>Every part of service.<br /><span>Thoughtfully connected.</span></>} copy="The details that keep a restaurant running, working together instead of getting in the way." align="left" />
              <div className="feature-note"><span className="note-sun">✳</span><p>Good software should feel like a helpful extra pair of hands.</p></div>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <article className="feature-card" key={feature.title}>
                  <div className={`feature-icon feature-icon-${index + 1}`}><Icon name={feature.icon} size={22} /></div>
                  <span className="feature-index">0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="showcase-section section-pad" id="showcase">
          <div className="section-container">
            <div className="showcase-card">
              <div className="showcase-copy">
                <span className="showcase-eyebrow"><span /> OUT IN THE REAL WORLD</span>
                <div className="showcase-restaurant-wordmark"><strong>Mavalli Biryani</strong><span>Dharwad</span></div>
                <h2>One local favourite.<br /><em>One smoother service.</em></h2>
                <p>MachMind360&apos;s restaurant POS is in use at Mavalli Biryani Dharwad — helping bring the moving parts of a busy restaurant day into one place.</p>
                <div className="showcase-details">
                  <span><Icon name="pin" size={16} /> Dharwad, Karnataka</span>
                  <i />
                  <span>Restaurant POS implementation</span>
                </div>
                <a href="/pos-demo" className="showcase-link">Explore the experience <Icon name="arrowRight" size={17} /></a>
              </div>
              <div className="showcase-art" aria-label="Illustration of a biryani bowl">
                <span className="art-sun" /><span className="art-spark art-spark-one">✳</span><span className="art-spark art-spark-two">✳</span>
                <div className="dish-shadow" /><div className="biryani-bowl"><div className="bowl-rim"><div className="rice-field"><span className="rice-grain grain-a" /><span className="rice-grain grain-b" /><span className="rice-grain grain-c" /><span className="rice-grain grain-d" /><span className="rice-grain grain-e" /><span className="rice-grain grain-f" /><span className="rice-grain grain-g" /><span className="rice-grain grain-h" /><i className="herb herb-a" /><i className="herb herb-b" /><i className="herb herb-c" /><i className="chili" /><i className="star-anise">✳</i></div></div><div className="bowl-base" /></div>
                <div className="art-caption"><span className="caption-dot" /> A little more flow, every service.</div>
                <span className="art-label">MADE FOR<br />GOOD FOOD &amp;<br />GOOD BUSINESS</span>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section section-pad" id="demo">
          <div className="section-container">
            <div className="demo-header">
              <SectionHeading eyebrow="TAKE IT FOR A SPIN" title={<>A little hands-on<br /><span>is always better.</span></>} copy="Add a few favourites, adjust the order, then switch over to see the table view. This is a safe, interactive preview — no real orders are sent." align="left" />
              <a className="demo-launch-link" href="/pos-demo">Open full POS demo <Icon name="arrowRight" size={16} /></a>
            </div>
            <RestaurantDemo />
            <p className="demo-caption"><span><i /> INTERACTIVE PREVIEW</span><span>Sample menu &amp; prices for demonstration purposes.</span></p>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="section-container about-inner">
            <div className="about-brand-display" aria-label="MachMind360 text wordmark">
              <span className="about-brand-overline">PRACTICAL SOFTWARE, THOUGHTFULLY MADE</span>
              <span className="about-brand-wordmark">MachMind<span>360</span></span>
              <span className="about-brand-rule" />
              <span className="about-brand-tagline">Built around people. Made for real business.</span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">A LITTLE ABOUT US</span>
              <h2>We believe good technology should feel <em>human.</em></h2>
              <p>MachMind360 is a software company focused on building practical, thoughtful tools for real businesses. We look at the everyday friction, listen to the people doing the work, and design software that makes the next step easier.</p>
              <p>Our restaurant POS is one expression of that idea — shaped around the pace and details of a real restaurant, with Mavalli Biryani Dharwad as its real-world showcase.</p>
              <a className="inline-link" href="#contact">Let&apos;s make work work better <Icon name="arrowRight" size={16} /></a>
            </div>
          </div>
        </section>

        <section className="closing-section" id="contact">
          <div className="closing-pattern" />
          <div className="closing-inner">
            <span className="closing-kicker"><Icon name="sparkles" size={15} /> GOOD WORK STARTS WITH A GOOD CONVERSATION</span>
            <h2>Have a business to<br /><em>make simpler?</em></h2>
            <p>See how a more considered system could fit into your day.</p>
            <a className="button-light" href="/pos-demo">Start with the POS demo <Icon name="arrowRight" size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-block"><Brand light /><p>Thoughtful software.<br />A better way to do business.</p></div>
          <div className="footer-links"><span>EXPLORE</span><a href="#products">The product</a><a href="#features">What it does</a><a href="#showcase">Our work</a></div>
          <div className="footer-links"><span>THE COMPANY</span><a href="#about">About MachMind360</a><a href="#contact">Get in touch</a><a href="/pos-demo">Try the demo</a></div>
          <a className="back-top" href="#home" aria-label="Back to top"><Icon name="arrow" size={18} /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 MachMind360. Made with care.</span><span>Software by MachMind360 · Restaurant showcase: Mavalli Biryani Dharwad</span></div>
      </footer>
    </div>
  )
}

export default App
