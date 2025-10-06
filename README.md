# ValueJet Frontend

A modern React-based frontend application for ValueJet, built with TypeScript, Vite, and Material-UI.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Authentication System**: Complete auth flow with OTP verification
- **Session Management**: Automatic session timeout handling
- **Responsive Design**: Mobile-first design with Material-UI components
- **Monorepo Structure**: Organized with Turborepo for scalability
- **Type Safety**: Full TypeScript support throughout the application

## 📁 Project Structure

```
valuejet/
├── apps/
│   ├── main/                 # Main application
│   └── valuejet-main/        # Secondary application
├── packages/
│   ├── eslint-config/        # Shared ESLint configuration
│   ├── typescript-config/    # Shared TypeScript configuration
│   └── ui/                   # Shared UI components
├── turbo.json               # Turborepo configuration
└── package.json             # Root package configuration
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Handling**: Formik with Zod validation
- **Build Tool**: Turborepo
- **Package Manager**: pnpm

## 🚦 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aosenit/valuejet.git
cd valuejet
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# Copy the example environment file
cp apps/main/.env.example apps/main/.env

# Edit the environment file with your configuration
```

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

## 🔐 Authentication Flow

The application includes a complete authentication system:

1. **Sign In** - Email/password authentication
2. **OTP Verification** - Two-factor authentication
3. **Password Reset** - Forgot password flow with OTP
4. **Session Management** - Automatic timeout handling

### Auth Routes

- `/signin` - Sign in page
- `/verify-signin-otp` - OTP verification
- `/forgot-password` - Password reset request
- `/reset-otp` - Password reset OTP verification
- `/check-email` - Email verification
- `/set-new-password` - Set new password
- `/password-reset-successful` - Success confirmation

## 🎨 UI Components

The application uses Material-UI components with a custom theme:

- **Primary Color**: #AD3291
- **Secondary Color**: #1F091A
- **Typography**: IBM Plex Sans Variable

## 🔧 Configuration

### Environment Variables

Create a `.env` file in `apps/main/` with the following variables:

```env
VITE_API_URL=https://api.valuejet.sbscuk.co.uk/public/api/v1/
```

### Turborepo Configuration

The project uses Turborepo for monorepo management. Configuration is in `turbo.json`.

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

The project is configured for Vercel deployment:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@valuejet.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with authentication system
- **v1.1.0** - Added session management and timeout handling
- **v1.2.0** - Enhanced UI components and responsive design

---

Built with ❤️ by the ValueJet team
