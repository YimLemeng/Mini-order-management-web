# Order Management System - React JS Frontend

កម្មវិធី Frontend នេះត្រូវបានสร้างឡើងដោយប្រើប្រាស់ **React JS (Vite)**, **Tailwind CSS**, និង **Axios** សម្រាប់ភ្ជាប់ទៅកាន់ Spring Boot Order Management REST API។

---

## 🚀 របៀបដំណើរការ (How to Run)

### 1. ដំណើរការ Spring Boot Backend (Port 8080)
បើក Terminal ទៅកាន់ថត Backend៖
```bash
cd /Users/Lemeng/.gemini/antigravity/scratch/order-management-system
mvn spring-boot:run
```

### 2. ដំណើរការ React JS Frontend (Port 5173)
បើក Terminal មួយទៀតទៅកាន់ថត Frontend៖
```bash
cd /Users/Lemeng/.gemini/antigravity/scratch/order-management-web
npm run dev
```

បិទ/បើក Browser ទៅកាន់រៀបរាប់ URL៖ `http://localhost:5173`

---

## 🌟 លក្ខណៈពិសេសរបស់ Frontend (Features)
- **Customer Management Tab**: បង្កើត/កែប្រែ/លុប អតិថិជន និងព័ត៌មាន Profile អាសយដ្ឋាន។
- **Product & Stock Tab**: គ្រប់គ្រងតម្លៃផលិតផល និងចំនួនស្តុក (មាន Stock badges បង្ហាញព័ត៌មានជាក់ស្តែង)។
- **Order Processing Tab**: បង្កើត Order ថ្មី (ជ្រើសរើស Customer, បន្ថែមទំនិញច្រើនមុខ, គណនាតម្លៃសរុបស្វ័យប្រវត្ត) ព្រមទាំងអាចប្តូរ Status ឬ Cancel Order ដើម្បីបង្វិលស្តុកចូលវិញ។
