const elements = {
    inrInput:       document.getElementById("inrAmount"),
    resultOutput:   document.getElementById("billAmount"),
    convertBtn:     document.getElementById("convertButton"),
    payBtn:         document.getElementById("payBtn"),
    currencySelect: document.getElementById("selectDropdown"),
    denomination:   document.getElementById("denomination"),
    clearBtn:       document.getElementById("clearAmount")
};

elements.payBtn.disabled = true;

let debounceTimer;
elements.inrInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const amountStr = elements.inrInput.value.trim();
        const selected = elements.currencySelect.value;
        if (amountStr && !isNaN(amountStr) && parseFloat(amountStr) > 0 && selected) {
            elements.convertBtn.click();
        }
    }, 650);
});


elements.clearBtn.addEventListener('click', () => {
    elements.inrInput.value = "";
    elements.resultOutput.value = "";
    elements.denomination.innerText = "";
    elements.payBtn.disabled = true;
    elements.inrInput.focus();
});


elements.convertBtn.addEventListener('click', async () => {
    const amountStr = elements.inrInput.value.trim();
    const amountInr = parseFloat(amountStr);
    const selectedCurrency = elements.currencySelect.value;

    if (!amountStr || isNaN(amountInr) || amountInr <= 0 || !selectedCurrency) {
        alert("Please enter a valid amount in INR and select a currency.");
        return;
    }

    elements.convertBtn.disabled = true;
    const originalText = elements.convertBtn.innerHTML;
    elements.convertBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Converting...
    `;

    try {
        const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.min.json";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        const rates = data.inr;
        const rate = rates[selectedCurrency.toLowerCase()];

        if (!rate) {
            alert(`Sorry, ${selectedCurrency} rate is not available right now.`);
            return;
        }

        const converted = amountInr * rate;
        elements.resultOutput.value = converted.toFixed(2);
        elements.denomination.innerText = selectedCurrency;
        elements.payBtn.disabled = false;

        console.log(`Success: ${amountInr} INR ≈ ${converted.toFixed(2)} ${selectedCurrency}`);
    } catch (err) {
        console.error(err);
        alert("Could not fetch exchange rates.\nCheck your internet connection.");
    } finally {
        elements.convertBtn.disabled = false;
        elements.convertBtn.innerHTML = originalText;
    }
});


function proceedToPayment() {
    if (elements.resultOutput.value && parseFloat(elements.resultOutput.value) > 0) {
        localStorage.setItem("amountToPay", elements.resultOutput.value);
        localStorage.setItem("currency", elements.denomination.innerText);
        navigateWithTransition("payment.html");
    } else {
        alert("Please convert an amount first!");
    }
}
function pay() {
    const cardName   = document.getElementById("cardName")?.value.trim();
    const cardNumber = document.getElementById("cardNumber")?.value.trim();
    const cvv        = document.getElementById("cvv")?.value.trim();

    const savedCard  = JSON.parse(localStorage.getItem("cardDetails"));
    const amount     = localStorage.getItem("amountToPay");
    const currency   = localStorage.getItem("currency");

    if (!savedCard) {
        alert("No card details saved. Please save your card first.");
        return;
    }
    if (!cardName || !cardNumber || !cvv) {
        alert("Please fill all card details.");
        return;
    }

    if (cardName === savedCard.cardName &&
        cardNumber === savedCard.cardNumber &&
        cvv === savedCard.cvv) {

        const loading = document.getElementById("loadingOverlay");
        if (loading) loading.style.display = "flex";

        setTimeout(() => {
            const txId = Math.floor(Math.random() * 1000000000000);
            const date = new Date().toLocaleString();

            const newTransaction = {
                id: txId,
                date: date,
                amount: amount,
                currency: currency
            };

            let history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
            history.unshift(newTransaction);
            localStorage.setItem("paymentHistory", JSON.stringify(history));

            if (loading) loading.style.display = "none";

            alert(`Payment Successful!\n\nID: ${txId}\nDate: ${date}`);

            setTimeout(() => navigateWithTransition("history.html"), 1000);
        }, 1000);
    } else {
        alert("Invalid card details. Please try again.");
    }
}


function back() {
    navigateWithTransition("convertion.html");
}

function history() {
    navigateWithTransition("history.html");
}