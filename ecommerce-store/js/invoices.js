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

        </tr>`;
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

function printInvoiceByInvoice(index){

    const invoices = getInvoices();

    const invoice = invoices[index];

    const win = window.open("", "_blank");

    win.document.write(`
        <html>
        <head>
            <title>NovaShop Invoice</title>
        </head>
        <body>

        <h1>NovaShop</h1>

        <hr>

        <h2>Invoice</h2>

        <p><strong>Invoice:</strong> ${invoice.id}</p>

        <p><strong>Customer:</strong> ${invoice.customer}</p>

        <p><strong>Date:</strong> ${invoice.date}</p>

        <p><strong>Amount:</strong> $${invoice.amount}</p>

        <p><strong>Status:</strong> ${invoice.status}</p>

        </body>
        </html>
    `);

    win.document.close();

    win.print();

}

renderInvoices();
