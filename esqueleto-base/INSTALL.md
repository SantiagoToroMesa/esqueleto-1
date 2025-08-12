# 🚀 Installation Guide

Step-by-step guide to set up the CRUD skeleton project.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🔧 Setup Steps

### 1. **Clone or Download the Skeleton**
```bash
# If you have the skeleton files, navigate to the directory
cd esqueleto-base
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Database Setup**

#### Create Database
```sql
CREATE DATABASE your_database;
```

#### Run Schema
```bash
# Import the schema file in your MySQL client
mysql -u your_username -p your_database < database/schema.sql
```

### 4. **Environment Configuration**

#### Copy Environment File
```bash
cp env.example .env
```

#### Edit .env File
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

### 5. **Start the Application**
```bash
npm start
```

### 6. **Access the Application**
- Open your browser and go to: `http://localhost:3000/entity1.html`
- You should see the Entity 1 management interface

## 🎯 Customization Steps

### 1. **Rename Entities**
Replace all occurrences of:
- `entity1` → `your_entity_name`
- `Entity1` → `YourEntityName`

### 2. **Update Database Schema**
Modify `database/schema.sql` to match your entity structure.

### 3. **Update Models**
Modify the model files in `src/models/` to match your database fields.

### 4. **Update Controllers**
Modify the controller files in `src/controllers/` if needed.

### 5. **Update Frontend**
- Modify HTML files in `frontend/`
- Update JavaScript files to match your entity structure
- Customize CSS styles

### 6. **Update Routes**
Modify route files in `src/routes/` if needed.

## 🔍 Testing

### Test API Endpoints
```bash
# Test GET all entities
curl http://localhost:3000/entity1

# Test POST create entity
curl -X POST http://localhost:3000/entity1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Entity","description":"Test Description"}'

# Test PUT update entity
curl -X PUT http://localhost:3000/entity1/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Entity","description":"Updated Description"}'

# Test DELETE entity
curl -X DELETE http://localhost:3000/entity1/1
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database exists

#### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using the port

#### Module Not Found
- Run `npm install` again
- Check if all dependencies are in `package.json`

## 📝 Next Steps

1. **Customize the skeleton** for your specific needs
2. **Add authentication** if required
3. **Add more validation** rules
4. **Implement pagination** for large datasets
5. **Add search and filtering** functionality
6. **Style the interface** with custom CSS
7. **Add unit tests**
8. **Deploy to production**

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all setup steps were completed
3. Check database connectivity
4. Review the README.md for additional information

---

**Happy coding! 🎉**
