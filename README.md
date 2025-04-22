# 🎙️ Podcastify

Podcastify is a SaaS application that lets users create, manage, and discover AI-generated podcasts. Built with a modern tech stack, Podcastify provides a seamless experience for content creation and consumption.

## 🚀 Features

- ✨ **AI-Powered Podcast Creation** – Generate your own podcast content using OpenAI APIs.
- 🧰 **Full Episode Control** – Edit and delete your own podcasts easily.
- 🔐 **User Authentication** – Secure login and account management via Clerk.
- 🔎 **Discover Page** – Search podcasts by **title**, **description**, or **author**.
- 🎧 **Public Playback** – Listen to podcasts created by others (edit/delete is restricted to creators only).
- 💳 **Coming Soon** – Stripe integration for payments and premium features.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Storage:** [Convex](https://www.convex.dev/)
- **Authentication:** [Clerk](https://clerk.com/)
- **AI Integration:** [OpenAI API](https://platform.openai.com/)
- **Payments (Coming Soon):** [Stripe](https://stripe.com/)

## 📸 Screenshots

![Preview main page](/public/podcastify-main.jpeg)

## 🧑‍💻 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/podcastify.git
   cd podcastify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file and add your API keys for Clerk, Convex, OpenAI, and (eventually) Stripe.

4. **Run the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see it in action.

## 📌 Roadmap

- [x] AI-powered podcast generation
- [x] Editing & deleting podcasts (by creator)
- [x] Discover & search feature
- [x] Authentication with Clerk
- [ ] Stripe payments for premium features
- [ ] Podcast image customization
- [ ] User profiles & social features

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

MIT

---

Made with ❤️ using AI and modern web tools.
```
