# Team-30: WINNER OF AVA CREATIONS PROBLEM STATEMENT
# 🌳 AVA Creations Digital Empowerment Platform 🌳

<p align="center">
  <img src="https://img.shields.io/badge/Project%20Status-MVP%20COMPLETED-green?style=for-the-badge" alt="Project Status"/>
  <img src="https://img.shields.io/badge/Tech%20for-Social%20Good-orange?style=for-the-badge" alt="Tech for Social Good"/>
  <img src="https://img.shields.io/badge/Made%20with-❤️%20&%20Code-blueviolet?style=for-the-badge" alt="Made with Love and Code"/>
</p>

> A revolutionary digital ecosystem designed to empower the forest-dependent women artisans of Northeast India. We're replacing manual, paper-based processes with a scalable, offline-first, and transparent system to foster financial inclusion, preserve cultural heritage, and build climate resilience.

---

### 🎯 **The Mission**

In the lush forests of Assam, women-led artisan groups create magic with their hands, relying on traditional crafts like handloom weaving and Eri silk for their income. However, manual processes, low digital access, and poor connectivity have limited their efficiency, transparency, and market reach.

**This project is the answer.** We are building an inclusive, easy-to-use digital solution for **AVACreations**, a Guwahati-based nonprofit, to bridge this digital divide and drive sustainable, women-led growth.

---

### 💡 **The Core Challenge**

Our primary challenge is to design for **semi-literate women working in low-connectivity areas**. The solution must:
* **Work Offline:** Data must be captured reliably without an internet connection.
* **Be Intuitive:** Use a visual, easy-to-understand interface.
* **Build Trust:** Provide clear financial visibility and data ownership.
* **Be Scalable:** Replace inefficient spreadsheets and WhatsApp with a robust, centralized system.

---

### 🚀 **Technology Stack & Architecture**

This project is a full-stack marvel, combining a powerful backend with dedicated frontends for different user groups, and an IVR system for artisans without smartphones.

| Component           | Technology                                                                                                                                                             | Purpose                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 📱 **Mobile App** | <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" /> <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" /> | **The Offline Field Tool** for the AVA Sakhi (Cluster Leader).         |
| 🌐 **Web App** | <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />                                                                  | **E-commerce & Admin Panel** for consumers and the AVA NGO team.     |
| 🧠 **Backend API** | <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" /> <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />  | **The Central Brain** of the entire operation.                       |
| 🗄️ **Database** | <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />                                                               | **The Scalable Data Store** for all user, product, and order data.   |
| 💳 **Payments** | <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" />                                                              | **Secure Payment Gateway** for the e-commerce website.               |
| 📞 **IVR System** | <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /> <img src="https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white" /> <img src="https://img.shields.io/badge/OpenMeteo-00A3E0?style=for-the-badge" /> <img src="https://img.shields.io/badge/Gemini-8E44AD?style=for-the-badge" /> | **Voice-Based Interface** for artisans to access services via phone calls. |

---

### ✨ **Features**

#### 📱 **Flutter App: The AVA Sakhi's Super-Tool**

This is an **offline-first** application designed for the Cluster Leader to manage her entire group in the field.

* **Guided Artisan Onboarding:** A beautiful, multi-step form to capture every detail of a new artisan as per the backend model:
    * Personal & Location Details
    * Professions (Multi-select)
    * Assets (Dynamic list)
    * KYC Documents (Aadhar/PAN with camera/gallery access)
* **Offline Issue Reporting:** A simple form to report issues (e.g., crop disease) with a name, description, and image.
* **Local SQLite Database:** All data from both forms is saved securely on the device, ensuring the app works perfectly without internet.
* **Homepage Dashboard:** The main screen provides an at-a-glance view of all unsynced artisans and issues waiting to be uploaded.
* **Intelligent Bulk Sync:** A single "Sync to Server" button that:
    1. Converts all images to Base64.
    2. Formats all local data into bulk JSON arrays.
    3. Sends the data to the correct EC2 endpoints (`/api/users/bulk` and `/api/complaints/bulk`).
    4. Clears the local database upon successful sync.

#### 🌐 **React Web App: The Public Face & Control Center**

* **Consumer E-commerce Store:**
    * A beautiful storefront to browse and buy authentic artisan products.
    * Detailed product pages with compelling stories and images.
    * Secure checkout process integrated with **Razorpay**.
    * Customer accounts for order history and profile management.
    * A system for leaving product reviews and feedback.
* **Admin (AVA NGO) Dashboard:**
    * A powerful analytics dashboard to track key metrics: total revenue, products sold, and the number of artisans supported.
    * A complete product management system to add new artisan creations to the website or update stock levels.
    * A master view to oversee all artisans, orders, and customer data.

