# Telecel Play Ghana - Instant Ready Loan Application

A modern, responsive web application for instant loan processing on Telecel Cash. Built with HTML5, CSS3, and vanilla JavaScript.

## 🎯 Features

- **Loan Calculator** - Real-time loan estimation with adjustable amount and term
- **3-Step Application** - Simple, intuitive application process
  - Step 1: Estimate loan and repayment
  - Step 2: Enter personal details
  - Step 3: Review and confirm
- **Dashboard** - User account management and application tracking
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Fast & Secure** - Lightweight frontend with secure data handling
- **Modern UI** - Dark theme with Telecel branding

## 📋 Project Structure

```
telecel-play-ghana/
├── index.html              # Home page with loan calculator
├── apply.html              # Application form
├── confirm.html            # Confirmation page
├── dashboard.html          # User dashboard
├── package.json            # Node.js dependencies
├── render.yaml             # Render.com deployment config
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── DEPLOYMENT.md           # Deployment guide
├── assets/
│   ├── style.css           # Main stylesheet
│   └── main.js             # Utility functions and helpers
└── server/
    └── index.js            # Express.js server
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/telecel-play-ghana.git
   cd telecel-play-ghana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Using Docker

1. **Build the image**
   ```bash
   docker build -t telecel-play .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 telecel-play
   ```

## 📱 Pages

### Home (index.html)
- Loan calculator with real-time estimation
- Feature highlights
- Call-to-action to apply

### Apply (apply.html)
- Multi-step form
- Personal information collection
- ID type and employment status
- Form validation

### Confirm (confirm.html)
- Review application details
- Confirmation and submission
- Success page with reference number
- Timeline of processing steps

### Dashboard (dashboard.html)
- Overview of active loans
- Application history
- Profile management
- Payment processing
- Customer support contact

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with CSS variables
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Render.com, Heroku, Railway, etc.

## 📊 Loan Calculation

**Monthly Fee Rate**: 8.9%

**Formula**:
```
Total Repayment = Principal + (Principal × 0.089 × (Days / 30))
```

**Example**:
- Loan Amount: GH₵5,000
- Term: 60 days (2 months)
- Fee: GH₵5,000 × 0.089 × 2 = GH₵890
- Total Repayment: GH₵5,890

## 🔐 Security Features

- Client-side form validation
- Server-side validation
- CORS enabled
- Environment variable configuration
- No sensitive data in frontend code
- Session storage for temporary data

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and uptime.

### Submit Application
```
POST /api/submit-application
Content-Type: application/json

{
  "fullName": "John Doe",
  "telecelNumber": "0501234567",
  "idType": "ghana-card",
  "idNumber": "GHA-XXXXXXXXX-X",
  "employment": "employed",
  "loanAmount": 5000,
  "loanDays": 60
}
```

### Get Application Status
```
GET /api/application-status/:refCode
```

### Process Payment
```
POST /api/process-payment
Content-Type: application/json

{
  "amount": 5890,
  "method": "telecel-cash",
  "refCode": "TCL-XXXXX"
}
```

## 🎨 Customization

### Colors
Edit `assets/style.css` CSS variables:
```css
:root {
  --red: #e00a1c;           /* Primary color */
  --dark-bg: #0a0a0f;       /* Background */
  --card-bg: #13131a;       /* Card background */
  /* ... more variables */
}
```

### Loan Parameters
Edit `index.html` and `apply.html`:
```javascript
const MONTHLY_FEE = 0.089;  // Change fee rate
```

### Company Information
Update footer and header text in HTML files.

## 📦 Deployment

### Render.com (Recommended)
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

Quick steps:
1. Push to GitHub
2. Connect Render.com to GitHub
3. Create Web Service
4. Deploy automatically

### Heroku
```bash
heroku create telecel-play-ghana
git push heroku main
```

### Railway
```bash
railway link
railway up
```

### DigitalOcean App Platform
1. Connect GitHub repository
2. Select Node.js runtime
3. Deploy

## 📝 Environment Variables

Create `.env` file:
```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

See `.env.example` for all available options.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Loan calculator updates on input change
- [ ] Term selection changes repayment amount
- [ ] Form validation works on apply page
- [ ] Phone number validation (05X format)
- [ ] Application submission succeeds
- [ ] Confirmation page displays correctly
- [ ] Dashboard loads and functions
- [ ] Responsive design on mobile (375px)
- [ ] Responsive design on tablet (768px)
- [ ] Responsive design on desktop (1024px+)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
Update `CORS_ORIGIN` in `.env`:
```
CORS_ORIGIN=http://localhost:3000
```

## 📞 Support

For issues and support:
- Email: support@telecelplay.com
- Phone: Dial 100 on Telecel line
- Website: https://play.telecel.com.gh

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🔄 Version History

### v1.0.0 (2026-04-19)
- Initial release
- 3-step application process
- Dashboard with user management
- Responsive design
- Render.com deployment ready

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Telecel Ghana](https://www.telecelghana.com/)
- [Render.com Docs](https://render.com/docs)

---

**Made with ❤️ for Telecel Ghana**

© 2026 Telecel Ghana - Licensed Mobile Financial Services
