// ===============================
// Invoice Management
// ===============================

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const invoiceList = document.getElementById("invoice-list");

function saveInvoices() {
    localStorage.setItem("invoices", JSON.stringify(invoices));
}

function generateInvoiceId() {
    return "INV-" + (1001 + invoices.length);
}

function renderInvoices() {

    if (!invoiceList) return;

    invoiceList.innerHTML = "";

    invoices.forEach((invoice, index) => {

        invoiceList.innerHTML += `

        <tr>

            <td>${invoice.id}</td>

            <td>${invoice.customer}</td>

            <td>${invoice.date}</td>

            <td>$${invoice.amount}</td>

            <td>${invoice.status}</td>

            <td>

                <button onclick="deleteInvoice(${index})">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

function deleteInvoice(index){

    if(confirm("Delete this invoice?")){

        invoices.splice(index,1);

        saveInvoices();

        renderInvoices();

    }

}

renderInvoices();