#### 🧠 **Spring Boot Backend: The Powerhouse**

* **RESTful API Endpoints:** A complete set of secured endpoints to serve both the Flutter and React applications, and the IVR system.
* **MongoDB Integration:** Robust data models and repositories for scalable, flexible data storage.
* **Offline-First Support:** Dedicated bulk endpoints (`/api/users/bulk`, `/api/complaints/bulk`) designed to receive and process data from the offline-first Flutter app.
* **IVR Support:** Endpoints like `/api/ivr/log-production`, `/api/bank-balance`, and `/api/government_schemes` to handle IVR requests for production logging, financial queries, and scheme information.
* **Security:** Configured with Spring Security to protect sensitive endpoints.
* **Payment Integration:** A dedicated service layer to handle the creation and verification of Razorpay orders.

#### 📞 **IVR System: Voice-Based Access for Artisans**

To ensure inclusivity for artisans without smartphones, particularly in low-connectivity areas like Karbi Anglong, Assam, we’ve implemented an **Interactive Voice Response (IVR)** system using Flask and Twilio. This allows artisans to access critical services via simple phone calls, with all responses delivered in a clear, friendly voice (AWS Polly Amy).

* **IVR Flow:**
    1. Artisan calls a dedicated Twilio phone number.
    2. **IVR Prompt:** "Welcome to AVA Creations. Press 1 for bank balance, 2 for government schemes, 3 for tomorrow’s weather in Karbi Anglong, or 4 to chat with AI."
    3. **Options:**
       - **Option 1 (Bank Balance):** Queries the `/api/bank-balance` endpoint with the artisan’s phone number. Returns balance (e.g., "Your bank balance is 10,000 rupees") or static data if the API fails.
       - **Option 2 (Government Schemes):** Queries the `/api/government_schemes` endpoint, returning a list of schemes (e.g., "Available government schemes: Orunodoi, Financial assistance for women; Assam Tea Garden Workers’ Scheme, Support for tea garden workers") or static data.
       - **Option 3 (Weather):** Fetches tomorrow’s weather for Karbi Anglong using the **Open-Meteo API** (e.g., "Tomorrow’s weather in Karbi Anglong: Max 24°C, Min 19°C, with partly cloudy skies").
       - **Option 4 (AI Chat):** Uses Google’s Gemini API for conversational responses, allowing artisans to ask questions or report issues via voice (e.g., "Tell me something fun!" followed by speech input).
    4. **Production Logging (Future Enhancement):** Artisans can log production by entering a 3-digit product code (e.g., `101` for Eri Silk Shawl) and quantity, which is sent to the `/api/ivr/log-production` endpoint. Example flow:
       - **IVR:** "Please enter the 3-digit code for the product you made."
       - Artisan enters `101`.
       - **IVR:** "You selected Eri Silk Shawl. Please enter the quantity you made."
       - Artisan enters `2`.
       - **IVR:** "Thank you. You have logged 2 Eri Silk Shawls. Your AVA Sakhi will verify this. Goodbye."
    5. After options 1, 2, or 3, the system redirects to the main menu for further selections. Option 4 continues the conversation until no speech is detected.

* **Technical Details:**
    - **Flask Server:** Handles Twilio webhooks, processes DTMF (keypad) and speech input, and makes API calls to the Spring Boot backend.
    - **Twilio Integration:** Manages call flow and voice responses using AWS Polly (Amy voice) for clear, English-language output suitable for semi-literate users.
    - **Open-Meteo API:** Provides weather data for Karbi Anglong (latitude: 26.0, longitude: 93.5) without requiring an API key.
    - **Gemini API:** Enables conversational AI for option 4, supporting natural language queries.
    - **Spring Boot Endpoints:** The IVR system interacts with the same EC2 backend (`http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080`) for bank balance, government schemes, and production logging.
    - **Offline Support:** The IVR works in low-connectivity areas since it relies on phone calls, not internet access.
    - **Error Handling:** Falls back to static data (e.g., "10,000 rupees" for bank balance, "Orunodoi, Assam Tea Garden Workers’ Scheme" for schemes) if APIs fail, ensuring reliability.

---

### 🛠️ **Getting Started & Setup**

#### **Backend (Spring Boot)**

1. **Prerequisites:** Java 21, Maven.
2. **Database:** Ensure your MongoDB Atlas cluster is running and the connection URI in `application.properties` is correct.
3. **Run the app:**
    ```bash
    # Navigate to the backend directory
    cd avabackend

    # Clean and install dependencies
    mvn clean install
