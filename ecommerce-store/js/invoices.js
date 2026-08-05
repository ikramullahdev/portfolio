// ===============================
// Invoice Management
// ===============================

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const invoiceList = document.getElementById("invoice-list");

const modal = document.getElementById("invoice-modal");

const addBtn = document.getElementById("add-invoice-btn");

const closeBtn = document.getElementById("close-invoice");

const saveBtn = document.getElementById("save-invoice");

const customerInput = document.getElementById("invoice-customer");

const amountInput = document.getElementById("invoice-amount");

const statusInput = document.getElementById("invoice-status");


// ===============================
// Save Local Storage
// ===============================

function saveInvoices(){

    localStorage.setItem("invoices", JSON.stringify(invoices));

}


// ===============================
// Invoice ID
// ===============================

function generateInvoiceId(){

    return "INV-" + (1001 + invoices.length);

}


// ===============================
// Render Invoice Table
// ===============================

function renderInvoices(){

    if(!invoiceList) return;

    invoiceList.innerHTML = "";

    invoices.forEach((invoice,index)=>{

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


// ===============================
// Open Modal
// ===============================

if(addBtn){

    addBtn.onclick = ()=>{

        modal.style.display="flex";

    };

}


// ===============================
// Close Modal
// ===============================

if(closeBtn){

    closeBtn.onclick = ()=>{

        modal.style.display="none";

    };

}


// ===============================
// Save Invoice
// ===============================

if(saveBtn){

saveBtn.onclick = ()=>{

    const customer = customerInput.value.trim();

    const amount = amountInput.value;

    const status = statusInput.value;

    if(customer==="" || amount===""){

        alert("Please fill all fields");

        return;

    }

    const invoice={

        id:generateInvoiceId(),

        customer:customer,

        amount:amount,

        status:status,

        date:new Date().toLocaleDateString()

    };

    invoices.push(invoice);

    saveInvoices();

    renderInvoices();

    modal.style.display="none";

    customerInput.value="";

    amountInput.value="";

};

}


// ===============================
// Delete Invoice
// ===============================

function deleteInvoice(index){

    if(confirm("Delete this invoice?")){

        invoices.splice(index,1);

        saveInvoices();

        renderInvoices();

    }

}


// ===============================
// Load
// ===============================

renderInvoices();
