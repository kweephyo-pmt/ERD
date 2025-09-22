# E-Commerce Book Sales System Flow

## 1. System Flow Overview

### Main User Journey Flow:

```
START
  ↓
User Access System
  ↓
Is User Registered? → NO → Registration Process
  ↓                        ↓
 YES                   Select Member Type
  ↓                        ↓
Login                  Fill Registration Form
  ↓                        ↓
Browse Books           Submit Registration
  ↓                        ↓
Select Books           Admin Approval (for Stores)
  ↓                        ↓
Add to Cart            Account Created
  ↓                        ↓
Checkout               Login
  ↓                        ↓
Payment                Browse Books
  ↓                        ↓
Order Confirmation          ↓
  ↓                        ↓
Order Processing    ←←←←←←←←←
  ↓
Order Fulfillment
  ↓
END
```

## 2. Detailed Process Flows

### 2.1 Registration Process Flow

```
User Clicks "Register"
  ↓
Select Member Type:
├── General User
├── Student  
└── Store
  ↓
Fill Required Information:
├── General User: Name, Surname, National ID, Phone, DOB
├── Student: Name, Surname, Institution, Student ID, ID Card Photo, 
│           Expiration Date, Email, DOB, Phone
└── Store: Operator Name, Business Name, Registration Number,
          Legal Documents, Email, Phone
  ↓
Submit Registration
  ↓
System Validation
  ↓
Is Store Registration? → YES → Admin Review Required
  ↓                           ↓
 NO                      Pending Approval Status
  ↓                           ↓
Auto-Approve            Admin Approves/Rejects
  ↓                           ↓
Send Confirmation       Notify User of Decision
  ↓                           ↓
Account Active          If Approved → Account Active
```

### 2.2 Book Purchase Flow

```
User Logged In
  ↓
Browse Book Catalog
  ↓
Filter/Search Books
├── By Category
├── By Price Range
├── By Author
└── By Title
  ↓
View Book Details
├── Book Images
├── Price Information
├── Book Description
└── Availability Status
  ↓
Add to Cart
  ↓
Continue Shopping? → YES → Browse More Books
  ↓
 NO
  ↓
Review Cart
  ↓
Proceed to Checkout
  ↓
Enter Shipping Information
  ↓
Select Payment Method
  ↓
Confirm Order
  ↓
Generate Order Number
  ↓
Process Payment
  ↓
Update Inventory
  ↓
Send Order Confirmation
  ↓
Order Fulfillment Process
```

### 2.3 Order Management Flow

```
Order Created
  ↓
Order Status: "Pending"
  ↓
Payment Verification
  ↓
Payment Confirmed? → NO → Order Status: "Payment Failed"
  ↓                       ↓
 YES                  Notify User
  ↓                       ↓
Order Status: "Confirmed" Cancel Order
  ↓
Inventory Check
  ↓
Items Available? → NO → Order Status: "Backordered"
  ↓                     ↓
 YES                Notify User & Estimated Date
  ↓                     ↓
Order Status: "Processing" Wait for Stock
  ↓                     ↓
Pick & Pack Items  ←←←←←←
  ↓
Order Status: "Shipped"
  ↓
Delivery Tracking
  ↓
Order Status: "Delivered"
  ↓
Order Complete
```

## 3. System Components

### 3.1 User Management
- Registration system with three member types
- Authentication and authorization
- Profile management
- Password reset functionality

### 3.2 Book Management
- Book catalog with images and details
- Inventory management
- Category and search functionality
- Price management

### 3.3 Order Management
- Shopping cart functionality
- Order processing
- Payment integration
- Order tracking and status updates

### 3.4 Administrative Functions
- Store registration approval
- Book inventory management
- Order monitoring
- User management
- Sales reporting

## 4. Security Considerations

- Secure user authentication
- Data encryption for sensitive information
- File upload validation for student ID cards and legal documents
- Payment security compliance
- Admin approval workflow for store registrations

## 5. Integration Points

- Payment gateway integration
- Email notification system
- File storage for uploaded documents
- Inventory management system
- Shipping and logistics integration
