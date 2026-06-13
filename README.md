# Chat Summarizer

An AI-powered web application that summarizes Discord conversations into concise, actionable insights.

---

## Overview

Chat Summarizer helps users quickly understand long Discord conversations without reading hundreds of messages.

Users can:

* Connect their Discord account
* Invite the Chat Summarizer Bot to servers
* Select a server and channel
* Generate AI-powered summaries
* View topic-wise summaries
* View user-wise contribution summaries
* Browse summary history

---

## Features

### Authentication

* Google Login
* Discord OAuth Login
* Session-based authentication
* Protected routes

### Discord Integration

* Connect Discord account
* Invite Discord Bot to servers
* Read channel messages
* Fetch server and channel information

### AI Summarization

* Main Summary
* Topic Summary
* User Contribution Summary

### Dashboard

* Connected Discord account
* Server selection
* Channel selection
* Generate summaries
* View latest summaries

### History

* Summary history page
* View previous summaries
* Detailed summary view

### Profile

* User profile
* Connected accounts
* Member information

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* React Markdown
* CSS

### Backend

* Node.js
* Express.js
* Passport.js
* Express Session

### Database

* MongoDB
* Mongoose

### AI

* Ollama - Model: llama3

### Discord

* Discord OAuth2
* Discord Bot
* discord.js

---

## Project Architecture

```text
Discord Server
      │
      ▼
Discord Bot
      │
      ▼
Node.js Backend
      │
 ┌────┴────┐
 ▼         ▼
MongoDB   llama3
      │
      ▼
React Frontend
```

---

## Current Folder Structure

```text
chat_summurizer/
│
├── frontend/
│
├── backend/
│
├── bot/
│
├── README.md
│
└── .gitignore
```

---

## User Flow

### 1. Login

User signs in using:

* Google
* Discord

### 2. Connect Discord

User authorizes Discord account.

### 3. Invite Bot

User invites Chat Summarizer Bot to a server.

### 4. Select Server

Choose a connected server.

### 5. Select Channel

Choose a text channel.

### 6. Generate Summary

AI generates:

* Main Summary
* Topic Summary
* User Summary

### 7. View History

Access all previously generated summaries.

---

## Current UI Pages

### Landing Page

* Hero Section
* Navigation Bar
* Login/Register Access
* Discord-focused branding

### Dashboard

* Sidebar Navigation
* Connected Account Panel
* Server Selection
* Summary Type Selection
* Generate Summary Button

### Summary History

* Search summaries
* Open previous summaries

### Profile

* User information
* Connected accounts
* Membership details

---

## Future Features

### Phase 2

* Daily Digest
* Missed Chat Detection
* Action Item Extraction
* Important Decision Detection
* Server Analytics

### Phase 3

* Telegram Integration
* Slack Integration
* WhatsApp Integration

### Phase 4

* Real-Time Summaries
* AI Chat Assistant
* Semantic Search
* Vector Database
* Voice Summaries

---

## Current Status

### Completed

✅ Google Login

✅ Discord Login

✅ Discord Bot Integration

✅ MongoDB Storage

✅ AI Summaries

✅ Summary History

✅ Detailed Summary View

✅ Dashboard

✅ Profile Section

### In Progress

🚧 New Responsive UI

🚧 Modern Dashboard Layout

🚧 Summary History Redesign

🚧 Landing Page Redesign

### Planned

📌 Telegram Integration

📌 Slack Integration

📌 Notifications

📌 Analytics

📌 AI Assistant

---

## Author

**Subha Bera**
B.Tech CSE (AI & ML)
Chat Summarizer — AI-powered Discord conversation summarization platform.
