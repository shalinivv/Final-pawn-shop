"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import {
  Bell,
  CreditCard,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  User,
  PieChart,
  BarChart3,
  LogOut,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"
import LoginPage from "./components/LoginPage"
import PaymentSuccessPage from "./components/PaymentSuccessPage"

// Mock data
const mockLoans = [
  {
    id: 1,
    productName: "Gold Necklace",
    pawnedDate: "2024-01-15",
    estimatedValue: 2500,
    approvedAmount: 2000,
    interestRate: 5.5,
    repaymentDeadline: "2024-07-15",
    status: "Active",
    monthlyPayment: 110,
    totalInterest: 550,
  },
  {
    id: 2,
    productName: "Diamond Ring",
    pawnedDate: "2023-12-01",
    estimatedValue: 5000,
    approvedAmount: 4000,
    interestRate: 4.8,
    repaymentDeadline: "2024-06-01",
    status: "Overdue",
    monthlyPayment: 200,
    totalInterest: 960,
  },
  {
    id: 3,
    productName: "Laptop (MacBook Pro)",
    pawnedDate: "2024-02-20",
    estimatedValue: 1800,
    approvedAmount: 1400,
    interestRate: 6.2,
    repaymentDeadline: "2024-08-20",
    status: "Active",
    monthlyPayment: 85,
    totalInterest: 434,
  },
  {
    id: 4,
    productName: "Rolex Watch",
    pawnedDate: "2023-10-10",
    estimatedValue: 8000,
    approvedAmount: 6500,
    interestRate: 4.5,
    repaymentDeadline: "2024-04-10",
    status: "Completed",
    monthlyPayment: 325,
    totalInterest: 1462,
  },
  {
    id: 5,
    productName: "Silver Jewelry Set",
    pawnedDate: "2024-03-05",
    estimatedValue: 1200,
    approvedAmount: 950,
    interestRate: 5.8,
    repaymentDeadline: "2024-09-05",
    status: "Active",
    monthlyPayment: 60,
    totalInterest: 276,
  },
]

const mockNotifications = [
  {
    id: 1,
    type: "warning",
    title: "Payment Due Soon",
    message: "Diamond Ring loan payment due in 3 days",
    date: "2024-06-20",
  },
  {
    id: 2,
    type: "error",
    title: "Overdue Payment",
    message: "Diamond Ring loan is 22 days overdue",
    date: "2024-06-18",
  },
  {
    id: 3,
    type: "info",
    title: "New Interest Rate",
    message: "Interest rates updated for active loans",
    date: "2024-06-15",
  },
]

const chartData = [
  { month: "Jan", borrowed: 2000, interest: 100 },
  { month: "Feb", borrowed: 1400, interest: 70 },
  { month: "Mar", borrowed: 950, interest: 48 },
  { month: "Apr", borrowed: 0, interest: 150 },
  { month: "May", borrowed: 0, interest: 200 },
  { month: "Jun", borrowed: 0, interest: 220 },
]

const pieData = [
  { name: "Active", value: 3, color: "#3B82F6" },
  { name: "Overdue", value: 1, color: "#EF4444" },
  { name: "Completed", value: 1, color: "#10B981" },
]

