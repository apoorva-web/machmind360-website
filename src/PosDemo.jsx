import { useMemo, useState } from 'react'
import './PosDemo.css'

const menuItems = [
  { id: 'chicken-biryani', name: 'Chicken Dum Biryani', category: 'Biryani', price: 220, description: 'Dum cooked · serves 1', recipe: { rice: 0.14, chicken: 0.18, onions: 0.05, curd: 0.04 }, popular: true },
  { id: 'mutton-biryani', name: 'Mutton Dum Biryani', category: 'Biryani', price: 290, description: 'Slow cooked · serves 1', recipe: { rice: 0.14, mutton: 0.2, onions: 0.05, curd: 0.04 }, popular: true },
  { id: 'mavalli-special', name: 'Mavalli Special Biryani', category: 'Biryani', price: 340, description: 'House special · serves 1', recipe: { rice: 0.16, chicken: 0.1, mutton: 0.1, onions: 0.06, curd: 0.05 }, popular: true },
  { id: 'veg-biryani', name: 'Veg Biryani', category: 'Biryani', price: 170, description: 'Garden fresh · serves 1', recipe: { rice: 0.13, paneer: 0.08, onions: 0.04, curd: 0.03 } },
  { id: 'chicken-65', name: 'Chicken 65', category: 'Starters', price: 210, description: 'Crispy · 6 pieces', recipe: { chicken: 0.18, onions: 0.03, curd: 0.03 } },
  { id: 'chicken-kabab', name: 'Chicken Kabab', category: 'Starters', price: 190, description: 'Chargrilled · 4 pieces', recipe: { chicken: 0.2, curd: 0.04 } },
  { id: 'paneer-tikka', name: 'Paneer Tikka', category: 'Starters', price: 220, description: 'Tandoor roasted · 6 pieces', recipe: { paneer: 0.16, curd: 0.05, onions: 0.02 } },
  { id: 'chicken-curry', name: 'Andhra Chicken Curry', category: 'Curries', price: 230, description: 'House masala · serves 1', recipe: { chicken: 0.2, onions: 0.07, curd: 0.05 } },
  { id: 'dal-tadka', name: 'Dal Tadka', category: 'Curries', price: 145, description: 'Yellow lentils · serves 1', recipe: { lentils: 0.14, onions: 0.03, curd: 0.02 } },
  { id: 'butter-naan', name: 'Butter Naan', category: 'Breads', price: 48, description: 'Tandoor baked · each', recipe: { flour: 0.08, dairy: 0.02 } },
  { id: 'tandoori-roti', name: 'Tandoori Roti', category: 'Breads', price: 32, description: 'Whole wheat · each', recipe: { flour: 0.07 } },
  { id: 'masala-buttermilk', name: 'Masala Buttermilk', category: 'Drinks', price: 38, description: 'Chilled · 250 ml', recipe: { dairy: 0.22 } },
  { id: 'lime-soda', name: 'Fresh Lime Soda', category: 'Drinks', price: 58, description: 'Sweet or salted · 300 ml', recipe: { lemons: 0.04, soda: 0.3 } },
]

const initialInventory = [
  { id: 'rice', name: 'Basmati rice', category: 'Grains', quantity: 18.4, unit: 'kg', par: 5, cost: 185 },
  { id: 'chicken', name: 'Fresh chicken', category: 'Poultry', quantity: 8.6, unit: 'kg', par: 3, cost: 285 },
  { id: 'mutton', name: 'Mutton', category: 'Meat', quantity: 4.8, unit: 'kg', par: 2, cost: 720 },
  { id: 'paneer', name: 'Fresh paneer', category: 'Dairy', quantity: 3.2, unit: 'kg', par: 1.5, cost: 340 },
  { id: 'onions', name: 'Red onions', category: 'Produce', quantity: 12.5, unit: 'kg', par: 4, cost: 38 },
  { id: 'curd', name: 'Curd & marinade', category: 'Dairy', quantity: 5.4, unit: 'kg', par: 2, cost: 72 },
  { id: 'lentils', name: 'Toor dal', category: 'Grains', quantity: 1.1, unit: 'kg', par: 1.5, cost: 142 },
  { id: 'flour', name: 'Whole wheat flour', category: 'Grains', quantity: 9.2, unit: 'kg', par: 3, cost: 44 },
  { id: 'dairy', name: 'Butter & dairy', category: 'Dairy', quantity: 4.3, unit: 'kg', par: 1.5, cost: 260 },
  { id: 'lemons', name: 'Fresh lemons', category: 'Produce', quantity: 0.8, unit: 'kg', par: 1.2, cost: 95 },
  { id: 'soda', name: 'Soda water', category: 'Beverages', quantity: 14.5, unit: 'L', par: 5, cost: 32 },
]

const initialTables = [
  { id: '01', section: 'Main hall', seats: 2, status: 'Available' },
  { id: '02', section: 'Main hall', seats: 4, status: 'Occupied', orderId: 'MB-1048' },
  { id: '03', section: 'Main hall', seats: 4, status: 'Available' },
  { id: '04', section: 'Main hall', seats: 6, status: 'Reserved' },
  { id: '05', section: 'Courtyard', seats: 4, status: 'Occupied', orderId: 'MB-1046' },
  { id: '06', section: 'Courtyard', seats: 2, status: 'Available' },
  { id: '07', section: 'Courtyard', seats: 6, status: 'Occupied', orderId: 'MB-1041' },
  { id: '08', section: 'Courtyard', seats: 4, status: 'Available' },
]

const initialOrders = [
  { id: 'MB-1048', type: 'Dine in', table: '02', guest: 'Table 02', items: [{ name: 'Chicken Dum Biryani', quantity: 2 }, { name: 'Masala Buttermilk', quantity: 2 }], total: 542, status: 'Preparing', time: '12:42 PM' },
  { id: 'MB-1046', type: 'Dine in', table: '05', guest: 'Table 05', items: [{ name: 'Mutton Dum Biryani', quantity: 2 }, { name: 'Chicken 65', quantity: 1 }], total: 830, status: 'Ready', time: '12:35 PM' },
  { id: 'MB-1041', type: 'Dine in', table: '07', guest: 'Table 07', items: [{ name: 'Mavalli Special Biryani', quantity: 1 }, { name: 'Paneer Tikka', quantity: 1 }], total: 588, status: 'Preparing', time: '12:29 PM' },
  { id: 'MB-1042', type: 'Takeaway', table: null, guest: 'Walk-in', items: [{ name: 'Veg Biryani', quantity: 2 }, { name: 'Fresh Lime Soda', quantity: 1 }], total: 418, status: 'Completed', time: '12:18 PM' },
]

