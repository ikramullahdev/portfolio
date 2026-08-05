// ===============================
// Invoice Management
// ===============================

const invoiceList = document.getElementById("invoice-list");

function getInvoices() {
    return JSON.parse(localStorage.getItem("invoices")) || [];
}

function saveInvoices(invoices) {
    localStorage.setItem("invoices", JSON.stringify(invoices));
}

function renderInvoices() {

    if (!invoiceList) return;

    const invoices = getInvoices();

    invoiceList.innerHTML = "";

    if (invoices.length === 0) {

        invoiceList.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                No invoices available
            </td>
        </tr>`;
        return;
    }

    invoices.forEach((invoice, index) => {

        invoiceList.innerHTML += `
        <tr>

            <td>${invoice.id}</td>
            <td>${invoice.customer}</td>
            <td>${invoice.date}</td>
            <td>$${invoice.amount}</td>
            <td>${invoice.status}</td>

            <td>

                <button onclick="viewInvoice(${index})">
                    👁 View
                </button>

                <button onclick="printInvoiceByInvoice(${index})">
                    🖨 Print
                </button>

                <button onclick="deleteInvoice(${index})">
                    🗑 Delete
                </button>

            </td>

        </tr>
        `;

    });

}

function deleteInvoice(index){

    if(!confirm("Delete this invoice?")) return;

    const invoices = getInvoices();

    invoices.splice(index,1);

    saveInvoices(invoices);

    renderInvoices();

}

function viewInvoice(index){

    const invoices = getInvoices();

    const invoice = invoices[index];

    alert(
`Invoice ID : ${invoice.id}

Customer : ${invoice.customer}

Amount : $${invoice.amount}

Status : ${invoice.status}

Date : ${invoice.date}`
    );

}

// ================= PROFESSIONAL PRINT =================

function printInvoiceByInvoice(index){

    const invoices = getInvoices();

    const invoice = invoices[index];

    let productsHTML = "";

    (invoice.items || []).forEach(item=>{

        productsHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity || 1}</td>
            <td>$${item.price}</td>
            <td>$${((item.quantity || 1) * item.price).toFixed(2)}</td>
        </tr>
        `;

    });

    const win = window.open("", "_blank");

    win.document.write(`

<!DOCTYPE html>

<html>

<head>

<title>${invoice.id}</title>

<style>

body{
font-family:Arial,sans-serif;
background:#f5f5f5;
padding:40px;
}

.invoice{
max-width:900px;
margin:auto;
background:#fff;
padding:40px;
border-radius:10px;
box-shadow:0 5px 20px rgba(0,0,0,.15);
}

.header{
display:flex;
justify-content:space-between;
border-bottom:3px solid #2563eb;
padding-bottom:20px;
}

.logo{
font-size:34px;
font-weight:bold;
color:#2563eb;
}

table{
width:100%;
border-collapse:collapse;
margin-top:30px;
}

th{
background:#2563eb;
color:#fff;
padding:12px;
}

td{
padding:12px;
border:1px solid #ddd;
}

.total{
text-align:right;
margin-top:30px;
}

.status{
display:inline-block;
padding:8px 18px;
background:#22c55e;
color:#fff;
border-radius:20px;
margin-top:10px;
}

.footer{
margin-top:40px;
text-align:center;
color:#777;
}

</style>

</head>

<body>

<div class="invoice">

<div class="header">

<div class="logo">

NovaShop

</div>

<div>

<h2>TAX INVOICE</h2>

<p>${invoice.id}</p>

<p>${invoice.date}</p>

</div>

</div>

<br>

<h3>Customer Information</h3>

<p><strong>${invoice.customer}</strong></p>

<p>${invoice.email || ""}</p>

<p>${invoice.phone || ""}</p>

<p>${invoice.address || ""}</p>

<table>

<tr>

<th>Product</th>

<th>Qty</th>

<th>Price</th>

<th>Total</th>

</tr>

${productsHTML}

</table>

<div class="total">

<h2>Total : $${invoice.amount}</h2>

<div class="status">

${invoice.status}

</div>

</div>

<div class="footer">

<p>Thank you for shopping with NovaShop ❤️</p>

<p>This is a computer generated invoice.</p>

</div>

</div>

<script>

window.onload=function(){

window.print();

}

</script>

</body>

</html>

`);

    win.document.close();

}

renderInvoices();
