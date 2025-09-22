# E-Commerce Book Sales System - ER Diagram

## Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     USERS       │         │   GENERAL_USER  │         │    STUDENTS     │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ user_id (PK)    │◄────────┤ user_id (FK)    │         │ user_id (FK)    │◄────────┐
│ email           │         │ name            │         │ name            │         │
│ password_hash   │         │ surname         │         │ surname         │         │
│ user_type       │         │ national_id     │         │ institution     │         │
│ status          │         │ phone           │         │ student_id      │         │
│ created_at      │         │ date_of_birth   │         │ id_card_photo   │         │
│ updated_at      │         └─────────────────┘         │ id_expiry_date  │         │
└─────────────────┘                                     │ email           │         │
        │                                               │ date_of_birth   │         │
        │                                               │ phone           │         │
        │                                               └─────────────────┘         │
        │                                                                           │
        │                   ┌─────────────────┐                                   │
        │                   │     STORES      │                                   │
        │                   ├─────────────────┤                                   │
        └───────────────────┤ user_id (FK)    │                                   │
                            │ operator_name   │                                   │
                            │ business_name   │                                   │
                            │ registration_no │                                   │
                            │ legal_docs      │                                   │
                            │ email           │                                   │
                            │ phone           │                                   │
                            │ approval_status │                                   │
                            └─────────────────┘                                   │
                                                                                  │
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐     │
│     BOOKS       │         │   BOOK_IMAGES   │         │   CATEGORIES    │     │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤     │
│ book_id (PK)    │◄────────┤ image_id (PK)   │         │ category_id(PK) │     │
│ title           │         │ book_id (FK)    │         │ category_name   │     │
│ author          │         │ image_url       │         │ description     │     │
│ isbn            │         │ image_order     │         └─────────────────┘     │
│ description     │         │ alt_text        │                  │              │
│ price           │         └─────────────────┘                  │              │
│ category_id(FK) │◄─────────────────────────────────────────────┘              │
│ stock_quantity  │                                                              │
│ status          │         ┌─────────────────┐                                 │
│ created_at      │         │     ORDERS      │                                 │
│ updated_at      │         ├─────────────────┤                                 │
└─────────────────┘         │ order_id (PK)   │                                 │
        │                   │ user_id (FK)    │◄────────────────────────────────┘
        │                   │ order_number    │
        │                   │ order_date      │
        │                   │ total_amount    │
        │                   │ status          │
        │                   │ shipping_addr   │
        │                   │ payment_method  │
        │                   │ payment_status  │
        │                   │ created_at      │
        │                   │ updated_at      │
        │                   └─────────────────┘
        │                           │
        │                           │
        │                   ┌─────────────────┐
        └───────────────────┤ ORDER_ITEMS     │
                            ├─────────────────┤
                            │ order_item_id(PK)│
                            │ order_id (FK)   │◄─────────────────┘
                            │ book_id (FK)    │
                            │ quantity        │
                            │ unit_price      │
                            │ total_price     │
                            └─────────────────┘
