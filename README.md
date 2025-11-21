# Boro - Item Rental Marketplace

A modern web application that allows users to browse and rent items from various categories including electronics, outdoor gear, and more.

## Features

- 📦 Browse rental items across multiple categories (Electronics, Outdoor, Sports, etc.)
- ⭐ View and submit reviews with star ratings
- 🔍 Filter items by category and minimum rating
- 💳 Mock payment processing with receipt generation
- 📅 Date selection for rental periods
- ✅ Owner verification badges
- 📱 Responsive design for all devices

## Technologies Used

- React.js
- Tailwind CSS
- Lucide React (icons)
- JavaScript ES6+

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/shawski123/Item-Rental-Marketplace-Calhacks.git
cd Item-Rental-Marketplace-Calhacks
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- Browse items in the main grid view
- Click on any item to view details
- Use the left sidebar to filter by category
- Use the top-right dropdown to filter by rating
- Select dates and proceed through the rental flow
- Leave reviews for items you've rented

## Project Structure
```
├── src/
│   ├── components/
│   │   └── ItemGrid.jsx       # Main component with filtering and reviews
│   ├── data/
│   │   └── items.js            # Mock item data
│   ├── App.js
│   └── index.js
├── public/
│   └── images/                 # Item images
└── README.md
```

## Future Enhancements

- Real backend integration with database
- User authentication and profiles
- Actual payment processing with Stripe
- Map view with geolocation
- Real-time availability calendar
- Messaging between renters and owners

## Contributors

- [Ramon Ramos, Arame Zohrabyan, Michael Salamyan, ] - Developers

## License

This project was created for [CalHacks/Hackathon Name] 2025.
(Potential Improvements coming soon)
