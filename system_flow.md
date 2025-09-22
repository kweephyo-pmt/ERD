# E-Commerce Book Sales System Flow

## 1. System Flow Overview

### Main User Journey Flow

**Step 1: System Access**
- User visits the e-commerce website
- System displays homepage with navigation options

**Step 2: User Authentication Check**
- If user is already registered and logged in, proceed to Step 4
- If user is not registered, proceed to Step 3
- If user is registered but not logged in, redirect to login page

**Step 3: Registration Process**
- User selects "Register" option
- System displays member type selection (General User, Student, Store)
- User selects appropriate member type
- System displays corresponding registration form
- User fills in required information based on member type
- User uploads required documents (for Students and Stores)
- User submits registration form
- System validates all information
- For General Users and Students: Account is automatically approved
- For Stores: Registration goes to admin for manual approval
- System sends confirmation email to user
- Account becomes active (immediately for General/Student, after approval for Stores)

**Step 4: Book Browsing and Selection**
- User accesses book catalog
- System displays available books with categories, prices, and images
- User can filter books by category, price range, author, or title
- User views detailed book information including description and availability
- User selects desired books and quantities

**Step 5: Shopping Cart Management**
- Selected books are added to shopping cart
- User can modify quantities or remove items from cart
- System calculates total price including any applicable discounts
- User reviews cart contents before checkout

**Step 6: Order Processing**
- User proceeds to checkout
- System requests shipping information
- User selects payment method
- User confirms order details
- System generates unique order number
- System processes payment through payment gateway
- System updates inventory levels
- System creates order record with "Confirmed" status

**Step 7: Order Fulfillment**
- System changes order status to "Processing"
- Warehouse staff picks and packs items
- System updates order status to "Shipped"
- Shipping tracking information is provided to customer
- System updates order status to "Delivered" upon delivery confirmation
- Order process is complete

## 2. Detailed Process Flows

### 2.1 Registration Process Flow

**Phase 1: Member Type Selection**
- User clicks "Register" button on homepage
- System displays three member type options: General User, Student, Store
- User selects appropriate member type
- System loads corresponding registration form

**Phase 2: Information Collection**
- **For General Users**: System requests Name, Surname, National ID, Phone Number, Date of Birth, Email Address
- **For Students**: System requests Name, Surname, Educational Institution, Student ID Number, Student ID Card Photo, ID Card Expiration Date, Email Address, Date of Birth, Phone Number
- **For Stores**: System requests Business Operator Name, Business Name, Legal Entity Registration Number, Legal Entity Documents, Email Address, Phone Number

**Phase 3: Form Submission and Validation**
- User completes all required fields
- User uploads necessary documents (Students: ID card photo, Stores: legal documents)
- User submits registration form
- System performs client-side validation for required fields and format
- System performs server-side validation for data integrity

**Phase 4: Approval Process**
- **For General Users and Students**: System automatically approves registration
- **For Stores**: System flags registration for admin review
- System creates user account with appropriate status (Active or Pending)

**Phase 5: Confirmation**
- System sends confirmation email to user
- **For General Users and Students**: Account is immediately active
- **For Stores**: User receives notification that registration is under review
- Admin reviews store applications and approves or rejects
- System notifies store applicants of approval decision

### 2.2 Book Purchase Flow

**Phase 1: Book Discovery**
- User logs into the system
- System displays personalized homepage with book recommendations
- User accesses book catalog through navigation menu
- System presents books organized by categories with search and filter options

**Phase 2: Book Search and Filtering**
- User can filter books by multiple criteria:
  - **By Category**: Fiction, Non-fiction, Educational, Science, History, etc.
  - **By Price Range**: User sets minimum and maximum price limits
  - **By Author**: Search for specific authors or browse author listings
  - **By Title**: Direct title search with auto-complete suggestions
- System displays filtered results with pagination for large result sets

**Phase 3: Book Details Review**
- User clicks on specific book to view detailed information
- System displays comprehensive book details including:
  - **Book Images**: Multiple high-resolution photos from different angles
  - **Price Information**: Current price, any discounts, student pricing if applicable
  - **Book Description**: Synopsis, author information, publication details
  - **Availability Status**: In stock, out of stock, or limited quantity remaining
- User can read reviews and ratings from other customers

**Phase 4: Shopping Cart Management**
- User selects desired quantity and adds book to cart
- System provides immediate feedback confirming addition to cart
- User can choose to continue shopping or proceed to checkout
- If continuing shopping, user returns to catalog browsing
- System maintains cart contents throughout shopping session

**Phase 5: Checkout Process**
- User reviews cart contents and can modify quantities or remove items
- System calculates subtotal, applicable taxes, and shipping costs
- User enters or confirms shipping address information
- User selects preferred payment method (credit card, PayPal, etc.)
- User reviews final order summary including all costs

**Phase 6: Order Completion**
- User confirms order placement
- System generates unique order number for tracking
- System processes payment through secure payment gateway
- System updates book inventory levels to reflect purchase
- System sends order confirmation email with order details and tracking information
- Order enters fulfillment process for shipping preparation

### 2.3 Order Management Flow

**Phase 1: Order Creation**
- System creates new order record when user completes checkout
- Order is assigned unique order number and timestamp
- Initial order status is set to "Pending"
- System logs all order details including items, quantities, and customer information

**Phase 2: Payment Processing**
- System initiates payment verification with payment gateway
- **If Payment Successful**:
  - Order status changes to "Confirmed"
  - System proceeds to inventory verification
- **If Payment Failed**:
  - Order status changes to "Payment Failed"
  - System notifies user of payment issue
  - Order is cancelled and inventory is not affected

**Phase 3: Inventory Verification**
- System checks current stock levels for all ordered items
- **If All Items Available**:
  - Order status changes to "Processing"
  - System reserves inventory for the order
  - Order proceeds to fulfillment
- **If Items Unavailable**:
  - Order status changes to "Backordered"
  - System notifies user with estimated restock date
  - Order waits in queue until inventory is replenished

**Phase 4: Order Fulfillment**
- Warehouse staff receives pick list for confirmed orders
- Staff locates and picks items from inventory
- Items are packed according to shipping requirements
- Order status changes to "Shipped"
- Shipping label and tracking number are generated

**Phase 5: Delivery and Completion**
- Package is handed to shipping carrier
- System provides tracking information to customer
- Customer can monitor delivery progress through tracking system
- Upon delivery confirmation, order status changes to "Delivered"
- Order is marked as complete in the system
- Customer receives delivery confirmation email

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