const navigation = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'billing', label: 'Billing', icon: 'billing' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'tables', label: 'Tables', icon: 'tables' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
  { id: 'reports', label: 'Reports', icon: 'reports' },
]

const categories = ['All menu', 'Biryani', 'Starters', 'Curries', 'Breads', 'Drinks']
const reportRanges = ['Today', '7 days', '30 days']
const serviceDateLabel = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date()).toUpperCase()
const headerDateLabel = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date())

const iconDrawings = {
  overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" /></>,
  billing: <><path d="M5 3.5h14v17l-3.5-2-3.5 2-3.5-2L5 20.5v-17Z" /><path d="M8.5 8h7M8.5 12h7M8.5 16h3" /></>,
  orders: <><path d="M7 4h13v17H7zM4 7H3v14h13v-1" /><path d="M10 9h6M10 13h6M10 17h3" /></>,
  tables: <><path d="M4 6h16M6 6v5h12V6M7 11v9m10-9v9M4 20h16" /><path d="M9 8.5h.01M15 8.5h.01" /></>,
  inventory: <><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5v9l8 4.5 8-4.5v-9M12 12v9" /></>,
  reports: <><path d="M4 20V5m0 15h17" /><path d="m7 15 4-4 3 2 6-7" /><path d="M16 6h4v4" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  print: <><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><path d="M7 14h10v7H7zM17 11h.01" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  warning: <><path d="m12 3 9 17H3L12 3Z" /><path d="M12 9v4m0 3h.01" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 17v4h14v-4" /></>,
  food: <><path d="M4 13h16a8 8 0 0 1-16 0Z" /><path d="M3 13h18M8 9c0-1 .6-1.6 1.2-2.2S10 5.7 10 5M12 9c0-1 .6-1.6 1.2-2.2S14 5.7 14 5M16 9c0-1 .6-1.6 1.2-2.2S18 5.7 18 5" /></>,
  spark: <><path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z" /></>,
  phone: <><path d="M8 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-3l-5-2-2 3a13 13 0 0 1-6-6l3-2-3-6Z" /></>,
  cart: <><path d="M3 4h2l2 11h11l2-8H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
}

function Icon({ name, size = 18 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{iconDrawings[name] || iconDrawings.spark}</svg>
}

const formatCurrency = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`
const formatQuantity = (amount) => Number.isInteger(amount) ? String(amount) : amount.toFixed(1)

function StatusBadge({ status }) {
  const statusClass = status.toLowerCase().replaceAll(' ', '-')
  return <span className={`status-badge status-${statusClass}`}><i />{status}</span>
}

function PageTitle({ eyebrow, title, copy, action }) {
  return (
    <div className="page-title-row">
      <div>
        <div className="page-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  )
}

function MetricCard({ label, value, note, icon, change, tone = 'orange' }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon metric-${tone}`}><Icon name={icon} size={19} /></div>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-note"><b>{change}</b> {note}</span>
    </article>
  )
}

