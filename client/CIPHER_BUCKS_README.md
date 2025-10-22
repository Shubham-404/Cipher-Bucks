# 🚀 Cipher Bucks - Frontend

A modern, secure personal digital ledger system built with React, Vite, TailwindCSS, and GSAP.

## 📋 Project Overview

Cipher Bucks is a personal finance management application that allows users to:
- Manage multiple transaction books (Hisaabs)
- Secure sensitive records with passcode protection
- Track income and expenses with an intuitive UI
- Auto dark/light mode based on system preference

## 🎨 Design Theme

- **Primary Color**: `#5A5AFB` (Indigo)
- **Accent Color**: `#FF4C4C` (Red for CTAs)
- **Layout**: Split-screen design for auth pages, sidebar navigation for dashboard
- **Typography**: Clean sans-serif (default system fonts)
- **Dark Mode**: Automatic detection with manual toggle

## 🧭 Navigation Structure

The app uses a **contextual navigation** approach for optimal UX:

### Homepage & Public Pages
- **Navbar**: Simple, conversion-focused navbar with Logo, Contact, Login, Sign Up
- **Purpose**: Minimal distractions, clear CTAs
- **Pages**: Home (`/`), Contact (`/contact`)

### Authentication Pages
- **No Navbar**: Clean, focused forms without navigation distractions
- **Theme Toggle**: Fixed position (top-right) for dark/light mode
- **Back Links**: Contextual back-to-home or back-to-login links where needed
- **Pages**: Login, Signup, Verify Email, Forgot Password, Reset Password
- **Design**: Split-screen layout (left: branding, right: form)

### Dashboard & Protected Pages
- **Sidebar Navigation**: Persistent left sidebar with main navigation
  - Dashboard, Hisabs, Encrypted, Settings
  - Logo (links to home)
  - Logout button (bottom of sidebar)
- **Top Bar**: Minimal - just page title and theme switcher
- **Purpose**: Task-focused, easy access to all features
- **Mobile**: Responsive sidebar (collapsible on mobile)

### Why This Works
- **Simplicity**: Auth pages stay focused on user action
- **Context**: Navigation appears only when relevant
- **Consistency**: Dashboard pages share same navigation pattern
- **Clarity**: No cognitive overload with unnecessary options

## 📁 Project Structure

```
src/
├── components/
│   ├── Button.jsx           # Reusable button with variants
│   ├── Card.jsx             # Card wrapper component
│   ├── InputField.jsx       # Form input with label & error
│   ├── Loader.jsx           # Loading spinner overlay
│   ├── Navbar.jsx           # Top navigation bar
│   ├── ProtectedRoute.jsx   # Route guard for auth
│   ├── Sidebar.jsx          # Dashboard sidebar navigation
│   ├── ThemeSwitcher.jsx    # Dark/light mode toggle
│   └── Toast.jsx            # Notification component
│
├── pages/
│   ├── Home.jsx             # Landing page with features
│   ├── Login.jsx            # User login
│   ├── Signup.jsx           # User registration
│   ├── Contact.jsx          # Contact information
│   ├── VerifyEmail.jsx      # Email OTP verification
│   ├── ForgotPassword.jsx   # Password reset request
│   ├── ResetPassword.jsx    # Password reset with OTP
│   ├── Dashboard.jsx        # Main dashboard with stats
│   ├── Hisabs.jsx           # Transaction list page
│   ├── Encrypted.jsx        # Passcode-protected hisabs
│   └── Settings.jsx         # User settings & preferences
│
├── App.jsx                  # Main app with routing
└── index.css                # Global styles & Tailwind
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **TailwindCSS 4.1** - Utility-first styling (no PostCSS)
- **GSAP** - Animation library
- **Axios** (planned) - HTTP client for backend

## 🚦 Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/contact` - Contact page
- `/verify-email` - Email verification
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset confirmation

### Protected Routes (require authentication)
- `/dashboard` - User dashboard
- `/hisabs` - All transactions
- `/encrypted` - Encrypted transactions
- `/settings` - User settings

