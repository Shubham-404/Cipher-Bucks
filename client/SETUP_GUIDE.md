# 🚀 Quick Setup Guide - Cipher Bucks

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Development Setup (Optional)

### Bypass Authentication for Testing

During development, you can bypass authentication to test protected routes:

1. **Create `.env.local` file:**

```bash
# Windows (PowerShell)
Copy-Item .env.local.example .env.local

# Linux/Mac
cp .env.local.example .env.local
```

2. **The file will contain:**

```env
VITE_BYPASS_AUTH=true
```

3. **Access protected routes directly:**
   - `/dashboard` - Main dashboard
   - `/hisabs` - Transaction management
   - `/encrypted` - Passcode-protected hisabs
   - `/settings` - User settings

### 🚨 CRITICAL: Before Production

**YOU MUST DO ONE OF THE FOLLOWING:**

**Option 1: Delete the environment file**
```bash
rm .env.local
```

**Option 2: Disable the bypass**
```env
# In .env.local
VITE_BYPASS_AUTH=false
```

**Option 3: Remove bypass logic**
Edit `src/components/ProtectedRoute.jsx` and remove:
```js
const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
```

And change the condition to:
```js
if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}
```

## Step 3: Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173` (or the port shown in terminal)

## Step 4: Test the Application

### Public Pages (No Auth Required)
- ✅ `/` - Homepage with features
- ✅ `/contact` - Contact page
- ✅ `/login` - Login form
- ✅ `/signup` - Registration form

### Protected Pages (Requires Login or Bypass)
- 🔒 `/dashboard` - User dashboard
- 🔒 `/hisabs` - Transaction list
- 🔒 `/encrypted` - Encrypted hisabs (passcode: 1234)
- 🔒 `/settings` - User settings

### Test Credentials (Demo)
Currently using localStorage for demo purposes:
- Username: `any`
- Password: `any`

After login, `isAuthenticated` is set to `true` in localStorage.

## Navigation Structure

### Landing Page
- Clean navbar with: Logo, Contact, Login, Sign Up
- No clutter, conversion-focused

### Auth Pages (Login/Signup/etc.)
- **NO navbar** - focused, distraction-free forms
- Theme toggle (top-right corner)
- Back to home links where needed

### Dashboard Pages
- **Sidebar navigation** (left side)
  - Dashboard, Hisabs, Encrypted, Settings
  - Logo (links home)
  - Logout (bottom)
- **Minimal top bar** - just title & theme toggle
- Clean, task-focused interface

## Build for Production

```bash
npm run build
```

**⚠️ Pre-Production Checklist:**
- [ ] Remove/disable `VITE_BYPASS_AUTH`
- [ ] Test authentication flow completely
- [ ] Verify protected routes are actually protected
- [ ] Connect to actual backend API
- [ ] Remove all TODO comments and mock data
- [ ] Test on multiple browsers and devices

## Troubleshooting

### Can't access protected routes even with bypass
- Check `.env.local` exists and has `VITE_BYPASS_AUTH=true`
- Restart dev server after creating `.env.local`
- Clear browser cache and localStorage

### Dark mode not working
- Theme toggle in top-right corner (all pages)
- Automatically detects system preference on first load

### Sidebar not showing
- Sidebar only appears on protected routes (/dashboard, /hisabs, etc.)
- Not visible on public pages (home, login, signup)

## File Structure Reference

```
client/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx    # Public page navbar
│   │   ├── Sidebar.jsx   # Dashboard sidebar
│   │   └── ...
│   ├── pages/            # All page components
│   │   ├── Home.jsx      # Landing page
│   │   ├── Login.jsx     # No navbar
│   │   ├── Dashboard.jsx # Uses Sidebar
│   │   └── ...
│   └── App.jsx           # Routing setup
├── .env.local.example    # Template for local env
├── .env.local            # YOUR LOCAL CONFIG (gitignored)
└── ...
```

## Need Help?

Check the main README: `CIPHER_BUCKS_README.md`

Developer: [Shubham-404](https://github.com/Shubham-404)