function SalesChart({ values, labels, compact = false }) {
  const max = Math.max(...values)
  return (
    <div className={`sales-chart${compact ? ' sales-chart-compact' : ''}`} role="img" aria-label="Sales bar chart">
      {values.map((value, index) => (
        <div className="sales-chart-column" key={`${labels[index]}-${index}`} title={`${labels[index]}: ${formatCurrency(value)}`}>
          <div className="sales-chart-bar-wrap"><span className={`sales-chart-bar${index === values.indexOf(max) ? ' bar-best' : ''}`} style={{ height: `${Math.max(8, (value / max) * 100)}%` }} /></div>
          <span className="sales-chart-label">{labels[index]}</span>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ icon = 'cart', title, copy, action }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon"><Icon name={icon} size={24} /></span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {action}
    </div>
  )
}

function OverviewScreen({ onNavigate, dailySales, dailyOrderCount, orders, inventory }) {
  const busyOrders = orders.filter((order) => order.status === 'Preparing' || order.status === 'Ready').length
  const lowStock = inventory.filter((item) => item.quantity <= item.par).length
  const sampleValues = [4200, 6100, 4700, 8100, 5900, 11200, Math.max(8300, dailySales - 40200)]
  const recentOrders = orders.slice(0, 4)

  return (
    <>
      <PageTitle eyebrow={`${serviceDateLabel} · SERVICE OVERVIEW`} title="Good afternoon, team" copy="Here is how things are moving at Mavalli Biryani today." action={<button className="button-primary" onClick={() => onNavigate('billing')}><Icon name="plus" size={16} /> New bill</button>} />
      <div className="metric-grid">
        <MetricCard label="Today's sales" value={formatCurrency(dailySales)} change="+12.8%" note="vs. last Sunday" icon="reports" tone="orange" />
        <MetricCard label="Orders today" value={dailyOrderCount.toLocaleString('en-IN')} change="+8" note="since yesterday" icon="billing" tone="green" />
        <MetricCard label="Average order" value={formatCurrency(dailySales / dailyOrderCount)} change="+4.2%" note="vs. last Sunday" icon="cart" tone="gold" />
        <MetricCard label="Open orders" value={String(busyOrders).padStart(2, '0')} change={`${lowStock} low`} note="stock alerts" icon="clock" tone="plum" />
      </div>
      <div className="overview-grid">
        <section className="panel sales-overview-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">SALES PERFORMANCE</span><h2>Today at a glance</h2></div><button className="text-button" onClick={() => onNavigate('reports')}>View reports <Icon name="arrow" size={15} /></button></div>
          <div className="chart-legend"><span><i /> Sales</span><span className="chart-total">{formatCurrency(dailySales)}</span></div>
          <SalesChart values={sampleValues} labels={['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM']} />
          <div className="chart-footnote"><span><b>Peak hour</b> · 8:00 PM – 9:00 PM</span><span>Sample performance data</span></div>
        </section>
        <section className="panel activity-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">LIVE SERVICE</span><h2>Recent orders</h2></div><button className="icon-link-button" aria-label="View all orders" onClick={() => onNavigate('orders')}><Icon name="arrow" size={16} /></button></div>
          <div className="activity-list">
            {recentOrders.map((order) => (
              <div className="activity-row" key={order.id}>
                <span className={`activity-order-icon${order.status === 'Completed' ? ' activity-done' : ''}`}><Icon name={order.type === 'Takeaway' ? 'phone' : 'food'} size={16} /></span>
                <div className="activity-order"><b>{order.id} <span>· {order.guest}</span></b><small>{order.time} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} items</small></div>
                <div className="activity-total"><b>{formatCurrency(order.total)}</b><StatusBadge status={order.status} /></div>
              </div>
            ))}
          </div>
          <button className="panel-bottom-link" onClick={() => onNavigate('orders')}>Open order management <Icon name="arrow" size={14} /></button>
        </section>
      </div>
      <div className="overview-bottom-grid">
        <section className="quick-action-card">
          <div className="quick-action-copy"><span className="quick-action-kicker"><Icon name="spark" size={15} /> SERVICE SHORTCUT</span><h2>Ready for the next order?</h2><p>Build a bill and send a demo order through the kitchen workflow.</p><button className="button-primary" onClick={() => onNavigate('billing')}>Start a new bill <Icon name="arrow" size={15} /></button></div>
          <div className="quick-action-graphic"><span className="graphic-orbit orbit-outer" /><span className="graphic-orbit orbit-inner" /><span className="graphic-bowl"><Icon name="food" size={33} /></span><span className="graphic-spark">✳</span></div>
        </section>
        <section className="panel stock-alert-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">KEEP AN EYE ON</span><h2>Stock reminders</h2></div><button className="text-button" onClick={() => onNavigate('inventory')}>Inventory <Icon name="arrow" size={15} /></button></div>
          {inventory.filter((item) => item.quantity <= item.par).slice(0, 3).map((item) => (
            <div className="stock-alert-row" key={item.id}><span className="stock-alert-icon"><Icon name="warning" size={16} /></span><div><b>{item.name}</b><small>Reorder point · {formatQuantity(item.par)} {item.unit}</small></div><strong>{formatQuantity(item.quantity)} <small>{item.unit}</small></strong></div>
          ))}
          {!lowStock && <div className="all-stock-ok"><Icon name="check" size={17} /> All items are above their reorder point.</div>}
        </section>
      </div>
    </>
  )
}

function BillingScreen({ menuStock, inventory, cart, onAdd, onChange, onGenerate, subtotal, tax, total, orderType, setOrderType, selectedTable, setSelectedTable, tables, paymentMethod, setPaymentMethod, notice, setNotice }) {
  const [category, setCategory] = useState('All menu')
  const [search, setSearch] = useState('')
  const filteredItems = menuItems.filter((item) => (category === 'All menu' || item.category === category) && item.name.toLowerCase().includes(search.toLowerCase()))
  const cartItems = menuItems.filter((item) => cart[item.id])
  const categoriesForCount = (item) => Object.entries(item.recipe).map(([id]) => {
    const stockItem = inventory.find((stock) => stock.id === id)
    return stockItem ? `${stockItem.name} ${formatQuantity(stockItem.quantity)} ${stockItem.unit}` : 'stock'
  }).join(', ')

  return (
    <>
      <PageTitle eyebrow="POINT OF SALE · NEW ORDER" title="Create a bill" copy="Add menu items to build a new order. Everything here is sample data." action={<span className="screen-live-label"><i /> DEMO REGISTER OPEN</span>} />
      <div className="billing-layout">
        <section className="menu-panel panel">
          <div className="menu-panel-top"><div><span className="panel-eyebrow">MAVALLI BIRYANI · MENU</span><h2>What can we get started?</h2></div><span className="menu-item-count">{menuItems.length} menu items</span></div>
          <div className="menu-controls">
            <div className="menu-categories" aria-label="Menu categories">
              {categories.map((item) => <button key={item} className={category === item ? 'category-selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <label className="menu-search"><Icon name="search" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" aria-label="Search menu" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" size={14} /></button>}</label>
          </div>
          <div className="menu-item-grid">
            {filteredItems.map((item, index) => {
              const quantity = menuStock(item)
              const inCart = cart[item.id] || 0
              const soldOut = quantity <= 0
              return (
                <article className={`pos-menu-item${soldOut ? ' menu-sold-out' : ''}`} key={item.id}>
                  <div className={`pos-food-art food-art-${index % 5}`}><span className="food-plate"><Icon name="food" size={27} /></span>{item.popular && <span className="popular-tag">POPULAR</span>}</div>
                  <div className="pos-menu-item-copy"><div><span className="pos-menu-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div><strong>{formatCurrency(item.price)}</strong></div>
                  <div className="menu-card-footer"><span className={quantity < 5 ? 'portions-low' : ''}>{soldOut ? 'Out of stock' : `${quantity} portions available`}</span><button disabled={soldOut || inCart >= quantity} onClick={() => onAdd(item)} aria-label={`Add ${item.name} to bill`}><Icon name="plus" size={15} />{inCart ? `Add more · ${inCart}` : 'Add to bill'}</button></div>
                  {soldOut && <span className="stock-tooltip">Restock required: {categoriesForCount(item)}</span>}
                </article>
              )
            })}
            {!filteredItems.length && <div className="menu-no-results"><Icon name="search" size={19} /><b>No menu items match “{search}”</b><button onClick={() => { setSearch(''); setCategory('All menu') }}>Clear filters</button></div>}
          </div>
        </section>

        <aside className="bill-panel panel">
          <div className="bill-panel-title"><div><span className="panel-eyebrow">CURRENT BILL</span><h2>New order</h2></div><span className="bill-number">DRAFT</span></div>
          <div className="order-mode-select" role="group" aria-label="Order type">
            {['Dine in', 'Takeaway'].map((type) => <button className={orderType === type ? 'mode-selected' : ''} key={type} onClick={() => { setOrderType(type); setNotice('') }}><Icon name={type === 'Dine in' ? 'tables' : 'phone'} size={15} />{type}</button>)}
          </div>
          {orderType === 'Dine in' ? (
            <label className="table-select-label">Assign a table
              <span className="table-select-wrap"><Icon name="tables" size={16} /><select value={selectedTable || ''} onChange={(event) => setSelectedTable(event.target.value)} aria-label="Select a table">{tables.filter((table) => table.status === 'Available' || table.id === selectedTable).map((table) => <option value={table.id} key={table.id}>Table {table.id} · {table.seats} seats</option>)}{!tables.some((table) => table.status === 'Available') && <option value="" disabled>No available tables</option>}</select><Icon name="chevron" size={15} /></span>
            </label>
          ) : <div className="takeaway-note"><Icon name="phone" size={15} /><span>Walk-in takeaway order</span></div>}
          <div className="bill-lines-heading"><span>ITEM</span><span>QTY</span><span>AMOUNT</span></div>
          <div className="bill-line-list">
            {cartItems.length ? cartItems.map((item) => (
              <div className="bill-line" key={item.id}>
                <div className="bill-line-name"><b>{item.name}</b><small>{formatCurrency(item.price)} each</small></div>
                <div className="bill-quantity"><button aria-label={`Remove one ${item.name}`} onClick={() => onChange(item.id, -1)}><Icon name="minus" size={12} /></button><span>{cart[item.id]}</span><button aria-label={`Add one ${item.name}`} onClick={() => onChange(item.id, 1)}><Icon name="plus" size={12} /></button></div>
                <b className="bill-line-total">{formatCurrency(item.price * cart[item.id])}</b>
              </div>
            )) : <EmptyState icon="cart" title="Your bill is empty" copy="Choose something delicious from the menu to get started." />}
          </div>
          <div className="bill-totals">
            <div><span>Subtotal</span><b>{formatCurrency(subtotal)}</b></div>
            <div><span>GST <small>(5%)</small></span><b>{formatCurrency(tax)}</b></div>
            <div className="bill-grand-total"><span>Total due</span><b>{formatCurrency(total)}</b></div>
          </div>
          <div className="payment-method"><span>Payment method <small>Demo only</small></span><div>{['Cash', 'UPI', 'Card'].map((method) => <button className={paymentMethod === method ? 'payment-selected' : ''} key={method} onClick={() => setPaymentMethod(method)}>{method}</button>)}</div></div>
          <button className="generate-bill-button" disabled={!cartItems.length} onClick={onGenerate}>Generate bill <Icon name="arrow" size={16} /></button>
          {notice && <p className="pos-notice" role="status">{notice}</p>}
          <p className="bill-demo-note"><Icon name="shield" size={13} /> Simulation only · no payment is processed</p>
        </aside>
      </div>
    </>
  )
}

function OrdersScreen({ orders, onAdvance, filter, setFilter, focusedOrder, onClearFocus, onNewBill }) {
  const filteredOrders = orders.filter((order) => filter === 'All orders' || order.status === filter)
  const counts = {
    'All orders': orders.length,
    Preparing: orders.filter((order) => order.status === 'Preparing').length,
    Ready: orders.filter((order) => order.status === 'Ready').length,
    Completed: orders.filter((order) => order.status === 'Completed').length,
  }
  return (
    <>
      <PageTitle eyebrow="SERVICE WORKSPACE" title="Order management" copy="Keep every dine-in and takeaway order moving through service." action={<button className="button-primary" onClick={onNewBill}><Icon name="plus" size={16} /> New order</button>} />
      <div className="orders-toolbar panel">
        <div className="order-filter-tabs" role="tablist" aria-label="Filter orders">
          {Object.keys(counts).map((item) => <button className={filter === item ? 'order-filter-active' : ''} key={item} role="tab" aria-selected={filter === item} onClick={() => { setFilter(item); onClearFocus() }}>{item}<span>{counts[item]}</span></button>)}
        </div>
        <span className="orders-sample-tag"><i /> SAMPLE SERVICE QUEUE</span>
      </div>
      {filteredOrders.length ? (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <article className={`order-card panel${focusedOrder === order.id ? ' order-focused' : ''}`} key={order.id}>
              <div className="order-card-top"><div><span className="order-card-id">{order.id}</span><span className="order-card-time"><Icon name="clock" size={13} />{order.time}</span></div><StatusBadge status={order.status} /></div>
              <div className="order-card-meta"><span className="order-type-icon"><Icon name={order.type === 'Takeaway' ? 'phone' : 'tables'} size={16} /></span><div><b>{order.guest}</b><small>{order.type}{order.table ? ` · Table ${order.table}` : ' · Pickup'}</small></div><strong>{formatCurrency(order.total)}</strong></div>
              <div className="order-card-items">{order.items.map((item, index) => <div key={`${item.name}-${index}`}><span>{item.quantity} × {item.name}</span><i>{formatCurrency((menuItems.find((menuItem) => menuItem.name === item.name)?.price || 0) * item.quantity)}</i></div>)}</div>
              <div className="order-card-bottom"><span>{order.status === 'Completed' ? 'Order completed' : `Kitchen · ${order.status.toLowerCase()}`}</span>{order.status === 'Preparing' && <button className="order-action-button" onClick={() => onAdvance(order)}>Mark ready <Icon name="check" size={14} /></button>}{order.status === 'Ready' && <button className="order-action-button" onClick={() => onAdvance(order)}>Complete order <Icon name="check" size={14} /></button>}</div>
            </article>
          ))}
        </div>
      ) : <EmptyState icon="orders" title={`No ${filter.toLowerCase()} yet`} copy="New orders created in Billing will appear here." action={<button className="button-secondary" onClick={onNewBill}>Create an order</button>} />}
    </>
  )
}

function TablesScreen({ tables, onStart, onRelease, onViewOrder }) {
  const availableCount = tables.filter((table) => table.status === 'Available').length
  const occupiedCount = tables.filter((table) => table.status === 'Occupied').length
  const reservedCount = tables.filter((table) => table.status === 'Reserved').length
  return (
    <>
      <PageTitle eyebrow="FLOOR PLAN · LIVE STATUS" title="Table management" copy="A clear view of your dining room, at a glance." action={<span className="screen-live-label"><i /> SERVICE IN PROGRESS</span>} />
      <div className="table-summary-grid">
        <div className="table-summary-item"><span className="table-summary-dot dot-available" /><div><b>{availableCount}</b><span>Available</span></div></div>
        <div className="table-summary-item"><span className="table-summary-dot dot-occupied" /><div><b>{occupiedCount}</b><span>Occupied</span></div></div>
        <div className="table-summary-item"><span className="table-summary-dot dot-reserved" /><div><b>{reservedCount}</b><span>Reserved</span></div></div>
        <span className="table-summary-caption"><Icon name="clock" size={15} /> Updated just now</span>
      </div>
      {['Main hall', 'Courtyard'].map((section) => (
        <section className="table-section panel" key={section}>
          <div className="table-section-heading"><div><span className="panel-eyebrow">DINING AREA</span><h2>{section}</h2></div><span>{tables.filter((table) => table.section === section).length} tables</span></div>
          <div className="restaurant-table-grid">
            {tables.filter((table) => table.section === section).map((table) => (
              <article className={`restaurant-table table-${table.status.toLowerCase()}`} key={table.id}>
                <div className="restaurant-table-top"><span>TABLE {table.id}</span><StatusBadge status={table.status} /></div>
                <div className="restaurant-table-graphic"><span className="chair chair-top" /><span className="chair chair-right" /><span className="chair chair-bottom" /><span className="chair chair-left" /><span className="tabletop"><Icon name="food" size={19} /></span></div>
                <div className="restaurant-table-footer"><span><Icon name="user" size={14} /> {table.seats} seats</span>{table.status === 'Occupied' ? <b>{table.orderId}</b> : <span>{table.status === 'Reserved' ? 'Guest expected' : 'Ready to seat'}</span>}</div>
                {table.status === 'Available' && <button className="table-action" onClick={() => onStart(table)}>Start order <Icon name="arrow" size={14} /></button>}
                {table.status === 'Occupied' && <button className="table-action" onClick={() => onViewOrder(table)}>View order <Icon name="arrow" size={14} /></button>}
                {table.status === 'Reserved' && <button className="table-action table-release-action" onClick={() => onRelease(table)}>Release table <Icon name="check" size={14} /></button>}
              </article>
            ))}
          </div>
        </section>
      ))}
      <div className="floor-note"><Icon name="spark" size={17} /><span>Start an order from an available table. Completing a demo order updates its table status automatically.</span></div>
    </>
  )
}

function InventoryScreen({ inventory, onAdjust, filter, setFilter }) {
  const lowCount = inventory.filter((item) => item.quantity <= item.par).length
  const shownInventory = inventory.filter((item) => filter === 'All stock' || item.quantity <= item.par)
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0)
  return (
    <>
      <PageTitle eyebrow="STOCKROOM · SAMPLE COUNTS" title="Inventory" copy="Track ingredients, catch low stock early, and make quick demo adjustments." action={<button className="button-primary" onClick={() => setFilter(filter === 'Low stock' ? 'All stock' : 'Low stock')}><Icon name={filter === 'Low stock' ? 'overview' : 'warning'} size={16} />{filter === 'Low stock' ? 'View all stock' : `Low stock · ${lowCount}`}</button>} />
      <div className="inventory-metrics">
        <MetricCard label="Tracked ingredients" value={String(inventory.length).padStart(2, '0')} change="Across" note="7 categories" icon="inventory" tone="orange" />
        <MetricCard label="Need attention" value={String(lowCount).padStart(2, '0')} change={lowCount ? 'Restock' : 'All clear'} note="below par level" icon="warning" tone="gold" />
        <MetricCard label="Sample stock value" value={formatCurrency(totalValue)} change="Estimate" note="for demo only" icon="reports" tone="green" />
      </div>
      <section className="inventory-panel panel">
        <div className="inventory-table-heading"><div><span className="panel-eyebrow">MAVALLI BIRYANI · STOCKROOM</span><h2>{filter === 'Low stock' ? 'Items to replenish' : 'Ingredient levels'}</h2></div><span className="inventory-table-count">{shownInventory.length} ingredients</span></div>
        <div className="inventory-table-wrap">
          <table className="inventory-table">
            <thead><tr><th>INGREDIENT</th><th>CATEGORY</th><th>ON HAND</th><th>PAR LEVEL</th><th>STOCK STATUS</th><th>DEMO ADJUSTMENT</th></tr></thead>
            <tbody>{shownInventory.map((item) => {
              const isLow = item.quantity <= item.par
              const step = item.unit === 'kg' || item.unit === 'L' ? 0.5 : 1
              return <tr key={item.id}><td><div className="inventory-product"><span className={`inventory-item-mark mark-${item.category.toLowerCase()}`}><Icon name={item.category === 'Produce' ? 'spark' : 'inventory'} size={16} /></span><b>{item.name}</b></div></td><td><span className="inventory-category">{item.category}</span></td><td><b className="inventory-quantity">{formatQuantity(item.quantity)} <small>{item.unit}</small></b></td><td>{formatQuantity(item.par)} <small className="unit-muted">{item.unit}</small></td><td><span className={`inventory-status${isLow ? ' inventory-low' : ''}`}><i />{isLow ? 'Low stock' : 'In stock'}</span></td><td><div className="inventory-actions"><button onClick={() => onAdjust(item.id, step)} aria-label={`Restock ${item.name} by ${step} ${item.unit}`}><Icon name="plus" size={13} /> Restock</button><button onClick={() => onAdjust(item.id, -step)} disabled={item.quantity < step} aria-label={`Use ${step} ${item.unit} of ${item.name}`}><Icon name="minus" size={13} /> Adjust</button></div></td></tr>
            })}</tbody>
          </table>
          {!shownInventory.length && <div className="inventory-no-results">No ingredients match this filter.</div>}
        </div>
        <div className="inventory-table-footer"><span><Icon name="spark" size={15} /> Demo stock adjustments update menu availability locally.</span><span>Last checked just now</span></div>
      </section>
    </>
  )
}

