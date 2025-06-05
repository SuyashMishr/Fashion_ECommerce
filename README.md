# Fashion E-Commerce Platform

A comprehensive dual-login fashion e-commerce platform with both web and mobile applications, similar to Myntra, Zara, and ASOS.

## 🚀 Features

### For Buyers
- Product browsing with advanced filtering
- Shopping cart and wishlist
- Secure checkout with Stripe integration
- Order tracking and history
- Product reviews and ratings
- Mobile app with offline capabilities
- AI-powered chatbot assistance

### For Sellers
- Product management dashboard
- Inventory tracking
- Order management
- Sales analytics
- Bulk product upload
- Multi-image upload support

## 🛠 Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with refresh tokens
- **File Storage**: Cloudinary
- **Payment**: Stripe
- **Chatbot**: OpenAI GPT integration

### Frontend Web
- **Framework**: React.js with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

### Mobile App
- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (optional - can run without database initially)

### Quick Start

1. **Automated Setup (Recommended)**
```bash
# Run the setup script
./setup.sh
```

2. **Manual Setup**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. **Start development servers**
```bash
# Backend API (Port 4000)
cd backend
npm start

# Frontend Web App (Port 5173) - In a new terminal
cd frontend
npm run dev
```

4. **Access the application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/health

## 🏗 Project Structure

```
fashion-ecommerce-platform/
├── backend/           # Node.js API server
├── frontend/          # React web application
├── mobile/           # React Native mobile app
├── admin/            # Admin dashboard
├── shared/           # Shared utilities and types
├── docs/             # Documentation
├── scripts/          # Build and deployment scripts
└── deployment/       # Docker and deployment configs
```

## 🔧 Development

### Backend API
- **Port**: 4000
- **API Docs**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/health

### Frontend Web
- **Port**: 5173 (Vite dev server)
- **URL**: http://localhost:5173

### Mobile App
- **Metro Bundler**: http://localhost:8081
- **iOS Simulator**: Press 'i' in terminal
- **Android Emulator**: Press 'a' in terminal

## 🧪 Testing

```bash
# Run all tests
npm test

# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend
```

## 🚀 Deployment

### Using Docker
```bash
# Build containers
npm run docker:build

# Start services
npm run docker:up

# Stop services
npm run docker:down
```

### Manual Deployment
```bash
# Build production assets
npm run build

# Deploy using script
npm run deploy
```

## 📱 Mobile App Setup

### iOS
```bash
cd mobile
npx pod-install ios
npx react-native run-ios
```

### Android
```bash
cd mobile
npx react-native run-android
```

## 🔐 Security Features

- JWT authentication with refresh tokens
- Input validation and sanitization
- Rate limiting
- CORS protection
- Secure file upload handling
- Password hashing with bcrypt

## 📊 Monitoring

- Error logging with Winston
- Performance monitoring
- API analytics
- User behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@fashionecommerce.com or join our Slack channel.

## 🎯 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] AR try-on functionality
- [ ] Voice search
- [ ] Social commerce features
- [ ] Advanced recommendation engine
# Fashion_ECommerce
