# 🏪 Sales Management System

Complete CRUD system for managing customers, products, and sales with modern web interface using SweetAlert.

## 📋 Features

### ✅ **Implemented Functionality**
- **Complete CRUD**: Create, Read, Update, Delete for all entities
- **SweetAlert**: Modern interface with modals and confirmations
- **Validation**: Forms with required field validation
- **Relationships**: Sales connected with customers and products
- **Automatic calculations**: Sales total (price × quantity)

### 🏗️ **Architecture**
- **Backend**: Node.js + Express + MySQL
- **Frontend**: HTML + Vanilla JavaScript + SweetAlert
- **Database**: MySQL with table relationships

## 🚀 Installation and Setup

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Configure Database**
Create `.env` file in the project root:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

### 3. **Run Server**
```bash
npm start
# or
node src/server.js
```

### 4. **Access Application**
- **Products**: `http://localhost:3000/productos.html`
- **Customers**: `http://localhost:3000/clientes.html`
- **Sales**: `http://localhost:3000/ventas.html`

## 📁 Project Structure

```
esqueleto 2/
├── frontend/
│   ├── productos.html      # Product management
│   ├── productos.js        # Product CRUD logic
│   ├── clientes.html       # Customer management
│   ├── clientes.js         # Customer CRUD logic
│   ├── ventas.html         # Sales management
│   ├── ventas.js           # Sales CRUD logic
│   └── main.js             # Login logic
├── src/
│   ├── app.js              # Express configuration
│   ├── server.js           # Main server
│   ├── config/
│   │   └── db.js           # MySQL connection
│   ├── controllers/
│   │   ├── productos.controller.js
│   │   ├── clientes.controller.js
│   │   └── ventas.controller.js
│   ├── models/
│   │   ├── productos.model.js
│   │   ├── clientes.model.js
│   │   └── ventas.model.js
│   └── routes/
│       ├── productos.routes.js
│       ├── clientes.routes.js
│       └── ventas.routes.js
└── data/
    ├── cargarcsv.js        # CSV data loading script
    ├── clientes.csv
    ├── productos.csv
    └── ventas.csv
```

## 🗄️ Database

### **Main Tables**

#### **clientes (customers)**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `nombre` (VARCHAR) - name
- `correo` (VARCHAR) - email
- `telefono` (VARCHAR) - phone

#### **productos (products)**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `nombre` (VARCHAR) - name
- `precio` (DECIMAL) - price
- `stock` (INT) - stock

#### **ventas (sales)**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `cliente_id` (INT, FOREIGN KEY) - customer_id
- `producto_id` (INT, FOREIGN KEY) - product_id
- `cantidad` (INT) - quantity

### **Relationships**
- `ventas.cliente_id` → `clientes.id`
- `ventas.producto_id` → `productos.id`

## 🔧 API Endpoints

### **Products**
- `GET /productos` - Get all products
- `POST /productos` - Create product
- `PUT /productos/:id` - Update product
- `DELETE /productos/:id` - Delete product

### **Customers**
- `GET /clientes` - Get all customers
- `POST /clientes` - Create customer
- `PUT /clientes/:id` - Update customer
- `DELETE /clientes/:id` - Delete customer

### **Sales**
- `GET /ventas` - Get all sales
- `POST /ventas` - Create sale
- `PUT /ventas/:id` - Update sale
- `DELETE /ventas/:id` - Delete sale

## 🎯 Page Functionality

### **📦 Products** (`productos.html`)
- ✅ List all products
- ✅ Create new product (name, price, stock)
- ✅ Edit existing product
- ✅ Delete product with confirmation
- ✅ Required field validation

### **👥 Customers** (`clientes.html`)
- ✅ List all customers
- ✅ Create new customer (name, email, phone)
- ✅ Edit existing customer
- ✅ Delete customer with confirmation
- ✅ Required field validation

### **💰 Sales** (`ventas.html`)
- ✅ List all sales with details
- ✅ Create new sale (customer, product, quantity)
- ✅ Edit existing sale
- ✅ Delete sale with confirmation
- ✅ Automatic total calculation
- ✅ Dropdowns with available customers and products

## 🎨 UI Features

### **SweetAlert Integration**
- **Form modals** for create/edit
- **Confirmations** for delete
- **Custom success/error messages**
- **Real-time validation**

### **Responsive Design**
- Clean and modern interface
- Consistent button styles
- Clear and organized information

## ⚠️ Important Considerations

### **Foreign Key Constraints**
- **Products**: Cannot be deleted if they have associated sales
- **Customers**: Cannot be deleted if they have associated sales
- **Sales**: Can be deleted freely

### **Validations**
- All fields are required
- Quantity must be greater than 0
- Price must be a valid number
- Email must have valid format

## 🐛 Troubleshooting

### **Error 404 - Endpoint not found**
- Verify server is running on port 3000
- Confirm routes are properly configured

### **Error 500 - Server error**
- Verify database connection
- Check `.env` file and credentials
- Ensure tables exist in database

### **Foreign Key Error**
- Cannot delete parent records if they have children
- Delete associated sales first

## 📝 Development Notes

### **Deleted Files**
- `frontend/services/api.js` - Not used, direct fetch
- `frontend/services/` - Folder removed by user preference

### **Current Configuration**
- **No modularization**: Each entity has its own JS
- **Direct fetch**: No intermediate services
- **SweetAlert**: For all interactive UI

## 🔄 Suggested Improvements

- [ ] Add CSS styles for better presentation
- [ ] Implement pagination for large lists
- [ ] Add search filters
- [ ] Implement user authentication
- [ ] Add reports and statistics
- [ ] Implement stock validation when creating sales

## 📞 Support

For issues or questions:
1. Verify all dependencies are installed
2. Confirm database configuration
3. Check server logs for specific errors

---

**Developed with ❤️ using Node.js, Express, MySQL and SweetAlert**
