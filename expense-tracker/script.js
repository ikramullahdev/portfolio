const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const text = document.getElementById("text");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const list = document.getElementById("list");
const filterCategory = document.getElementById("filterCategory");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let filteredTransactions = [];
let editingId = null;

// Set today's date as default
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toISOString().split('T')[0];
    date.value = today;
    displayTransactions();
    loadTheme();
});

// Add or Update Transaction
function addTransaction() {
    if (text.value === "" || amount.value === "") {
        alert("Please enter transaction details");
        return;
    }

    if (editingId !== null) {
        // Update existing transaction
        const transaction = transactions.find(t => t.id === editingId);
        if (transaction) {
            transaction.text = text.value;
            transaction.category = category.value;
            transaction.amount = Number(amount.value);
            transaction.date = date.value;
            editingId = null;
        }
    } else {
        // Add new transaction
        const transaction = {
            id: Date.now(),
            text: text.value,
            category: category.value,
            amount: Number(amount.value),
            date: date.value || new Date().toISOString().split('T')[0]
        };
        transactions.push(transaction);
    }

    updateLocalStorage();
    displayTransactions();
    clearForm();
}

// Clear Form
function clearForm() {
    text.value = "";
    amount.value = "";
    category.value = "Food";
    const today = new Date().toISOString().split('T')[0];
    date.value = today;
    editingId = null;
    document.querySelector(".add-btn").textContent = "➕ Add Transaction";
}

// Display Transactions
function displayTransactions() {
    list.innerHTML = "";

    const toDisplay = filterCategory.value ? 
        transactions.filter(t => t.category === filterCategory.value) : 
        transactions;

    if (toDisplay.length === 0) {
        list.innerHTML = `<div class="empty-state"><p>📭 No transactions yet. Start adding!</p></div>`;
        updateBalance();
        return;
    }

    // Sort by date (newest first)
    toDisplay.sort((a, b) => new Date(b.date) - new Date(a.date));

    toDisplay.forEach(function(item) {
        const li = document.createElement("li");
        li.className = item.amount > 0 ? "income" : "expense";

        const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        li.innerHTML = `
            <div class="transaction-info">
                <span class="transaction-name">${escapeHtml(item.text)}</span>
                <span class="transaction-meta">${item.category} • ${formattedDate}</span>
            </div>
            <div class="transaction-actions">
                <span class="transaction-amount" style="color: ${item.amount > 0 ? '#10b981' : '#ef4444'}">
                    ${item.amount > 0 ? '+' : ''}$${Math.abs(item.amount).toFixed(2)}
                </span>
                <button class="edit-btn" onclick="editTransaction(${item.id})">✏️</button>
                <button class="delete-btn" onclick="deleteTransaction(${item.id})">🗑️</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateBalance();
}

// Filter Transactions
function filterTransactions() {
    displayTransactions();
}

// Edit Transaction
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        text.value = transaction.text;
        category.value = transaction.category;
        amount.value = transaction.amount;
        date.value = transaction.date;
        editingId = id;
        document.querySelector(".add-btn").textContent = "✅ Update Transaction";
        text.focus();
    }
}

// Delete Transaction
function deleteTransaction(id) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        transactions = transactions.filter(item => item.id !== id);
        updateLocalStorage();
        displayTransactions();
    }
}

// Clear All Transactions
function clearAll() {
    if (confirm("Are you sure you want to delete ALL transactions? This cannot be undone!")) {
        transactions = [];
        updateLocalStorage();
        displayTransactions();
        clearForm();
    }
}

// Update Balance
function updateBalance() {
    let amounts = transactions.map(item => item.amount);

    let total = amounts.reduce((sum, item) => sum + item, 0);

    let inc = amounts
        .filter(item => item > 0)
        .reduce((sum, item) => sum + item, 0);

    let exp = amounts
        .filter(item => item < 0)
        .reduce((sum, item) => sum + item, 0);

    balance.innerText = "$" + total.toFixed(2);
    income.innerText = "$" + inc.toFixed(2);
    expense.innerText = "$" + Math.abs(exp).toFixed(2);
}

// Local Storage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Dark Mode Toggle
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateThemeButton();
}

function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateThemeButton();
}

function updateThemeButton() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    document.querySelector(".theme-btn").textContent = isDarkMode ? "☀️" : "🌙";
}

// Allow Enter key to add transaction
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && (e.target === text || e.target === amount || e.target === date)) {
        addTransaction();
    }
});
