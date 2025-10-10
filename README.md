# 🎯 OneWords - SSC CGL Exam Simulator

**Ultimate MCQ - One Word Substitution Exam Simulator** for SSC CGL and other competitive examinations.

## 🌟 Features

- 🔐 **Secure Authentication System** with protected routes
- 📁 **Question Import System** - Import your custom question sets
- 🎮 **Multiple Test Modes**:
  - Practice Mode (untimed, immediate feedback)
  - Timed Mode (exam simulation)
  - Mock Test Mode (full exam experience)
- 📊 **Enhanced Test Interface** with real-time progress tracking
- 📈 **Detailed Results Analysis** with performance metrics
- 📚 **History Tracking** to monitor progress over time
- 🎨 **Modern UI/UX** with smooth animations
- 📱 **Fully Responsive** design for all devices

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + Zustand
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Testing**: Vitest
- **Code Quality**: ESLint + Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShahidAktarMir/onewords.git
   cd onewords
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Getting Started

1. **Authentication**: Create an account or sign in
2. **Import Questions**: Upload your question sets in the supported format
3. **Select Mode**: Choose from Practice, Timed, or Mock Test modes
4. **Take Test**: Answer questions with real-time feedback
5. **Review Results**: Analyze your performance with detailed metrics
6. **Track Progress**: Monitor improvement over time in History section

### Question Import Format

Supported formats for question import:
- JSON format with question, options, and correct answer
- CSV format with proper column headers

### Test Modes

- **Practice Mode**: Unlimited time, immediate feedback after each question
- **Timed Mode**: Fixed time per question, realistic exam simulation
- **Mock Test Mode**: Full exam experience with time limits and final results

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── results/        # Results display components
│   └── test/           # Test-related components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API and external services
├── store/              # Redux store and slices
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for SSC CGL aspirants
- Inspired by the need for better exam preparation tools
- Thanks to the React and TypeScript communities

## 📞 Support

For support, email shahidaktarmir@gmail.com or create an issue in this repository.

---

**Made with ❤️ for SSC CGL aspirants**