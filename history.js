// history.js

document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("historyList");
    const historyData = JSON.parse(localStorage.getItem("paymentHistory")) || [];

    if (historyData.length === 0) {
        historyList.innerHTML = `
            <div class="text-center p-4">
                <p class="text-muted">No transactions found yet.</p>
            </div>`;
        return;
    }

    // Generate transaction rows with download button
    historyList.innerHTML = historyData.map((tx, index) => `
        <div class="transaction-item" data-index="${index}">
            <div class="item-id">ID: ${tx.id}</div>
            <div class="item-main">
                <span class="item-amount">${tx.currency} ${tx.amount}</span>
                <br/>
                <span class="item-date">${tx.date}</span>
            </div>
            <button class="download-btn" 
                    title="Download receipt as text" 
                    onclick="downloadTransaction(${index})">
                ⬇
            </button>
        </div>
    `).join('');
});

// Download single transaction as simple text receipt
function downloadTransaction(index) {
    const history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const tx = history[index];

    if (!tx) {
        alert("Transaction not found.");
        return;
    }

    const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>esyPay Receipt</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      margin: 0;
      padding: 2rem;
    }
    .receipt {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 18px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      box-shadow: 0 18px 35px rgba(15, 23, 42, 0.14);
      padding: 2rem 2.2rem;
    }
    .receipt h1 {
      margin: 0 0 0.5rem;
      font-size: 1.8rem;
      letter-spacing: 0.02em;
      color: #4338ca;
    }
    .receipt .subtitle {
      margin: 0 0 1.6rem;
      color: #64748b;
      font-size: 0.95rem;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin: 0.75rem 0;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    }
    .row:last-child { border-bottom: none; }
    .row .label { font-weight: 600; color: #334155; }
    .row .value { color: #0f172a; }
    .total {
      margin-top: 1.6rem;
      padding-top: 1.1rem;
      border-top: 1px solid rgba(148, 163, 184, 0.35);
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .footer {
      margin-top: 1.8rem;
      font-size: 0.9rem;
      color: #64748b;
      text-align: center;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <h1>esyPay Receipt</h1>
    <p class="subtitle">Thank you for your payment. Keep this receipt for your records.</p>

    <div class="row">
      <div class="label">Transaction ID</div>
      <div class="value">${tx.id}</div>
    </div>

    <div class="row">
      <div class="label">Date & Time</div>
      <div class="value">${tx.date}</div>
    </div>

    <div class="row">
      <div class="label">Amount Paid</div>
      <div class="value">${tx.amount} ${tx.currency}</div>
    </div>

    <div class="row">
      <div class="label">Converted from</div>
      <div class="value">INR</div>
    </div>

    <div class="total">
      <div>Total</div>
      <div>${tx.amount} ${tx.currency}</div>
    </div>

    <div class="footer">
    </div>
  </div>
</body>
</html>
`;

    const safeDate = tx.date
        .replace(/[^0-9]/g, '-')
        .replace(/--+/g, '-')
        .slice(0, 16);

    const filename = `esypay_${tx.id}_${safeDate}.html`;

    const blob = new Blob([receiptHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}