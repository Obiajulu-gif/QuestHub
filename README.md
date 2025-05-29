# QuestHub Sensay Integration

## Overview
QuestHub is a gamified learning platform that leverages the Sensay (QuestBot) API to deliver immersive quiz, riddle, and creative writing experiences. This repository includes a PowerShell script that automates the creation and management of a custom "Winks" replica, which serves as your interactive game guide and blockchain educator.

## Features

### 1. Quiz Game Section
- Fetch questions via `/quiz/question`
- Submit answers with `/quiz/answer`
- Offer break options using `/quiz/break`
- Reset quiz progress through `/quiz/reset`

### 2. Riddle Game Section
- Retrieve riddles using `/riddle`
- Check answers via `/riddle/check-answer`
- Provide break suggestions with `/riddle/break-options`
- Reset riddle progress with `/riddle/reset`

### 3. Creative Challenges Section
- Generate writing prompts (`/prompt`)
- Evaluate PDF submissions (`/evaluate/{challenge_id}`)
- Fetch detailed scores (`/scores/{challenge_id}`)
- Retrieve challenge details (`/challenge/{challenge_id}`)
- Default prompt duration is 48 hours; adjust `duration` and `time_unit` in the script as needed.

### 4. Fun Facts & Engagement
- Deliver engaging blockchain trivia via `/fun-fact`
- Encourage strategic breaks and personalized guidance

## Prerequisites
- Windows 10 or later
- PowerShell 7+ (or PowerShell Core)
- A valid Sensay API key

## Installation
1. Clone this repository:
   ```powershell
   git clone https://github.com/your-org/questhub.git
   cd questhub
   ```
2. Create a `.env.local` file at the project root with your Sensay API key:
   ```text
   Sensay_API=your_sensay_api_key_here
   ```

## Configuration
- **Sensay API Key**: Stored in `.env.local` as `Sensay_API`.
- **API Version**: Set in the script via `$apiVersion` (default `2025-03-25`).
- **API Base URL**: `https://questbot-endpoint.onrender.com`
- **Replica Settings**: Customize the replica name, slug, greeting, and system prompts in `create-sensay-replica.ps1`.

## Usage
Run the setup script to create or refresh your QuestBot user and replica:
```powershell
powershell -ExecutionPolicy Bypass -File .\create-sensay-replica.ps1
```
This script will:
1. Load your `Sensay_API` from `.env.local`.
2. Create or recreate a QuestBot user.
3. Delete any existing `winks_v1` replica.
4. Create a new `winks_v1` replica configured as your interactive guide.

## Contributing
Contributions are welcome! Feel free to open issues or pull requests to:
- Add new features
- Improve documentation
- Report bugs

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details. 