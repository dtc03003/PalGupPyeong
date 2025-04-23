# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

```
PalGupPyeong
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ api
│  │  └─ firebase.ts
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ icons
│  │  │  ├─ btn_eye_off.svg
│  │  │  ├─ btn_eye_on.svg
│  │  │  ├─ icon_hamburger.svg
│  │  │  └─ icon_setting.svg
│  │  └─ images
│  │     ├─ logo_PalGupPyeong.png
│  │     └─ pushup.gif
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ Layout.tsx
│  │  │  ├─ NavBar.styles.ts
│  │  │  ├─ NavBar.tsx
│  │  │  ├─ SideMenu.styles.ts
│  │  │  └─ SideMenu.tsx
│  │  ├─ PrivateRoute.tsx
│  │  ├─ PublicRoute.tsx
│  │  ├─ record
│  │  │  ├─ DailyProgress.styles.ts
│  │  │  ├─ DailyProgress.tsx
│  │  │  ├─ QuickAddRecord.styles.ts
│  │  │  ├─ QuickAddRecord.tsx
│  │  │  ├─ RecordList.styles.ts
│  │  │  └─ RecordList.tsx
│  │  ├─ rotaryDial
│  │  │  ├─ RotaryDial.styles.ts
│  │  │  ├─ RotaryDial.tsx
│  │  │  ├─ RotaryDialRecordForm.styles.ts
│  │  │  └─ RotaryDialRecordForm.tsx
│  │  └─ timer
│  │     ├─ TimerComponent.styles.ts
│  │     └─ TimerComponent.tsx
│  ├─ hooks
│  │  ├─ useAuth.ts
│  │  ├─ useDailyGoal.ts
│  │  ├─ useGetDailyRecords.ts
│  │  ├─ useGetMonthlyRecords.ts
│  │  ├─ useGetWeeklyRecords.ts
│  │  └─ useRecords.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Auth
│  │  │  ├─ AuthPage.styles.ts
│  │  │  └─ AuthPage.tsx
│  │  ├─ Error
│  │  │  ├─ ErrorPage.styles.ts
│  │  │  └─ ErrorPage.tsx
│  │  ├─ Home
│  │  │  ├─ HomePage.styles.ts
│  │  │  └─ HomePage.tsx
│  │  ├─ MyRecords
│  │  │  └─ MyRecordsPage.tsx
│  │  └─ Record
│  │     └─ RecordPage.tsx
│  ├─ styles
│  │  ├─ GlobalStyles.ts
│  │  └─ theme.ts
│  ├─ svg.d.ts
│  ├─ utils
│  │  └─ dateUtils.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```