function ReportsScreen({ dailySales, dailyOrderCount, range, setRange, onExport }) {
  const reportConfig = {
    Today: { values: [2900, 5100, 3600, 7400, 5900, 11300, Math.max(8400, dailySales - 44600)], labels: ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'], sales: dailySales, orders: dailyOrderCount, average: dailySales / dailyOrderCount, title: 'Hourly sales' },
    '7 days': { values: [32500, 38900, 36100, 44200, 40500, 51800, 48620 + (dailySales - 48620)], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], sales: 292620 + dailySales - 48620, orders: 824 + dailyOrderCount - 124, average: 355, title: 'Sales by day' },
    '30 days': { values: [298000, 324000, 301000, 347000, 381000, 359000, 412000], labels: ['1–4', '5–8', '9–12', '13–16', '17–20', '21–24', '25–30'], sales: 2422000 + dailySales - 48620, orders: 6810 + dailyOrderCount - 124, average: 356, title: 'Sales by period' },
  }
  const report = reportConfig[range]
  const topItems = [
    { name: 'Chicken Dum Biryani', count: range === 'Today' ? 42 : range === '7 days' ? 286 : 1194, share: 86 },
    { name: 'Mutton Dum Biryani', count: range === 'Today' ? 31 : range === '7 days' ? 218 : 902, share: 68 },
    { name: 'Chicken 65', count: range === 'Today' ? 24 : range === '7 days' ? 176 : 731, share: 55 },
    { name: 'Mavalli Special Biryani', count: range === 'Today' ? 19 : range === '7 days' ? 141 : 608, share: 42 },
  ]
  return (
    <>
      <PageTitle eyebrow="BUSINESS INSIGHTS · SAMPLE DATA" title="Sales reports" copy="Understand sales, order volume, and the menu favourites bringing guests back." action={<button className="button-secondary" onClick={() => onExport(report, range)}><Icon name="download" size={16} /> Export CSV</button>} />
      <div className="report-range-bar panel"><div className="report-range-tabs" role="tablist" aria-label="Report period">{reportRanges.map((item) => <button key={item} className={range === item ? 'report-range-active' : ''} role="tab" aria-selected={range === item} onClick={() => setRange(item)}>{item}</button>)}</div><span><Icon name="clock" size={14} /> Updated just now · Sample data</span></div>
      <div className="metric-grid report-metric-grid">
        <MetricCard label={`${range} sales`} value={formatCurrency(report.sales)} change="+12.8%" note="vs. prior period" icon="reports" tone="orange" />
        <MetricCard label="Orders fulfilled" value={report.orders.toLocaleString('en-IN')} change="+8.4%" note="vs. prior period" icon="billing" tone="green" />
        <MetricCard label="Average order value" value={formatCurrency(report.average)} change="+4.2%" note="vs. prior period" icon="cart" tone="gold" />
        <MetricCard label="Menu items sold" value={range === 'Today' ? '326' : range === '7 days' ? '2,184' : '9,320'} change="Top seller" note="Chicken Dum Biryani" icon="food" tone="plum" />
      </div>
      <div className="reports-content-grid">
        <section className="panel report-chart-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">REVENUE TREND</span><h2>{report.title}</h2></div><span className="report-total">{formatCurrency(report.sales)}</span></div>
          <div className="report-chart-legend"><span><i /> {range} revenue</span><span>Compared to prior period <b>↑ 12.8%</b></span></div>
          <SalesChart values={report.values} labels={report.labels} />
          <div className="report-chart-bottom"><span>Figures shown are for demonstration purposes.</span><span>Currency · INR</span></div>
        </section>
        <section className="panel top-items-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">MENU PERFORMANCE</span><h2>Top selling items</h2></div><Icon name="food" size={18} /></div>
          <div className="top-item-list">{topItems.map((item, index) => <div className="top-item-row" key={item.name}><span className="top-item-rank">0{index + 1}</span><div className="top-item-copy"><b>{item.name}</b><span className="top-item-meter"><i style={{ width: `${item.share}%` }} /></span></div><span className="top-item-count">{item.count}<small>sold</small></span></div>)}</div>
          <div className="top-items-note"><Icon name="spark" size={14} /> Biryani leads this period&apos;s sales mix.</div>
        </section>
      </div>
    </>
  )
}

