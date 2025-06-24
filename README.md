# 🏪 PawnShop Pro - Loan Management Dashboard

A modern, responsive web application for managing pawn shop loans with authentication, payment processing, and comprehensive dashboard analytics.

## ✨ Features

- 🔐 **Secure Authentication** - Login system with session management
- 💳 **Payment Processing** - Make loan payments with confirmation
- 📊 **Interactive Dashboard** - Real-time loan analytics and charts
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔔 **Notifications** - Payment reminders and loan status updates
- 📈 **Data Visualization** - Charts for loan trends and statistics
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS

**Demo Credentials:**
- Username: `admin`
- Password: `password123`

## 🛠️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS v3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Create React App
- **State Management:** React Hooks
- **Storage:** LocalStorage for session persistence

## 📦 Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pawn-shop-dashboard.git
   cd pawn-shop-dashboard
```

2. **Install dependencies**

```shellscript
npm install
```


3. **Configure Tailwind CSS**

```shellscript
npx tailwindcss init -p
```


4. **Start the development server**

```shellscript
npm start
```


5. **Open your browser**

```plaintext
Navigate to http://localhost:3000
```




### Alternative Setup (From Scratch)

```shellscript
# Create new React app with TypeScript
npx create-react-app pawn-shop-dashboard --template typescript

# Navigate to project
cd pawn-shop-dashboard

# Install required dependencies
npm install recharts lucide-react

# Install Tailwind CSS
npm install -D tailwindcss@^3.0.0 postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Start development server
npm start
```

## 🎯 Usage

### Login

1. Open the application
2. Use demo credentials:

1. Username: `admin`
2. Password: `password123`



3. Click "Sign In"


### Dashboard Navigation

- **Summary Cards:** View loan statistics at a glance
- **Charts:** Analyze borrowing trends and loan status distribution
- **Loan Table:** Manage individual loans with filtering and sorting
- **Notifications:** Check payment reminders and updates


### Making Payments

1. Find an active loan in the loan table
2. Click "Make Payment" button
3. Enter payment amount and select method
4. Click "Pay Now" to process
5. View confirmation on success page


### Additional Features

- **Dark Mode:** Toggle using the moon/sun icon in header
- **Filtering:** Filter loans by status (All/Active/Overdue/Completed)
- **Sorting:** Sort by date, amount, or other criteria
- **Pagination:** Navigate through multiple pages of loans


## 📁 Project Structure

```plaintext
pawn-shop-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LoginPage.tsx          # Authentication component
│   │   └── PaymentSuccessPage.tsx # Payment confirmation
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles with Tailwind
│   └── index.tsx                  # Application entry point
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
└── README.md                      # Project documentation
```

## 🔧 Available Scripts

```shellscript
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

## 🎨 Customization

### Adding New Loan Data

Edit the `mockLoans` array in `src/App.tsx`:

```typescript
const mockLoans = [
  {
    id: 1,
    productName: "Your Item",
    pawnedDate: "2024-01-15",
    estimatedValue: 2500,
    approvedAmount: 2000,
    interestRate: 5.5,
    repaymentDeadline: "2024-07-15",
    status: "Active",
    monthlyPayment: 110,
    totalInterest: 550,
  }
  // Add more loans here
]
```

### Modifying Authentication

Update the login credentials in the `handleLogin` function:

```typescript
if (username.trim() === "your-username" && password === "your-password") {
  // Authentication logic
}
```

### Styling Changes

Modify Tailwind classes throughout the components or update `tailwind.config.js` for theme customization.

## 🚀 Deployment

### Deploy to Vercel

```shellscript
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```shellscript
npm run build
# Upload dist folder to Netlify
```

### Deploy to GitHub Pages

```shellscript
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👨‍💻 Author

**Your Name**

