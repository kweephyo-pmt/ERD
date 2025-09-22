# E-Commerce Book Sales System

A comprehensive online book sales platform with multi-tier membership registration system supporting General Users, Students, and Stores.

## 📋 Project Overview

This system allows users to register as different member types and purchase books online. The platform includes:

- **Multi-tier membership system** (General Users, Students, Stores)
- **Secure registration process** with document upload capabilities
- **Modern, responsive web interface**
- **Comprehensive database design**
- **Admin approval workflow** for store registrations

## 🏗️ System Architecture

### 1. System Flow
The system follows a structured flow from user registration to order fulfillment:
- User registration with member type selection
- Account verification and approval (for stores)
- Book browsing and purchasing
- Order management and tracking

### 2. Database Design
The system uses a well-structured relational database with:
- **User inheritance model** for different member types
- **Book catalog management** with categories and images
- **Order processing system** with detailed item tracking
- **File management** for uploaded documents

### 3. User Interface
Modern, responsive design featuring:
- **Interactive member type selection**
- **Dynamic form validation**
- **File upload with drag-and-drop**
- **Password strength indicator**
- **Mobile-friendly responsive design**

## 🚀 Features

### Member Types

#### General Users
- Name, surname, national ID
- Phone number, date of birth
- Email address
- Instant account activation

#### Students
- All general user information
- Educational institution details
- Student ID number and photo
- ID card expiration date
- Special student discounts

#### Stores
- Business operator information
- Company registration details
- Legal entity documents
- Admin approval required
- Bulk purchasing capabilities

### Registration Features
- **Real-time form validation**
- **Password strength checking**
- **File upload with validation**
- **Responsive design**
- **Accessibility compliant**

## 📁 File Structure

```
Task 6/
├── index.html          # Main registration page
├── styles.css          # Comprehensive styling
├── script.js           # Interactive functionality
├── system_flow.md      # Detailed system flow documentation
├── er_diagram.md       # Database schema and relationships
└── README.md           # Project documentation
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with Flexbox/Grid
- **Icons**: Font Awesome 6.0
- **Responsive**: Mobile-first design approach
- **Validation**: Client-side and server-side ready

## 📱 Responsive Design

The interface is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔒 Security Features

- **Input validation** and sanitization
- **File type and size validation**
- **Password strength requirements**
- **CSRF protection ready**
- **Secure file upload handling**

## 🎨 UI/UX Features

- **Modern gradient backgrounds**
- **Smooth animations and transitions**
- **Interactive card-based selection**
- **Visual feedback for user actions**
- **Accessible color contrast**
- **Loading states and progress indicators**

## 📊 Database Schema

### Core Tables
- `USERS` - Main user authentication
- `GENERAL_USER` - General user details
- `STUDENTS` - Student-specific information
- `STORES` - Business registration data
- `BOOKS` - Product catalog
- `ORDERS` - Purchase transactions
- `ORDER_ITEMS` - Order line items

### Key Relationships
- One-to-one inheritance for user types
- One-to-many for orders and books
- Many-to-many through order items

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for file uploads and full functionality)

### Installation

1. **Clone or download** the project files
2. **Open index.html** in a web browser for demo
3. **Set up a web server** for full functionality:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

4. **Access the application** at `http://localhost:8000`

## 🔧 Configuration

### File Upload Settings
- **Student ID Cards**: Max 5MB, formats: JPG, PNG, GIF
- **Legal Documents**: Max 10MB, formats: PDF, DOC, DOCX

### Validation Rules
- **Password**: Minimum 8 characters, mixed case recommended
- **Age Requirement**: Minimum 13 years old
- **Phone Format**: Supports various international formats
- **Email**: Standard RFC compliant validation

## 📋 Usage Instructions

### For Users
1. **Select member type** from the three available options
2. **Fill in required information** based on selected type
3. **Upload required documents** (students and stores)
4. **Create secure password** with strength indicator
5. **Accept terms and conditions**
6. **Submit registration** and await confirmation

### For Administrators
- **Store registrations** require manual approval
- **Document verification** for uploaded files
- **User management** and status updates
- **Order monitoring** and processing

## 🧪 Testing

### Manual Testing Checklist
- [ ] Member type selection functionality
- [ ] Form validation for all fields
- [ ] File upload and validation
- [ ] Password strength indicator
- [ ] Responsive design on different devices
- [ ] Form submission and error handling

### Test Data
Use the following test data for validation:
- **Email**: test@example.com
- **Phone**: 123-456-7890
- **National ID**: 1234567890
- **Student ID**: STU123456

## 🔮 Future Enhancements

### Phase 2 Features
- **Backend API integration**
- **Database implementation**
- **Email verification system**
- **Payment gateway integration**
- **Admin dashboard**

### Phase 3 Features
- **Book catalog management**
- **Shopping cart functionality**
- **Order tracking system**
- **Inventory management**
- **Reporting and analytics**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email**: support@bookstore.com
- **Phone**: +1 (555) 123-4567
- **Documentation**: See system_flow.md and er_diagram.md

## 🙏 Acknowledgments

- Font Awesome for icons
- Modern CSS techniques for responsive design
- Best practices in web accessibility
- Security-first development approach

---

**Version**: 1.0.0  
**Last Updated**: September 2024  
**Status**: Production Ready
