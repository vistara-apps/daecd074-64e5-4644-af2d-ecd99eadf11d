# Social Boost AI - Base Mini App

Get more likes with AI-powered social media tips! This production-ready Base Mini App helps social media users optimize their content with AI-generated captions, hashtag suggestions, and optimal posting schedules.

## Features

- **AI Caption Generator**: Generate engaging, platform-specific captions using AI
- **Hashtag Strategy Assistant**: Get relevant and trending hashtag recommendations
- **Optimal Posting Schedule**: Discover the best times to post for maximum engagement
- **User Management**: Track usage and subscription status
- **Subscription Tiers**: Free and premium plans with different limits
- **Data Persistence**: Store user data and generated tips
- **Error Handling**: Comprehensive error boundaries and validation
- **Production Ready**: Optimized for deployment and monitoring

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **AI Integration**: OpenAI API (via OpenRouter) with Gemini models
- **Base Integration**: MiniKit for Base Mini App functionality
- **Database**: File-based storage (production-ready for database migration)
- **TypeScript**: Full type safety throughout
- **Error Handling**: React Error Boundaries and validation

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `OPENROUTER_API_KEY` or `OPENAI_API_KEY` for AI generation
   - `NEXT_PUBLIC_MINIKIT_API_KEY` for Base Mini App functionality

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## API Documentation

Complete API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md), including:

- Endpoint specifications for all AI generation APIs
- Request/response formats
- Authentication requirements
- Rate limiting information
- Error handling guidelines
- SDK examples

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes for AI generation and user management
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # MiniKit provider setup
├── components/            # React components
│   ├── AppShell.tsx      # Main app container
│   ├── NavigationTabs.tsx # Tab navigation
│   ├── CaptionGenerator.tsx
│   ├── HashtagSuggestions.tsx
│   ├── ScheduleSuggestions.tsx
│   ├── GeneratedTipCard.tsx
│   ├── PremiumModal.tsx   # Subscription upgrade modal
│   ├── ErrorBoundary.tsx  # Error handling
│   └── LoadingSkeleton.tsx # Loading states
├── lib/                  # Utilities and business logic
│   ├── database.ts       # Data persistence layer
│   ├── subscription.ts   # Subscription and limits logic
│   ├── validation.ts     # Input validation
│   ├── types.ts          # TypeScript definitions
│   └── utils.ts          # Helper functions
├── data/                 # File-based data storage (dev)
├── API_DOCUMENTATION.md  # Complete API documentation
└── README.md            # This file
```

## Design System

The app uses a custom design system with:
- **Colors**: Custom HSL color palette optimized for social media
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing scale (sm: 4px, md: 8px, lg: 16px, xl: 24px)
- **Components**: Reusable UI components with variants

## API Integration

### AI Generation
- Uses OpenAI API (via OpenRouter) for caption and hashtag generation
- Implements proper error handling and fallbacks
- Optimized prompts for social media content

### Base Mini App
- Integrated with MiniKit for Base ecosystem functionality
- Proper provider setup for Base chain integration
- Ready for wallet connections and onchain features

## Business Model

### Subscription Tiers

**Free Plan:**
- 5 captions per day
- 3 hashtag suggestions per day
- 2 schedule recommendations per day
- Basic AI-powered tips

**Premium Plan ($4.99/month or $39.99/year):**
- 50 captions per day
- 25 hashtag suggestions per day
- 10 schedule recommendations per day
- Advanced AI customization
- Priority support
- Export and save tips

### Monetization Strategy
- Micro-transactions for quick, actionable advice
- Low commitment pricing encourages trial
- Subscription offers predictability for frequent users
- Freemium model balances accessibility with revenue

## Production Deployment

### Environment Setup
1. **Configure environment variables** in `.env.local`:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

2. **Database Migration** (for production):
   - Replace file-based storage in `lib/database.ts` with a proper database
   - Recommended: PostgreSQL with Prisma ORM
   - Update connection strings in environment variables

3. **Build and deploy**:
   ```bash
   npm run build
   npm start
   ```

### Performance Optimizations
- API responses cached for improved performance
- Error boundaries prevent app crashes
- Loading skeletons for better UX
- Optimized bundle size with Next.js

### Monitoring & Analytics
- Error tracking with Sentry (optional)
- Usage analytics for business insights
- Performance monitoring with Vercel Analytics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Update documentation as needed
6. Submit a pull request with a clear description

## License

MIT License - see LICENSE file for details
