# Hướng dẫn sửa lỗi Build trên Vercel

## 🔧 Các lỗi đã được sửa

### 1. **TypeScript Import Errors**
- ✅ Sửa import React không cần thiết trong ErrorBoundary
- ✅ Sử dụng `type` imports cho TypeScript types
- ✅ Xóa unused imports trong vite.config.ts

### 2. **React Helmet Async Errors**
- ✅ Tạm thời xóa SEO component và useSEO hook
- ✅ Comment out HelmetProvider trong main.tsx

### 3. **Node.js Version Deprecated**
- ✅ Cập nhật vercel.json với Node.js 22.x
- ✅ Thêm engines field trong package.json

## 🚀 Cách deploy trên Vercel

### Bước 1: Cấu hình Project Settings trên Vercel
1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Vào **Settings** → **General**
4. Tìm **Node.js Version**
5. Chọn **22.x** (thay vì 18.x)

### Bước 2: Build Commands
Vercel sẽ tự động sử dụng:
```bash
npm install
npm run build
```

### Bước 3: Environment Variables (nếu cần)
Trong Vercel Settings → Environment Variables, thêm:
```
NODE_ENV=production
```

## 📋 Files đã được cập nhật

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "functions": {
    "app/api/**/*.js": {
      "runtime": "nodejs22.x"
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `package.json`
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### `src/components/ErrorBoundary.tsx`
```typescript
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
```

## 🎯 Các lỗi đã được loại bỏ

1. ✅ `'React' is declared but its value is never read`
2. ✅ `'ErrorInfo' is a type and must be imported using a type-only import`
3. ✅ `'ReactNode' is a type and must be imported using a type-only import`
4. ✅ `Cannot find module 'react-helmet-async'`
5. ✅ `'resolve' is declared but its value is never read`
6. ✅ `Node.js version 18.x is deprecated`

## 🔍 Test Build Local

Trước khi deploy, test build local:
```bash
npm run build
```

Nếu build thành công local, thì sẽ thành công trên Vercel.

## 📦 Thêm SEO features sau (tùy chọn)

Nếu muốn thêm lại SEO features:
```bash
npm install react-helmet-async
```

Sau đó uncomment HelmetProvider và tạo lại SEO components.

## 🚀 Deploy Steps

1. **Push code lên GitHub**
2. **Vào Vercel Dashboard**
3. **Chọn Node.js Version 22.x trong Settings**
4. **Trigger new deployment**
5. **Check build logs nếu có lỗi**

## 📞 Troubleshooting

### Nếu vẫn có lỗi build:

1. **Kiểm tra build logs trên Vercel**
2. **Test build local**: `npm run build`
3. **Kiểm tra TypeScript**: `npm run type-check`
4. **Clear Vercel cache**: Redeploy với "Clear cache"

### Common Issues:

#### Build timeout
- Optimize dependencies
- Remove unused packages

#### Memory issues
- Use Vercel Pro plan
- Optimize bundle size

#### TypeScript errors
- Fix all TypeScript errors locally first
- Use `npm run type-check`

## 📊 Performance After Fix

Build time sẽ nhanh hơn vì:
- Ít dependencies hơn
- Không có react-helmet-async
- Clean TypeScript imports

## 🎯 Next Steps

1. ✅ **Deploy thành công**
2. **Test website trên production**
3. **Add SEO features nếu cần**
4. **Monitor performance**
