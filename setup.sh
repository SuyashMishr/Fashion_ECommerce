#!/bin/bash

# Fashion E-Commerce Platform Setup Script
echo "🚀 Setting up Fashion E-Commerce Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_status "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
}

# Install backend dependencies
install_backend() {
    print_header "📦 Installing Backend Dependencies..."
    cd backend
    if [ -f "package.json" ]; then
        npm install
        if [ $? -eq 0 ]; then
            print_status "Backend dependencies installed successfully"
        else
            print_error "Failed to install backend dependencies"
            exit 1
        fi
    else
        print_error "Backend package.json not found"
        exit 1
    fi
    cd ..
}

# Install frontend dependencies
install_frontend() {
    print_header "🎨 Installing Frontend Dependencies..."
    cd frontend
    if [ -f "package.json" ]; then
        npm install
        if [ $? -eq 0 ]; then
            print_status "Frontend dependencies installed successfully"
        else
            print_error "Failed to install frontend dependencies"
            exit 1
        fi
    else
        print_error "Frontend package.json not found"
        exit 1
    fi
    cd ..
}

# Setup environment files
setup_env() {
    print_header "⚙️  Setting up Environment Files..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        cp backend/.env.example backend/.env
        print_status "Backend .env file created from example"
    else
        print_warning "Backend .env file already exists"
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env" ]; then
        cp frontend/.env.example frontend/.env
        print_status "Frontend .env file created from example"
    else
        print_warning "Frontend .env file already exists"
    fi
}

# Create necessary directories
create_directories() {
    print_header "📁 Creating Necessary Directories..."
    
    # Backend directories
    mkdir -p backend/logs
    mkdir -p backend/uploads
    print_status "Backend directories created"
    
    # Frontend build directory
    mkdir -p frontend/dist
    print_status "Frontend directories created"
}

# Start development servers
start_dev_servers() {
    print_header "🚀 Starting Development Servers..."
    
    print_status "Starting backend server on port 4000..."
    cd backend
    npm start &
    BACKEND_PID=$!
    cd ..
    
    sleep 3
    
    print_status "Starting frontend server on port 5173..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    sleep 5
    
    # Test if servers are running
    if curl -s http://localhost:4000/health > /dev/null; then
        print_status "✅ Backend server is running at http://localhost:4000"
    else
        print_error "❌ Backend server failed to start"
    fi
    
    if curl -s http://localhost:5173 > /dev/null; then
        print_status "✅ Frontend server is running at http://localhost:5173"
    else
        print_error "❌ Frontend server failed to start"
    fi
    
    print_header "🎉 Setup Complete!"
    echo ""
    echo "📱 Frontend: http://localhost:5173"
    echo "🔧 Backend API: http://localhost:4000/api"
    echo "❤️  Health Check: http://localhost:4000/health"
    echo ""
    echo "Press Ctrl+C to stop all servers"
    
    # Wait for user to stop
    wait
}

# Main execution
main() {
    print_header "🛍️  Fashion E-Commerce Platform Setup"
    echo ""
    
    check_node
    check_npm
    setup_env
    create_directories
    install_backend
    install_frontend
    
    echo ""
    print_status "Setup completed successfully!"
    echo ""
    
    read -p "Do you want to start the development servers now? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        start_dev_servers
    else
        print_status "You can start the servers later by running:"
        echo "  Backend: cd backend && npm start"
        echo "  Frontend: cd frontend && npm run dev"
    fi
}

# Run main function
main
