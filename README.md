# Social Boost AI - Base Mini App

Get more likes with AI-powered social media tips! This Base Mini App helps social media users optimize their content with AI-generated captions, hashtag suggestions, and optimal posting schedules.

## Features

- **AI Caption Generator**: Generate engaging, platform-specific captions using AI
- **Hashtag Strategy Assistant**: Get relevant and trending hashtag recommendations
- **Optimal Posting Schedule**: Discover the best times to post for maximum engagement

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **AI Integration**: OpenAI API (via OpenRouter)
- **Base Integration**: MiniKit for Base Mini App functionality
- **TypeScript**: Full type safety throughout

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

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes for AI generation
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
│   └── GeneratedTipCard.tsx
└── lib/                  # Utilities and types
    ├── types.ts          # TypeScript definitions
    └── utils.ts          # Helper functions
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
