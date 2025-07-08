# Team-30"# JPMC-CFG-AVA-CREATIONS-PROJECT-" 
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

This project is a full-stack marvel, combining a powerful backend with dedicated frontends for different user groups.

| Component           | Technology                                                                                                                                                             | Purpose                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 📱 **Mobile App** | <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" /> <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" /> | **The Offline Field Tool** for the AVA Sakhi (Cluster Leader).         |
| 🌐 **Web App** | <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />                                                                  | **E-commerce & Admin Panel** for consumers and the AVA NGO team.     |
| 🧠 **Backend API** | <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" /> <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />  | **The Central Brain** of the entire operation.                       |
| 🗄️ **Database** | <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />                                                               | **The Scalable Data Store** for all user, product, and order data.   |
| 💳 **Payments** | <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" />                                                              | **Secure Payment Gateway** for the e-commerce website.               |

#### **High-Level System Design**

+--------------------------+      +-------------------------+
|   Flutter Mobile App     |      |    React Web App        |
| (AVA Sakhi - Offline)    |      | (Admin & Consumers)     |
+--------------------------+      +-------------------------+
|         ^                        |         ^
| (Sync)  | (Data)                 | (API)   | (Data)
v         |                        v         |
+-------------------------------------------------------------+
|                     Spring Boot Backend API                   |
| (http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080) |
+-------------------------------------------------------------+
|         ^
| (CRUD)  | (Data)
v         |
+--------------------------+
|     MongoDB Atlas        |
|      (Database)          |
+--------------------------+


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
    1.  Converts all images to Base64.
    2.  Formats all local data into bulk JSON arrays.
    3.  Sends the data to the correct EC2 endpoints (`/api/users/bulk` and `/api/complaints/bulk`).
    4.  Clears the local database upon successful sync.

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

* **RESTful API Endpoints:** A complete set of secured endpoints to serve both the Flutter and React applications.
* **MongoDB Integration:** Robust data models and repositories for scalable, flexible data storage.
* **Offline-First Support:** Dedicated bulk endpoints (`/api/users/bulk`, `/api/complaints/bulk`) designed to receive and process data from the offline-first Flutter app.
* **Security:** Configured with Spring Security to protect sensitive endpoints.
* **Payment Integration:** A dedicated service layer to handle the creation and verification of Razorpay orders.

#### 📞 **IVR System Design (Future Feature)**

To include artisans who do not own a smartphone, we've designed a simple Interactive Voice Response (IVR) system.

**Flow:**
1.  Artisan calls a dedicated phone number.
2.  **IVR:** "Welcome to AVA Creations. Press 1 to log your work. Press 2 to check payment status."
3.  Artisan presses `1`.
4.  **IVR:** "Please enter the 3-digit code for the product you made."
5.  Artisan enters `101` (for 'Eri Silk Shawl').
6.  **IVR:** "You selected Eri Silk Shawl. Please enter the quantity you made."
7.  Artisan enters `2`.
8.  **IVR:** "Thank you. You have logged 2 Eri Silk Shawls. Your AVA Sakhi will verify this. Goodbye."
9.  The IVR system then makes an API call to a new backend endpoint (e.g., `/api/ivr/log-production`) with the artisan's phone number, product code, and quantity.

---

### 🛠️ **Getting Started & Setup**

#### **Backend (Spring Boot)**

1.  **Prerequisites:** Java 21, Maven.
2.  **Database:** Ensure your MongoDB Atlas cluster is running and the connection URI in `application.properties` is correct.
3.  **Run the app:**
    ```bash
    # Navigate to the backend directory
    cd avabackend

    # Clean and install dependencies
    mvn clean install

    # Run the application
    mvn spring-boot:run
    ```
4.  The server will start on `http://localhost:8080`.

#### **Mobile App (Flutter)**

1.  **Prerequisites:** Flutter SDK, Android Studio/VS Code with Flutter extension.
2.  **Android Manifest:** Make sure you've added the necessary permissions in `android/app/src/main/AndroidManifest.xml`:
    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    
    <application ... android:usesCleartextTraffic="true">
    ```
3.  **Backend URL:** In `lib/main.dart`, find the `SyncService` and update the `_usersUrl` and `_complaintsUrl` with your computer's local IP address (not `localhost`) for testing with a physical device.
4.  **Run the app:**
    ```bash
    # Navigate to the app directory
    cd ava_app

    # Get dependencies
    flutter pub get

    # Run on a connected device or emulator
    flutter run
    ```

---

<p align="center">
  Made with passion to empower and uplift. ✨
</p>
