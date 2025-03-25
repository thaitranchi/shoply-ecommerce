# Shoply — E-commerce Platform

Shoply is a full-stack e-commerce platform built with Django Rest Framework (DRF) and React.js, offering a secure and scalable solution for modern online stores. It provides essential features such as JWT authentication, product management, order processing, and a responsive UI.

⸻

### 🚀 Features
	•	🔑 Authentication: JWT-based secure login and registration.
	•	📦 Product Management: Full CRUD operations for products.
	•	🛒 Order Management: Cart functionality with order tracking.
	•	💳 Secure Payments: (Planned integration with Stripe/PayPal).
	•	🛂 Role-Based Access: Admin and user management.
	•	📱 Responsive Design: Mobile-first, user-friendly interface.

⸻

### 🛠️ Technologies Used

#### Backend:
	•	Django — Python web framework.
	•	Django Rest Framework (DRF) — API development.
	•	PostgreSQL — Relational database.
	•	JWT (JSON Web Tokens) — Secure authentication.

#### Frontend:
	•	React.js — Modern frontend library.
	•	Redux Toolkit — State management.
	•	Axios — HTTP requests.
	•	Tailwind CSS / Material UI — Styling & UI components.

⸻

### ⚙️ Getting Started

#### Prerequisites:
	•	Python 3.8+
	•	Node.js v16+
	•	PostgreSQL (or preferred database)
	•	Git

⸻

### 🏗️ Installation

#### ✅ Backend Setup
	1.	Clone the repository:

git clone https://github.com/yourusername/shoply.git
cd shoply/backend

	2.	Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

	3.	Install dependencies:

pip install -r requirements.txt

	4.	Create a .env file:

SECRET_KEY=your_django_secret_key
DEBUG=True
DB_NAME=shoply_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

	5.	Apply migrations:

python manage.py makemigrations
python manage.py migrate

	6.	Create a superuser:

python manage.py createsuperuser

	7.	Run the backend server:

python manage.py runserver



⸻

#### ✅ Frontend Setup
	1.	Navigate to the frontend directory:

cd ../frontend

	2.	Install dependencies:

npm install

	3.	Create a .env file:

REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_JWT_SECRET=your_jwt_secret

	4.	Run the frontend server:

npm start



⸻

### 📂 Project Structure
```
Shoply/
├── backend/
│   ├── manage.py
│   ├── .env
│   ├── shoply/             # Django project
│   ├── products/           # Product app
│   └── orders/             # Order app
├── frontend/
│   ├── public/
│   ├── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── utils/
│   └── .env
```

⸻

### 🔍 API Endpoints

Auth:
	•	POST /api/auth/register — Register a new user.
	•	POST /api/auth/login — Authenticate and receive JWT.

Products:
	•	GET /api/products — List all products.
	•	POST /api/products — Create a new product (Admin).

Orders:
	•	GET /api/orders — Get user orders.
	•	POST /api/orders — Place a new order.

⸻

### 🤝 Contributing

Contributions are welcome!
	1.	Fork the repository.
	2.	Create a feature branch:

git checkout -b feature/AmazingFeature

	3.	Commit your changes:

git commit -m "Add AmazingFeature"

	4.	Push to the branch:

git push origin feature/AmazingFeature

	5.	Open a pull request.

⸻

### 📝 License

This project is released under The Unlicense — a public domain dedication.
```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this 
software, either in source code form or as a compiled binary, for any purpose, 
commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this 
software dedicate any and all copyright interest in the software to the public 
domain. We make this dedication for the benefit of the public at large and to 
the detriment of our heirs and successors. We intend this dedication to be an 
overt act of relinquishment in perpetuity of all present and future rights to 
this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
For more information, please refer to <https://unlicense.org>



⸻

### 📫 Contact

Trần Chí Thái — LinkedIn
Email: chithai1999@gmail.com

⸻
