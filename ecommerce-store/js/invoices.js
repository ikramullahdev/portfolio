// ===============================
// Automatic Invoice Management
// ===============================

const invoiceList = document.getElementById("invoice-list");

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

function renderInvoices() {

    if (!invoiceList) return;

    invoiceList.innerHTML = "";

    if (invoices.length === 0) {

        invoiceList.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                No invoices found
            </td>
        </tr>
        `;

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

        localStorage.setItem(
            "invoices",
            JSON.stringify(invoices)
        );

        renderInvoices();

    }

}

renderInvoices();
