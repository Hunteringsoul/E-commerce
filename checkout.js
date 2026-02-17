document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('checkoutItems') || document.getElementById('cart-items') || document.querySelector('.checkout-items') || document.querySelector('.cart-items');
    const totalEl = document.getElementById('checkoutTotal') || document.getElementById('cart-total') || document.querySelector('#checkoutTotal') || document.querySelector('.cart-total');

    if (!itemsContainer) {
        console.warn('items container not found (checked checkoutItems, cart-items, .checkout-items)');
        return;
    }

    console.log('localStorage keys:', Object.keys(localStorage));
    const raw = localStorage.getItem('cart') ?? localStorage.getItem('cartItems') ?? localStorage.getItem('checkoutCart') ?? '[]';
    console.log('cart raw:', raw);

    let cart = [];
    try { cart = JSON.parse(raw); } catch (e) { console.error('Invalid cart JSON', e); cart = []; }

    if (!Array.isArray(cart) || cart.length === 0) {
        itemsContainer.innerHTML = '<p class="empty">No items in cart</p>';
        if (totalEl) totalEl.textContent = '₹0.00';
        return;
    }

    // Helper: get numeric price from many possible keys and strings like "₹1,299.00"
    const parsePrice = value => {
        if (value == null) return 0;
        if (typeof value === 'number') return value;
        const s = String(value);
        // remove currency symbols, commas, spaces; keep digits and dot and minus
        const cleaned = s.replace(/[^\d.-]/g, '');
        const n = Number(cleaned);
        return Number.isFinite(n) ? n : 0;
    };

    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        // support different keys
        const rawPrice = item.price ?? item.unitPrice ?? item.amount ?? item.priceText ?? item.mrp ?? 0;
        const price = parsePrice(rawPrice);
        const qty = Number(item.qty ?? item.quantity ?? 1) || 1;
        total += price * qty;

        const div = document.createElement('div');
        div.className = 'checkout-item';
        // include image if available (item.image, item.img, item.imageUrl)
        const imgSrc = item.image ?? item.img ?? item.imageUrl ?? null;
        div.innerHTML = `
            <div class="ci-left" style="display:flex;gap:12px;align-items:center">
                ${imgSrc ? `<img src="${imgSrc}" alt="${(item.name||'item')}" style="width:60px;height:60px;object-fit:cover;border-radius:6px">` : ''}
                <div>
                    <div class="ci-name">${item.name ?? 'Item'}</div>
                    <div class="ci-meta">${qty} × ₹${price.toFixed(2)}</div>
                </div>
            </div>
            <div class="ci-right">₹${(price * qty).toFixed(2)}</div>
        `;
        itemsContainer.appendChild(div);
    });

    if (totalEl) totalEl.textContent = '₹' + total.toFixed(2);
});