```

## Detailed Entity Descriptions

### 1. USERS (Main User Table)
- **user_id** (Primary Key): Unique identifier for each user
- **email**: User's email address (unique)
- **password_hash**: Encrypted password
- **user_type**: ENUM('general', 'student', 'store')
- **status**: ENUM('active', 'inactive', 'pending', 'suspended')
- **created_at**: Registration timestamp
- **updated_at**: Last modification timestamp

### 2. GENERAL_USER (Inherits from USERS)
- **user_id** (Foreign Key): References USERS.user_id
- **name**: First name
- **surname**: Last name
- **national_id**: National ID card number (unique)
- **phone**: Phone number
- **date_of_birth**: Date of birth

### 3. STUDENTS (Inherits from USERS)
- **user_id** (Foreign Key): References USERS.user_id
- **name**: First name
- **surname**: Last name
- **institution**: Educational institution name
- **student_id**: Student ID number
- **id_card_photo**: File path to student ID card image
- **id_expiry_date**: Student ID card expiration date
- **email**: Student email
- **date_of_birth**: Date of birth
- **phone**: Phone number

### 4. STORES (Inherits from USERS)
- **user_id** (Foreign Key): References USERS.user_id
- **operator_name**: Business operator's name
- **business_name**: Official business name
- **registration_no**: Legal entity registration number
- **legal_docs**: File path to legal entity documents
- **email**: Business email
- **phone**: Business phone number
- **approval_status**: ENUM('pending', 'approved', 'rejected')

### 5. CATEGORIES
- **category_id** (Primary Key): Unique identifier for book categories
- **category_name**: Name of the category (e.g., Fiction, Science, History)
- **description**: Category description

### 6. BOOKS
- **book_id** (Primary Key): Unique identifier for each book
- **title**: Book title
- **author**: Book author
- **isbn**: International Standard Book Number
- **description**: Book description
- **price**: Book price
- **category_id** (Foreign Key): References CATEGORIES.category_id
- **stock_quantity**: Available inventory
- **status**: ENUM('available', 'out_of_stock', 'discontinued')
- **created_at**: When book was added
- **updated_at**: Last modification timestamp

### 7. BOOK_IMAGES
- **image_id** (Primary Key): Unique identifier for each image
- **book_id** (Foreign Key): References BOOKS.book_id
- **image_url**: Path to the image file
- **image_order**: Order of image display (1 = primary image)
- **alt_text**: Alternative text for accessibility

### 8. ORDERS
- **order_id** (Primary Key): Unique identifier for each order
- **user_id** (Foreign Key): References USERS.user_id
- **order_number**: Human-readable order number (e.g., ORD-2024-001)
- **order_date**: Date when order was placed
- **total_amount**: Total order amount
- **status**: ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')
- **shipping_addr**: Shipping address (JSON or separate table)
- **payment_method**: Payment method used
- **payment_status**: ENUM('pending', 'completed', 'failed', 'refunded')
- **created_at**: Order creation timestamp
- **updated_at**: Last status update

### 9. ORDER_ITEMS
- **order_item_id** (Primary Key): Unique identifier for each order item
- **order_id** (Foreign Key): References ORDERS.order_id
- **book_id** (Foreign Key): References BOOKS.book_id
- **quantity**: Number of books ordered
- **unit_price**: Price per book at time of order
- **total_price**: Total price for this line item (quantity × unit_price)

## Relationships

1. **USERS → GENERAL_USER/STUDENTS/STORES**: One-to-One inheritance relationship
2. **CATEGORIES → BOOKS**: One-to-Many (one category can have many books)
3. **BOOKS → BOOK_IMAGES**: One-to-Many (one book can have multiple images)
4. **USERS → ORDERS**: One-to-Many (one user can have many orders)
5. **ORDERS → ORDER_ITEMS**: One-to-Many (one order can have many items)
6. **BOOKS → ORDER_ITEMS**: One-to-Many (one book can appear in many order items)

## Indexes for Performance

```sql
-- Primary Keys (automatically indexed)
-- Additional indexes for performance:

CREATE INDEX idx_users_email ON USERS(email);
CREATE INDEX idx_users_type_status ON USERS(user_type, status);
CREATE INDEX idx_books_category ON BOOKS(category_id);
CREATE INDEX idx_books_status ON BOOKS(status);
CREATE INDEX idx_orders_user_date ON ORDERS(user_id, order_date);
CREATE INDEX idx_orders_status ON ORDERS(status);
CREATE INDEX idx_order_items_order ON ORDER_ITEMS(order_id);
CREATE INDEX idx_order_items_book ON ORDER_ITEMS(book_id);
```

## Constraints

```sql
-- Foreign Key Constraints
ALTER TABLE GENERAL_USER ADD CONSTRAINT fk_general_user FOREIGN KEY (user_id) REFERENCES USERS(user_id);
ALTER TABLE STUDENTS ADD CONSTRAINT fk_students FOREIGN KEY (user_id) REFERENCES USERS(user_id);
ALTER TABLE STORES ADD CONSTRAINT fk_stores FOREIGN KEY (user_id) REFERENCES USERS(user_id);
ALTER TABLE BOOKS ADD CONSTRAINT fk_books_category FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id);
ALTER TABLE BOOK_IMAGES ADD CONSTRAINT fk_book_images FOREIGN KEY (book_id) REFERENCES BOOKS(book_id);
ALTER TABLE ORDERS ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES USERS(user_id);
ALTER TABLE ORDER_ITEMS ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES ORDERS(order_id);
ALTER TABLE ORDER_ITEMS ADD CONSTRAINT fk_order_items_book FOREIGN KEY (book_id) REFERENCES BOOKS(book_id);

-- Unique Constraints
ALTER TABLE USERS ADD CONSTRAINT uk_users_email UNIQUE (email);
ALTER TABLE GENERAL_USER ADD CONSTRAINT uk_general_national_id UNIQUE (national_id);
ALTER TABLE STUDENTS ADD CONSTRAINT uk_students_student_id UNIQUE (student_id);
ALTER TABLE STORES ADD CONSTRAINT uk_stores_registration_no UNIQUE (registration_no);
ALTER TABLE ORDERS ADD CONSTRAINT uk_orders_number UNIQUE (order_number);

-- Check Constraints
ALTER TABLE BOOKS ADD CONSTRAINT chk_books_price CHECK (price >= 0);
ALTER TABLE BOOKS ADD CONSTRAINT chk_books_stock CHECK (stock_quantity >= 0);
ALTER TABLE ORDER_ITEMS ADD CONSTRAINT chk_order_items_quantity CHECK (quantity > 0);
ALTER TABLE ORDER_ITEMS ADD CONSTRAINT chk_order_items_price CHECK (unit_price >= 0);
```
