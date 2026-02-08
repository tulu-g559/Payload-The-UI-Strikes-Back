# ⚡ Payload: Smart Invoice Generator

![Payload Banner](https://capsule-render.vercel.app/api?type=waving&color=10b981&height=300&section=header&text=Payload&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Generative%20UI%20Invoice%20Engine%20powered%20by%20Tambo%20AI&descAlignY=55&descAlign=50)

<div align="center">

[![Hackathon](https://img.shields.io/badge/Hackathon-The%20UI%20Strikes%20Back-10b981?style=for-the-badge&logo=dev.to)](https://wemakedevs.org)
[![Powered By](https://img.shields.io/badge/Powered%20By-Tambo%20AI-black?style=for-the-badge&logo=openai&color=050505)](https://tambo.ai)
[![Framework](https://img.shields.io/badge/Built%20With-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

**Stop manually filling out boring forms. Chat your billing intent, and watch the UI assemble itself.**

[View Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🚀 About The Project

**Payload** was built for **"The UI Strikes Back"** hackathon, hosted by **WeMakeDevs** and **Tambo**.

Invoicing software hasn't changed in a decade. You click "New", you fill out 20 fields, you download a PDF. **Payload changes that.**

By leveraging **Tambo's Generative UI capabilities**, Payload allows freelancers and agencies to simply *describe* their invoice in plain English. The application intelligently parses the intent, calculates taxes and totals, and renders a live, interactive invoice component directly in the chat stream.

### ✨ Key Features

* **💬 Natural Language Invoicing:** Just type *"Bill Acme Corp $500 for logo design and $150 for hosting"* and watch the invoice appear.
* **🎨 Generative UI:** The chat doesn't just give text back—it generates fully functional React components.
* **⚡ Smart Calculations:** Automatically computes subtotals, tax rates, and discounts based on your prompt.
* **📄 Direct-to-Docs Export:** Skip the PDF editors. Export your invoice directly to a formatted Microsoft Word (`.doc`) file for easy editing.
* **🌑 Ambient Emerald UI:** A stunning, deep-dark aesthetic designed for focus and speed.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **AI Engine:** [Tambo SDK](https://tambo.ai/) (Generative UI & Intent Parsing)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Validation:** [Zod](https://zod.dev/)

---

## 📸 Interface

| **The Chat Experience** | **The Smart Invoice** |
|:---:|:---:|
| *Floating capsule input with ambient glow.* | *Professional, export-ready documents.* |
| ![Chat UI](https://placehold.co/600x400/050505/10b981?text=Chat+Interface) | ![Invoice UI](https://placehold.co/600x400/050505/10b981?text=Generated+Invoice) |

> *Screenshots of the actual "Payload" Dark/Emerald theme.*

---

## ⚡ Getting Started

To run Payload locally, you'll need a Tambo API key.

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/yourusername/payload-smart-invoice.git](https://github.com/yourusername/payload-smart-invoice.git)
    cd payload-smart-invoice
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory and add your Tambo credentials:
    ```env
    NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key_here
    NEXT_PUBLIC_TAMBO_URL=[https://api.tambo.ai/v1](https://api.tambo.ai/v1)
    ```

4.  **Run the development server**
    ```sh
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 Example Prompts

Try these commands in the Payload chat:

* **The Freelancer:**
    > "Create an invoice for StartUp Inc for 'Frontend Development'. 40 hours at $80/hr. Due next Friday."
* **The Agency:**
    > "Bill ClientX $2,000 for 'SEO Audit' and $1,500 for 'Content Strategy'. Apply a 10% discount for the bundle."
* **The Quick Fix:**
    > "Add a line item for 'Server Maintenance' at $100."

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with 💚 by [Arnab Ghosh](https://github.com/ArnabGhosh04)**

*For "The UI Strikes Back" Hackathon*

</div>