const PawnShopApp: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<string>("")
  const [loginError, setLoginError] = useState<string>("")

  // Page state
  const [currentPage, setCurrentPage] = useState<"dashboard" | "payment-success">("dashboard")
  const [paymentData, setPaymentData] = useState<{ loan: any; amount: number } | null>(null)

  // Dashboard state
  const [loans, setLoans] = useState(mockLoans)
  const [currentLoanPage, setCurrentLoanPage] = useState(1)
  const [sortBy, setSortBy] = useState("pawnedDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("All")
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showMakePayment, setShowMakePayment] = useState<any>(null)

  const loansPerPage = 3

  // Authentication functions
  const handleLogin = (username: string, password: string) => {
    // Simple authentication check
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true)
      setCurrentUser(username)
      setLoginError("")
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("currentUser", username)
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser("")
    setCurrentPage("dashboard")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("currentUser")
  }

  // Check for existing authentication on app load
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated")
    const savedUser = localStorage.getItem("currentUser")

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true)
      setCurrentUser(savedUser)
    }

    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  // Payment functions
  const handlePaymentSubmit = (loan: any, amount: number) => {
    setPaymentData({ loan, amount })
    setCurrentPage("payment-success")
    setShowMakePayment(null)
  }

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard")
    setPaymentData(null)
  }

  // Filter and sort loans
  const filteredAndSortedLoans = useMemo(() => {
    let filtered = loans

    if (filterStatus !== "All") {
      filtered = loans.filter((loan) => loan.status === filterStatus)
    }

    return filtered.sort((a, b) => {
      const aValue = (a as any)[sortBy]
      const bValue = (b as any)[sortBy]

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [loans, filterStatus, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedLoans.length / loansPerPage)
  const paginatedLoans = filteredAndSortedLoans.slice(
    (currentLoanPage - 1) * loansPerPage,
    currentLoanPage * loansPerPage,
  )

  // Summary calculations
  const summary = useMemo(() => {
    const activeLoans = loans.filter((loan) => loan.status === "Active")
    const totalBorrowed = activeLoans.reduce((sum, loan) => sum + loan.approvedAmount, 0)
    const totalInterest = activeLoans.reduce((sum, loan) => sum + loan.totalInterest, 0)
    const amountDueThisMonth = activeLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0)

    return {
      totalActiveLoans: activeLoans.length,
      totalBorrowed,
      totalInterest,
      amountDueThisMonth,
    }
  }, [loans])

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors = {
      Active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }

    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${(colors as any)[status]}`}>{status}</span>
  }

  const PaymentModal: React.FC<{ loan: any; onClose: () => void }> = ({ loan, onClose }) => {
    const [paymentAmount, setPaymentAmount] = useState(loan.monthlyPayment)
    const [paymentMethod, setPaymentMethod] = useState("Credit Card")
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        handlePaymentSubmit(loan, paymentAmount)
        setIsProcessing(false)
      }, 2000)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Make Payment - {loan.productName}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Amount</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min="1"
                max={loan.approvedAmount}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
              </select>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} error={loginError} />
  }

  // Show payment success page
  if (currentPage === "payment-success" && paymentData) {
    return (
      <PaymentSuccessPage
        loan={paymentData.loan}
        paymentAmount={paymentData.amount}
        onBackToDashboard={handleBackToDashboard}
      />
    )
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Main dashboard
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">PawnShop Pro</h1>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {mockNotifications.length}
                  </span>
                </button>

                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{currentUser}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="absolute right-4 top-20 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-40">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-1 rounded-full ${
                        notification.type === "error"
                          ? "bg-red-100 dark:bg-red-900"
                          : notification.type === "warning"
                            ? "bg-yellow-100 dark:bg-yellow-900"
                            : "bg-blue-100 dark:bg-blue-900"
                      }`}
                    >
                      {notification.type === "error" ? (
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      ) : notification.type === "warning" ? (
                        <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Loans</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.totalActiveLoans}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Borrowed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${summary.totalBorrowed.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Interest</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${summary.totalInterest.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Due This Month</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${summary.amountDueThisMonth.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Borrowing & Interest Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                      border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                      borderRadius: "6px",
                    }}
                  />
                  <Line type="monotone" dataKey="borrowed" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="interest" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Loan Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Loan Dashboard */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Loans</h2>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>

                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split("-")
                      setSortBy(field)
                      setSortOrder(order)
                    }}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="pawnedDate-desc">Newest First</option>
                    <option value="pawnedDate-asc">Oldest First</option>
                    <option value="approvedAmount-desc">Highest Amount</option>
                    <option value="approvedAmount-asc">Lowest Amount</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {paginatedLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{loan.productName}</h3>
                          <StatusBadge status={loan.status} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Pawned:</span> {loan.pawnedDate}
                          </div>
                          <div>
                            <span className="font-medium">Estimated Value:</span> $
                            {loan.estimatedValue.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Loan Amount:</span> ${loan.approvedAmount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Interest Rate:</span> {loan.interestRate}%
                          </div>
                          <div>
                            <span className="font-medium">Due Date:</span> {loan.repaymentDeadline}
                          </div>
                          <div>
                            <span className="font-medium">Monthly Payment:</span> ${loan.monthlyPayment}
                          </div>
                          <div>
                            <span className="font-medium">Total Interest:</span> ${loan.totalInterest}
                          </div>
                        </div>
                      </div>

                      {loan.status === "Active" && (
                        <button
                          onClick={() => setShowMakePayment(loan)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>Make Payment</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {(currentLoanPage - 1) * loansPerPage + 1} to{" "}
                    {Math.min(currentLoanPage * loansPerPage, filteredAndSortedLoans.length)} of{" "}
                    {filteredAndSortedLoans.length} loans
                  </p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentLoanPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentLoanPage === 1}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentLoanPage(page)}
                        className={`px-3 py-2 border rounded-md ${
                          currentLoanPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentLoanPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentLoanPage === totalPages}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showMakePayment && <PaymentModal loan={showMakePayment} onClose={() => setShowMakePayment(null)} />}
      </div>
    </div>
  )
}

export default PawnShopApp