function BillModal({ receipt, onComplete, onClose, completed }) {
  if (!receipt) return null
  return (
    <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div className="receipt-modal-heading"><div><span className="panel-eyebrow">MAVALLI BIRYANI · DHARWAD</span><h2 id="receipt-title">{completed ? 'Demo bill complete' : 'Review your demo bill'}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close bill"><Icon name="close" size={18} /></button></div>
        {completed && <div className="receipt-success"><span><Icon name="check" size={16} /></span> Sale recorded in this demo. No payment was processed.</div>}
        <div className="receipt-paper">
          <div className="receipt-brand"><div><b>Mavalli Biryani</b><small>Dharwad · Restaurant POS Demo</small></div></div>
          <div className="receipt-meta"><span>Bill <b>{receipt.id}</b></span><span>{receipt.date}</span></div>
          <div className="receipt-meta"><span>{receipt.orderType}{receipt.table ? ` · Table ${receipt.table}` : ' · Walk-in'}</span><span>Payment · {receipt.paymentMethod} (demo)</span></div>
          <div className="receipt-rule" />
          <div className="receipt-items-heading"><span>ITEM</span><span>QTY</span><span>AMOUNT</span></div>
          {receipt.items.map((item) => <div className="receipt-item" key={item.id}><span>{item.name}</span><span>{item.quantity}</span><b>{formatCurrency(item.price * item.quantity)}</b></div>)}
          <div className="receipt-rule" />
          <div className="receipt-total-line"><span>Subtotal</span><b>{formatCurrency(receipt.subtotal)}</b></div>
          <div className="receipt-total-line"><span>CGST · 2.5%</span><b>{formatCurrency(Math.round(receipt.subtotal * 0.025))}</b></div>
          <div className="receipt-total-line"><span>SGST · 2.5%</span><b>{formatCurrency(receipt.tax - Math.round(receipt.subtotal * 0.025))}</b></div>
          <div className="receipt-rule" />
          <div className="receipt-grand-total"><span>TOTAL</span><b>{formatCurrency(receipt.total)}</b></div>
          <div className="receipt-demo-stamp">DEMO BILL · NOT A TAX INVOICE</div>
        </div>
        <div className="receipt-modal-actions">
          <button className="button-secondary" onClick={() => window.print()}><Icon name="print" size={16} /> Print bill</button>
          {completed ? <button className="button-primary" onClick={onClose}>Start another bill <Icon name="arrow" size={15} /></button> : <button className="button-primary" onClick={onComplete}>Complete demo sale <Icon name="check" size={16} /></button>}
        </div>
        {!completed && <p className="receipt-disclaimer"><Icon name="shield" size={14} /> This is a local simulation. No real payment or restaurant system is connected.</p>}
      </section>
    </div>
  )
}

