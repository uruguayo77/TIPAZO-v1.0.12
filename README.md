# TipFlow App

A React Native app built with Expo for managing tips and payments.

## Building Android APK

### Prerequisites
- Node.js installed
- Expo CLI installed globally: `npm install -g @expo/cli`
- Android Studio (for local builds)

### Build Methods

#### Method 1: Using Expo Build (Legacy)
```bash
# Install dependencies
npm install

# Build APK
npm run build:android-apk

# Build App Bundle (recommended for Play Store)
npm run build:android-bundle
```

#### Method 2: Local Build with Expo Prebuild
```bash
# Install dependencies
npm install

# Generate native Android project
npm run prebuild

# Open in Android Studio and build APK
# Or use Gradle directly:
cd android
./gradlew assembleRelease
```

#### Method 3: Export for Manual Build
```bash
# Export optimized bundle
npm run build:android

# The exported files will be in the dist/ folder
# You can then use these with your preferred build tool
```

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update `EXPO_PUBLIC_RORK_API_BASE_URL` with your backend URL
3. Set `JWT_SECRET` for backend authentication

### Development
```bash
# Start development server
npm start

# Run on Android device/emulator
npm run android

# Run on iOS device/simulator
npm run ios

# Run on web
npm run web
```

### Notes
- The app is configured to use the backend at `http://18.222.204.56:3000`
- Make sure your backend server is running and accessible
- For production builds, consider using a proper signing key
- Test the APK on different Android devices before distribution