- GitHub: [https://github.com/shalinivv]
- Email: [shaliniv35029@gmail.com]


## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful chart components
- Lucide for the icon library

```



# 🏪 PawnShop Pro - Loan Management Dashboard

A modern, responsive web application for managing pawn shop loans with authentication, payment processing, and comprehensive dashboard analytics.

## ✨ Features

- 🔐 **Secure Authentication** - Login system with session management
- 💳 **Payment Processing** - Make loan payments with confirmation
- 📊 **Interactive Dashboard** - Real-time loan analytics and charts
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔔 **Notifications** - Payment reminders and loan status updates
- 📈 **Data Visualization** - Charts for loan trends and statistics
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS

**Demo Credentials:**
- Username: `admin`
- Password: `password123`

## 🛠️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS v3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Create React App
- **State Management:** React Hooks
- **Storage:** LocalStorage for session persistence

## 📦 Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pawn-shop-dashboard.git
   cd pawn-shop-dashboard
```

2. **Install dependencies**

```shellscript
npm install
```


3. **Configure Tailwind CSS**

```shellscript
npx tailwindcss init -p
```


4. **Start the development server**

```shellscript
npm start
```


5. **Open your browser**

```plaintext
Navigate to http://localhost:3000
```




### Alternative Setup (From Scratch)

```shellscript
# Create new React app with TypeScript
npx create-react-app pawn-shop-dashboard --template typescript

# Navigate to project
cd pawn-shop-dashboard

# Install required dependencies
npm install recharts lucide-react

# Install Tailwind CSS
npm install -D tailwindcss@^3.0.0 postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Start development server
npm start
```

## 🎯 Usage

### Login

1. Open the application
2. Use demo credentials:

1. Username: `admin`
2. Password: `password123`



3. Click "Sign In"


### Dashboard Navigation

- **Summary Cards:** View loan statistics at a glance
- **Charts:** Analyze borrowing trends and loan status distribution
- **Loan Table:** Manage individual loans with filtering and sorting
- **Notifications:** Check payment reminders and updates


### Making Payments

1. Find an active loan in the loan table
2. Click "Make Payment" button
3. Enter payment amount and select method
4. Click "Pay Now" to process
5. View confirmation on success page


### Additional Features

- **Dark Mode:** Toggle using the moon/sun icon in header
- **Filtering:** Filter loans by status (All/Active/Overdue/Completed)
- **Sorting:** Sort by date, amount, or other criteria
- **Pagination:** Navigate through multiple pages of loans


## 📁 Project Structure

```plaintext
pawn-shop-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LoginPage.tsx          # Authentication component
│   │   └── PaymentSuccessPage.tsx # Payment confirmation
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles with Tailwind
│   └── index.tsx                  # Application entry point
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
└── README.md                      # Project documentation
```

## 🔧 Available Scripts

```shellscript
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

## 🎨 Customization

### Adding New Loan Data

Edit the `mockLoans` array in `src/App.tsx`:

```typescript
const mockLoans = [
  {
    id: 1,
    productName: "Your Item",
    pawnedDate: "2024-01-15",
    estimatedValue: 2500,
    approvedAmount: 2000,
    interestRate: 5.5,
    repaymentDeadline: "2024-07-15",
    status: "Active",
    monthlyPayment: 110,
    totalInterest: 550,
  }
  // Add more loans here
]
```

### Modifying Authentication

Update the login credentials in the `handleLogin` function:

```typescript
if (username.trim() === "your-username" && password === "your-password") {
  // Authentication logic
}
```

### Styling Changes

Modify Tailwind classes throughout the components or update `tailwind.config.js` for theme customization.

## 🚀 Deployment

### Deploy to Vercel

```shellscript
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```shellscript
npm run build
# Upload dist folder to Netlify
```

### Deploy to GitHub Pages

```shellscript
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👨‍💻 Author

**Your Name**

- GitHub: [https://github.com/shalinivv]
- Email: [shaliniv35029@gmail.com]


## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful chart components
- Lucide for the icon library

```