function PosDemo() {
  const [activeScreen, setActiveScreen] = useState('overview')
  const [inventory, setInventory] = useState(initialInventory)
  const [tables, setTables] = useState(initialTables)
  const [orders, setOrders] = useState(initialOrders)
  const [dailySales, setDailySales] = useState(48620)
  const [dailyOrderCount, setDailyOrderCount] = useState(124)
  const [cart, setCart] = useState({})
  const [orderType, setOrderType] = useState('Dine in')
  const [selectedTable, setSelectedTable] = useState('01')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [notice, setNotice] = useState('')
  const [receipt, setReceipt] = useState(null)
  const [receiptCompleted, setReceiptCompleted] = useState(false)
  const [orderFilter, setOrderFilter] = useState('All orders')
  const [inventoryFilter, setInventoryFilter] = useState('All stock')
  const [reportRange, setReportRange] = useState('Today')
  const [focusedOrder, setFocusedOrder] = useState(null)
  const [toast, setToast] = useState('')

  const inventoryMap = useMemo(() => Object.fromEntries(inventory.map((item) => [item.id, item.quantity])), [inventory])
  const cartItems = menuItems.filter((item) => cart[item.id])
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax
  const activeTitle = navigation.find((item) => item.id === activeScreen)?.label || 'Overview'
  const orderCount = orders.filter((order) => order.status === 'Preparing' || order.status === 'Ready').length
  const lowStockCount = inventory.filter((item) => item.quantity <= item.par).length

  const availablePortions = (item) => {
    const limits = Object.entries(item.recipe).map(([id, amount]) => Math.floor((inventoryMap[id] || 0) / amount))
    return limits.length ? Math.min(...limits) : 0
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3500)
  }

  const addToCart = (item) => {
    if ((cart[item.id] || 0) >= availablePortions(item)) {
      setNotice(`Not enough stock for ${item.name}. Restock an ingredient in Inventory.`)
      return
    }
    setNotice('')
    setCart((current) => ({ ...current, [item.id]: (current[item.id] || 0) + 1 }))
  }

  const changeCart = (itemId, change) => {
    const item = menuItems.find((menuItem) => menuItem.id === itemId)
    if (change > 0 && (cart[itemId] || 0) >= availablePortions(item)) {
      setNotice(`Not enough stock for ${item.name}. Restock an ingredient in Inventory.`)
      return
    }
    setNotice('')
    setCart((current) => {
      const next = { ...current }
      const nextQuantity = (next[itemId] || 0) + change
      if (nextQuantity <= 0) delete next[itemId]
      else next[itemId] = nextQuantity
      return next
    })
  }

  const generateBill = () => {
    if (!itemCount) {
      setNotice('Add at least one menu item before generating a bill.')
      return
    }
    if (orderType === 'Dine in' && !tables.some((table) => table.id === selectedTable && table.status === 'Available')) {
      setNotice('Select an available table before generating a dine-in bill.')
      return
    }
    const billNumber = `MB-${String(1050 + orders.length).padStart(4, '0')}`
    setReceipt({
      id: billNumber,
      date: new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      orderType,
      table: orderType === 'Dine in' ? selectedTable : null,
      paymentMethod,
      items: cartItems.map((item) => ({ id: item.id, name: item.name, quantity: cart[item.id], price: item.price })),
      subtotal,
      tax,
      total,
    })
    setReceiptCompleted(false)
  }

  const completeDemoSale = () => {
    if (!receipt) return
    const order = {
      id: receipt.id,
      type: receipt.orderType,
      table: receipt.table,
      guest: receipt.table ? `Table ${receipt.table}` : 'Walk-in',
      items: receipt.items.map((item) => ({ name: item.name, quantity: item.quantity })),
      total: receipt.total,
      status: 'Preparing',
      time: new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
    }
    setOrders((current) => [order, ...current])
    setDailySales((current) => current + receipt.total)
    setDailyOrderCount((current) => current + 1)
    setInventory((current) => current.map((stockItem) => {
      const used = receipt.items.reduce((sum, billItem) => {
        const menuItem = menuItems.find((item) => item.id === billItem.id)
        return sum + (menuItem.recipe[stockItem.id] || 0) * billItem.quantity
      }, 0)
      return { ...stockItem, quantity: Math.max(0, Number((stockItem.quantity - used).toFixed(2))) }
    }))
    if (receipt.table) {
      setTables((current) => current.map((table) => table.id === receipt.table ? { ...table, status: 'Occupied', orderId: receipt.id } : table))
      const nextTable = tables.find((table) => table.id !== receipt.table && table.status === 'Available')
      setSelectedTable(nextTable?.id || '')
    }
    setCart({})
    setReceiptCompleted(true)
    setNotice('')
  }

  const adjustInventory = (id, change) => {
    setInventory((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(0, Number((item.quantity + change).toFixed(2))) } : item))
    showToast(change > 0 ? 'Sample stock replenished.' : 'Sample stock adjusted.')
  }

  const advanceOrder = (order) => {
    const nextStatus = order.status === 'Preparing' ? 'Ready' : 'Completed'
    setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status: nextStatus } : item))
    if (nextStatus === 'Completed' && order.table) {
      setTables((current) => current.map((table) => table.id === order.table ? { ...table, status: 'Available', orderId: undefined } : table))
    }
    showToast(`${order.id} marked ${nextStatus.toLowerCase()}.`)
  }

  const startTableOrder = (table) => {
    setSelectedTable(table.id)
    setOrderType('Dine in')
    setNotice('')
    setActiveScreen('billing')
  }

  const releaseTable = (table) => {
    setTables((current) => current.map((item) => item.id === table.id ? { ...item, status: 'Available' } : item))
    showToast(`Table ${table.id} is now available.`)
  }

  const viewTableOrder = (table) => {
    setOrderFilter('All orders')
    setFocusedOrder(table.orderId)
    setActiveScreen('orders')
  }

  const exportReport = (report, range) => {
    const csvRows = [
      ['MachMind360 POS Demo', `${range} sales report`],
      ['Metric', 'Sample value'],
      ['Sales', report.sales],
      ['Orders', report.orders],
      ['Average order value', Math.round(report.average)],
      [],
      [report.title, 'Sales (INR)'],
      ...report.labels.map((label, index) => [label, report.values[index]]),
    ]
    const csv = csvRows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `machmind360-pos-${range.replace(' ', '-').toLowerCase()}-report.csv`
    link.click()
    URL.revokeObjectURL(url)
    showToast('Sample sales report exported as CSV.')
  }

  const navigate = (screen) => {
    setActiveScreen(screen)
    setNotice('')
  }

  return (
    <div className="pos-app">
      <aside className="pos-sidebar">
        <a className="pos-sidebar-brand" href="/" aria-label="Return to MachMind360 website">
          <span className="pos-brand-wordmark">MachMind<span>360</span></span>
          <small>RESTAURANT SYSTEMS</small>
        </a>
        <div className="sidebar-workspace"><span className="sidebar-section-label">WORKSPACE</span><span className="sidebar-location"><Icon name="pin" size={15} /><span><b className="restaurant-brand-text">Mavalli Biryani</b><small>Dharwad · Demo branch</small></span><Icon name="chevron" size={14} /></span></div>
        <nav className="pos-sidebar-nav" aria-label="POS sections">
          <span className="sidebar-section-label">OPERATIONS</span>
          {navigation.map((item) => <button className={`pos-nav-item${activeScreen === item.id ? ' pos-nav-active' : ''}`} key={item.id} onClick={() => navigate(item.id)} title={item.label}><span className="pos-nav-icon"><Icon name={item.icon} size={19} /></span><span className="pos-nav-label">{item.label}</span>{item.id === 'orders' && orderCount > 0 && <span className="pos-nav-count">{orderCount}</span>}{item.id === 'inventory' && lowStockCount > 0 && <span className="pos-nav-alert">{lowStockCount}</span>}</button>)}
        </nav>
        <div className="pos-sidebar-footer"><div className="sidebar-demo-card"><span className="sidebar-demo-icon"><Icon name="spark" size={16} /></span><span><b>Demo workspace</b><small>Local sample data only</small></span></div><a className="back-to-marketing" href="/"><Icon name="arrow" size={15} /> Back to MachMind360</a></div>
      </aside>

      <div className="pos-main">
        <header className="pos-topbar">
          <div className="pos-breadcrumb"><span className="pos-topbar-wordmark">MachMind<span>360</span></span><span className="pos-breadcrumb-context">Restaurant POS</span><Icon name="chevron" size={13} /><b>{activeTitle}</b></div>
          <div className="pos-topbar-actions"><span className="topbar-demo-status"><i /> DEMO MODE</span><span className="topbar-date">{headerDateLabel}</span><span className="topbar-avatar">AK</span><span className="topbar-user"><b>Arjun K.</b><small>Manager</small></span><button className="mobile-back-link" onClick={() => { window.location.href = '/' }} aria-label="Back to MachMind360 website"><Icon name="home" size={18} /></button></div>
        </header>
        <div className="demo-safety-banner"><span className="safety-banner-icon"><Icon name="shield" size={15} /></span><p><b>Safe demo environment</b><span> All orders, stock, and reports are simulated locally. No restaurant database or payment service is connected.</span></p><span className="safety-banner-tag">SAMPLE DATA</span></div>

        <main className="pos-content-area">
          {activeScreen === 'overview' && <OverviewScreen onNavigate={navigate} dailySales={dailySales} dailyOrderCount={dailyOrderCount} orders={orders} inventory={inventory} />}
          {activeScreen === 'billing' && <BillingScreen menuStock={availablePortions} inventory={inventory} cart={cart} onAdd={addToCart} onChange={changeCart} onGenerate={generateBill} subtotal={subtotal} tax={tax} total={total} orderType={orderType} setOrderType={(value) => { setOrderType(value); setNotice('') }} selectedTable={selectedTable} setSelectedTable={setSelectedTable} tables={tables} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} notice={notice} setNotice={setNotice} />}
          {activeScreen === 'orders' && <OrdersScreen orders={orders} onAdvance={advanceOrder} filter={orderFilter} setFilter={setOrderFilter} focusedOrder={focusedOrder} onClearFocus={() => setFocusedOrder(null)} onNewBill={() => navigate('billing')} />}
          {activeScreen === 'tables' && <TablesScreen tables={tables} onStart={startTableOrder} onRelease={releaseTable} onViewOrder={viewTableOrder} />}
          {activeScreen === 'inventory' && <InventoryScreen inventory={inventory} onAdjust={adjustInventory} filter={inventoryFilter} setFilter={setInventoryFilter} />}
          {activeScreen === 'reports' && <ReportsScreen dailySales={dailySales} dailyOrderCount={dailyOrderCount} range={reportRange} setRange={setReportRange} onExport={exportReport} />}
        </main>
        <footer className="pos-app-footer"><span>MachMind360 · Restaurant POS</span><span><i /> All activity is simulated · Not connected to live systems</span></footer>
      </div>

      {toast && <div className="pos-toast" role="status"><Icon name="check" size={16} />{toast}</div>}
      <BillModal receipt={receipt} onComplete={completeDemoSale} onClose={() => { setReceipt(null); setReceiptCompleted(false) }} completed={receiptCompleted} />
    </div>
  )
}

export default PosDemo
