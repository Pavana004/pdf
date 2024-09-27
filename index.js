const openPopupBtn = document.getElementById("openPopupBtn");
const popupContainer = document.getElementById("popupContainer");
const closePopupBtn = document.getElementById("closePopupBtn");

openPopupBtn.addEventListener("click", () => {
  popupContainer.style.display = "flex";
  popupContainer.style.flexDirection = "column";
});

closePopupBtn.addEventListener("click", () => {
  popupContainer.style.display = "none";
});

// Date Functionality

const currentDate = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const day = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear().toString().slice(-2);

const formattedDate = `Date : ${day}-${month}-${year}`;
document.getElementById("date-display").textContent = formattedDate;

document.getElementById("add-row-btn").addEventListener("click", addRow);

function addRow() {
  const tableBody = document.getElementById("table-body");

  // Create a new table row
  const row = document.createElement("tr");

  row.innerHTML = `
        <td><i class="bi bi-three-dots-vertical "></i></td>
        <td><input type="text" placeholder="Title" id="Title" required></td>
        <td><input type="text" placeholder="Description" id="Description" required></td>
        <td><input type="number" placeholder="Price" id="Price" required></td>
        <td><input type="number" placeholder="Quantity" id="Quantity" required></td>
        <td><input type="text" placeholder="Unit" id="Unit" required></td>
       
    `;

  tableBody.appendChild(row);

  row.querySelector(".bi").addEventListener("click", function () {
    row.remove();
  });
}

function generateInvoice() {
  const randomId = Math.random().toString(36).substring(2, 10);
  document.getElementById("randomId").value = randomId;

  const business = document.getElementById("business").value;
  const business_address = document.getElementById("business_address").value;
  const business_phone = document.getElementById("business_phone").value;
  const business_email = document.getElementById("business_email").value;
  const client = document.getElementById("client").value;
  const client_address = document.getElementById("client_address").value;
  const client_phone = document.getElementById("client_phone").value;
  const client_email = document.getElementById("client_email").value;
  const payment_date = document.getElementById("paymentDate").value;
  const invoice_Date = document.getElementById("invoiceDate").value;
  const Title = document.getElementById("Title").value;
  const Description = document.getElementById("Description").value;
  const Price = document.getElementById("Price").value;
  const Quantity = document.getElementById("Quantity").value;
  const Unit = document.getElementById("Unit").value;
  const invoiceNote = document.getElementById("invoiceNote").value;

  // Create a new jsPDF instance
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Company Info
  doc.setFontSize(16);
  doc.text(business, 170, 30, { align: "left" });

  doc.setFontSize(8);
  doc.text(business_address, 170, 35, { align: "left" });
  doc.text(business_email, 170, 40, { align: "left" });
  doc.text(business_phone, 170, 45, { align: "left" });

  doc.setDrawColor(0);
  doc.line(10, 50, 200, 50); // Draw a line

  // Customer Info
  doc.setFontSize(8);
  doc.text("Invocie issued for :", 14, 55);
  doc.setFontSize(16);
  doc.text(client, 14, 60);
  doc.setFontSize(8);
  doc.text(client_address, 14, 65);
  doc.text(client_email, 14, 70);
  doc.text(client_phone, 14, 75);

  doc.setFontSize(16);
  doc.text("Invoice #:" + randomId, 170, 60, { align: "left" });

  doc.setFontSize(8);
  doc.text(payment_date, 170, 65, { align: "left" });
  doc.text(invoice_Date, 170, 70, { align: "left" });

  // Invoice Table Header
  doc.setFontSize(10);
  doc.text("#", 10, 100);
  doc.text("Title", 14, 100);
  doc.text("Description", 80, 100);
  doc.text("Price", 130, 100);
  doc.text("Quantity", 160, 100);
  doc.text("Unit", 190, 100);

  doc.setDrawColor(0);
  doc.line(10, 50, 200, 50); // Draw a line

  doc.setFontSize(10);
  doc.text("#", 10, 105);
  doc.text(Title, 14, 105);
  doc.text(Description, 80, 105);
  doc.text(Price, 130, 105);
  doc.text(Quantity, 160, 105);
  doc.text(Unit, 190, 105);

  // Save the PDF
  doc.save("invoice.pdf");
}
