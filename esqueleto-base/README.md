# 🏗️ Project Skeleton

Base skeleton for a CRUD application with Node.js, Express, MySQL and SweetAlert.

## 📋 Features

### ✅ **Base Functionality**
- **Complete CRUD**: Create, Read, Update, Delete for all entities
- **SweetAlert**: Modern interface with modals and confirmations
- **Validation**: Forms with required field validation
- **Relationships**: Connected entities with foreign keys
- **Automatic calculations**: Computed fields when needed

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
- **Entity 1**: `http://localhost:3000/entity1.html`
- **Entity 2**: `http://localhost:3000/entity2.html`
- **Entity 3**: `http://localhost:3000/entity3.html`

## 📁 Project Structure

```
project-skeleton/
├── frontend/
│   ├── entity1.html         # Entity 1 management
│   ├── entity1.js           # Entity 1 CRUD logic
│   ├── entity2.html         # Entity 2 management
│   ├── entity2.js           # Entity 2 CRUD logic
│   ├── entity3.html         # Entity 3 management
│   ├── entity3.js           # Entity 3 CRUD logic
│   └── main.js              # Main logic
├── src/
│   ├── app.js               # Express configuration
│   ├── server.js            # Main server
│   ├── config/
│   │   └── db.js            # MySQL connection
│   ├── controllers/
│   │   ├── entity1.controller.js
│   │   ├── entity2.controller.js
│   │   └── entity3.controller.js
│   ├── models/
│   │   ├── entity1.model.js
│   │   ├── entity2.model.js
│   │   └── entity3.model.js
│   └── routes/
│       ├── entity1.routes.js
│       ├── entity2.routes.js
│       └── entity3.routes.js
└── data/
    ├── loadData.js          # Data loading script
    ├── entity1.csv
    ├── entity2.csv
    └── entity3.csv
```

## 🗄️ Database Structure

### **Main Tables**

#### **entity1**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name` (VARCHAR)
- `description` (TEXT)
- `created_at` (TIMESTAMP)

#### **entity2**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `phone` (VARCHAR)

#### **entity3**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `entity1_id` (INT, FOREIGN KEY)
- `entity2_id` (INT, FOREIGN KEY)
- `quantity` (INT)

### **Relationships**
- `entity3.entity1_id` → `entity1.id`
- `entity3.entity2_id` → `entity2.id`

## 🔧 API Endpoints

### **Entity 1**
- `GET /entity1` - Get all records
- `POST /entity1` - Create record
- `PUT /entity1/:id` - Update record
- `DELETE /entity1/:id` - Delete record

### **Entity 2**
- `GET /entity2` - Get all records
- `POST /entity2` - Create record
- `PUT /entity2/:id` - Update record
- `DELETE /entity2/:id` - Delete record

### **Entity 3**
- `GET /entity3` - Get all records
- `POST /entity3` - Create record
- `PUT /entity3/:id` - Update record
- `DELETE /entity3/:id` - Delete record

## 🎯 Page Functionality

### **📦 Entity 1** (`entity1.html`)
- ✅ List all records
- ✅ Create new record
- ✅ Edit existing record
- ✅ Delete record with confirmation
- ✅ Required field validation

### **👥 Entity 2** (`entity2.html`)
- ✅ List all records
- ✅ Create new record
- ✅ Edit existing record
- ✅ Delete record with confirmation
- ✅ Required field validation

### **💰 Entity 3** (`entity3.html`)
- ✅ List all records with details
- ✅ Create new record
- ✅ Edit existing record
- ✅ Delete record with confirmation
- ✅ Dropdowns with available entities

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
- **Entity 1**: Cannot be deleted if referenced by Entity 3
- **Entity 2**: Cannot be deleted if referenced by Entity 3
- **Entity 3**: Can be deleted freely

### **Validations**
- All fields are required
- Numeric fields must be valid numbers
- Email fields must have valid format

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
- Delete child records first

## 📝 Development Notes

### **Configuration**
- **No modularization**: Each entity has its own JS
- **Direct fetch**: No intermediate services
- **SweetAlert**: For all interactive UI

## 🔄 Customization Steps

1. **Rename entities**: Replace `entity1`, `entity2`, `entity3` with your actual entity names
2. **Update database schema**: Modify table structures in models
3. **Customize fields**: Update form fields in HTML and JavaScript
4. **Add validations**: Implement specific business rules
5. **Style interface**: Add CSS for better presentation

## 📞 Support

For issues or questions:
1. Verify all dependencies are installed
2. Confirm database configuration
3. Check server logs for specific errors

---

**Base skeleton for CRUD applications with Node.js, Express, MySQL and SweetAlert**