## 🎭 Features

### Authentication
- Username/password login
- Email-based signup
- OTP email verification
- Password reset flow
- Google OAuth placeholder

### Dashboard
- Income/expense/balance summary cards
- Recent transactions list
- Chart placeholder for expense trends
- Logout functionality

### Hisabs Management
- Add, edit, delete transactions
- Category badges (Income/Expense)
- Responsive card layout
- GSAP stagger animations

### Encrypted Hisabs
- Passcode protection (demo: 1234)
- Lock/unlock functionality
- Auto-lock after inactivity (UI only)
- Separate storage for sensitive data

### Settings
- Profile information management
- Auto-lock timeout configuration
- Theme preference display
- Account deletion option

## 🎨 Component Usage

### Button
```jsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
// variants: primary, secondary, outline
```

### InputField
```jsx
<InputField
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  placeholder="Enter email"
  error={errorMessage}
/>
```

### Card
```jsx
<Card className="extra-classes">
  {/* Your content */}
</Card>
```

### Loader
```jsx
{loading && <Loader />}
```

## 🔐 Authentication Flow

1. User signs up → `/signup`
2. Email verification → `/verify-email`
3. Login → `/login`
4. Protected dashboard access → `/dashboard`
5. Logout removes `isAuthenticated` from localStorage

**Note**: Currently uses localStorage for demo. Replace with proper JWT/session management when integrating backend.

## 🌙 Dark Mode

Dark mode automatically detects system preference on mount. Users can manually toggle using the theme switcher in the navbar.

Implementation:
```js
// ThemeSwitcher.jsx
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', isDarkMode);
```

## 🎬 GSAP Animations

All major page transitions use GSAP:
- **Fade-in** on component mount
- **Stagger animations** for lists/cards
- **Scale animations** for modals/cards
- **Slide-in** for side panels

Example:
```js
gsap.fromTo(
  ref.current,
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
);
```

## 🔗 Backend Integration (TODO)

Replace all `setTimeout` mock API calls with actual Axios requests:

```js
// Example
import axios from 'axios';

const handleLogin = async (formData) => {
  const response = await axios.post('/api/auth/login', formData);
  localStorage.setItem('token', response.data.token);
  navigate('/dashboard');
};
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment (Optional - for development)**
   
   To access protected routes without login during development:
   
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   ```
   
   The `.env.local` file will contain:
   ```env
   VITE_BYPASS_AUTH=true
   ```
   
   **🚨 IMPORTANT: Before deploying to production:**
   - Delete `.env.local` file OR
   - Set `VITE_BYPASS_AUTH=false` OR
   - Remove the bypass logic from `ProtectedRoute.jsx`
   
   **Never commit `.env.local` to version control!** (Already in .gitignore)

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```
   
   ⚠️ **Pre-production checklist:**
   - [ ] Remove or disable `VITE_BYPASS_AUTH`
   - [ ] Verify authentication works properly
   - [ ] Remove bypass logic from `ProtectedRoute.jsx` if needed

## 📝 Notes

- All pages use JSX (React functional components)
- No TypeScript - pure JavaScript
- TailwindCSS used exclusively (no separate CSS files except index.css)
- Modular, reusable components
- Mobile-responsive design throughout
- Ready for Spring Boot + MongoDB backend integration

## 🐛 Known Issues / TODOs

- [ ] Connect to actual backend API
- [ ] Add form validation library (e.g., React Hook Form)
- [ ] Implement proper authentication state management (Context/Redux)
- [ ] Add actual chart library (e.g., Chart.js or Recharts)
- [ ] Implement real auto-lock mechanism for encrypted hisabs
- [ ] Add toast notification system integration
- [ ] Create modal for "Add Hisab" functionality
- [ ] Add edit modal for transactions

## 👨‍💻 Developer

Built with ❤️ by [Shubham-404](https://github.com/Shubham-404)

## 📄 License

MIT License - feel free to use this project for learning or personal use.
